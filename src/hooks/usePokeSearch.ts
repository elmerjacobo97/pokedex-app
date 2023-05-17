import {useCallback, useEffect, useState} from 'react';
import {pokeApi} from '../api';
import {PokePaginatedResponse, Result, SimplePokemon} from '../interfaces';

export const usePokeSearch = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const mapPokemonList = useCallback((pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlPaths = url.split('/');
      const id = urlPaths[urlPaths.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return {id, name, picture};
    });
    setSimplePokemonList(newPokemonList);
    setIsFetching(false);
  }, []);

  const loadPokemons = useCallback(async () => {
    const {data} = await pokeApi.get<PokePaginatedResponse>(
      '/pokemon?limit=1200',
    );
    mapPokemonList(data.results);
  }, [mapPokemonList]);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  return {
    isFetching,
    simplePokemonList,
  };
};
