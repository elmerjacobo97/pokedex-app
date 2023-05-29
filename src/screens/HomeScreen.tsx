import {Image, ActivityIndicator, FlatList, View} from 'react-native';
import {usePokePaginated} from '../hooks';
import {PokedexLogo, PokemonCard} from '../components';
import {styles} from '../theme';

export const HomeScreen = () => {
  const {simplePokemonList, loadPokemons} = usePokePaginated();

  return (
    <>
      <Image
        source={require('../assets/poke-bola.png')}
        style={styles.pokeBolaBg}
      />
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          // Header
          ListHeaderComponent={<PokedexLogo />}
          // Render
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          // Infinite scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4} // 40%
          // Activity Indicator
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} size={20} color="grey" />
          }
        />
      </View>
    </>
  );
};
