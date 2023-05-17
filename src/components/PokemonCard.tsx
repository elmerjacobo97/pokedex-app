import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ImageColors from 'react-native-image-colors';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {SimplePokemon} from '../interfaces';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get('window').width;

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation();

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {fallback: 'grey'}).then(
      (colors: any) => {
        if (!isMounted.current) return;

        colors.platform === 'android'
          ? setBgColor(colors.dominant || 'grey')
          : setBgColor(colors.background || 'grey');
      },
    );
    // Fn de retorno se va a disparar cuando el componente se desmonta
    return () => {
      isMounted.current = false;
    };
  }, [pokemon.picture]);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.dispatch(
          CommonActions.navigate('PokemonScreen', {
            simplePokemon: pokemon,
            color: bgColor,
          }),
        )
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        <View>
          <Text style={styles.name}>
            {`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`}
            {'\n#' + pokemon.id}
          </Text>
        </View>
        <View style={styles.pokeBolaContainer}>
          <Image
            source={require('../assets/poke-bola-blanca.png')}
            style={styles.pokeBola}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  name: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    left: 10,
    top: 10,
  },
  pokeBolaContainer: {
    bottom: 0,
    height: 100,
    opacity: 0.4,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    width: 100,
  },
  pokeBola: {
    bottom: -20,
    height: 100,
    position: 'absolute',
    right: -20,
    width: 100,
  },
  pokemonImage: {
    bottom: -6,
    height: 100,
    position: 'absolute',
    right: -6,
    width: 100,
  },
});
