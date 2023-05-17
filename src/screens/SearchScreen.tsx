import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Platform, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loading, PokemonCard, SearchInput} from '../components';
import {usePokeSearch} from '../hooks';
import {styles} from '../theme';
import {SimplePokemon} from '../interfaces';

const screenWidth = Math.round(Dimensions.get('window').width);

export const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);
  const {top, bottom} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokeSearch();

  useEffect(() => {
    if (term.length === 0) {
      setPokemonFiltered([]);
      setErrorMessage('Empieza a buscar tu Pokemon por nombre o ID');
      return;
    }

    const searchTerm = term.toLowerCase();
    const isNumeric = !isNaN(Number(searchTerm));

    const filteredPokemon = simplePokemonList.filter(poke =>
      poke.name.toLowerCase().includes(searchTerm),
    );

    if (isNumeric) {
      const pokemonById = simplePokemonList.find(
        poke => poke.id === searchTerm,
      );
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
      setErrorMessage(pokemonById ? '' : 'No se encontraron resultados');
    } else {
      setPokemonFiltered(filteredPokemon);
      setErrorMessage(
        filteredPokemon.length > 0 ? '' : 'No se encontraron resultados',
      );
    }
  }, [simplePokemonList, term]);

  if (isFetching) return <Loading />;

  return (
    <View style={{flex: 1, marginHorizontal: 20, paddingBottom: bottom + 40}}>
      <SearchInput
        onDebounce={value => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 20,
        }}
      />
      {pokemonFiltered.length > 0 ? (
        <FlatList
          data={pokemonFiltered}
          keyExtractor={pokemon => pokemon.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={() =>
            term ? (
              <Text
                style={{
                  ...styles.title,
                  ...styles.globalMargin,
                  marginTop: top + 60,
                  marginBottom: 10,
                }}>
                {term}
              </Text>
            ) : null
          }
          renderItem={({item}) => <PokemonCard pokemon={item} />}
        />
      ) : (
        <Text style={{fontSize: 20, marginTop: top + 80}}>
          {errorMessage || 'No hay resultados'}
        </Text>
      )}
    </View>
  );
};
