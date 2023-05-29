import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

import {FadeInImage, PokemonDetails} from '../components';
import {usePokemon} from '../hooks';
import {AppDispatch, RootState} from '../store';
import {addToFavorites, removeFromFavorites} from '../store/features/favorites';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {name, id, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();
  const {isLoading, pokemon} = usePokemon(id);

  const dispatch: AppDispatch = useDispatch();
  const {favorites} = useSelector((state: RootState) => state.favorites);

  const isFavorite = favorites.some(poke => poke.id === id); // TRUE OR FALSE

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
      Toast.show({
        type: 'error',
        text1: 'Eliminado de favoritos',
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
      });
    } else {
      dispatch(addToFavorites(simplePokemon));
      Toast.show({
        type: 'success',
        text1: 'Agregado a favoritos',
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={[styles.headerContainer, {backgroundColor: color}]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.pop()} // goBack
          style={[styles.backButton, {top: top + 5}]}>
          <Icon name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleToggleFavorite}
          style={[styles.starButton, {top: top + 5}]}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <Text style={[styles.pokemonName, {top: top + 40}]}>
          {name + '\n#' + id}
        </Text>
        <Image
          source={require('../assets/poke-bola-blanca.png')}
          style={styles.pokeBola}
        />
        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>
      <View style={styles.loadingIndicator}>
        {isLoading ? (
          <ActivityIndicator size="large" color={color} />
        ) : (
          <PokemonDetails color={color} pokemon={pokemon} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 300,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 5,
  },
  starButton: {
    position: 'absolute',
    right: 20,
    top: 5,
  },
  pokemonName: {
    color: '#FFF',
    fontSize: 30,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeBola: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -50,
    opacity: 0.25,
    right: -50,
  },
  pokemonImage: {
    width: 200,
    height: 200,
    position: 'absolute',
    bottom: -10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
