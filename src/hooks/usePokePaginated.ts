import {useCallback, useEffect, useRef, useState} from 'react';
import {pokeApi} from '../api';
import {PokePaginatedResponse, Result, SimplePokemon} from '../interfaces';

export const usePokePaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const nextPageUrl = useRef('/pokemon?limit=40');

  const mapPokemonList = useCallback(
    (pokemonList: Result[]) => {
      const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
        const urlPaths = url.split('/');
        const id = urlPaths[urlPaths.length - 2];
        const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        return {id, name, picture};
      });
      setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
      setIsLoading(false);
    },
    [simplePokemonList],
  );

  const loadPokemons = useCallback(async () => {
    setIsLoading(true);

    if (nextPageUrl.current) {
      // Validación de URL no vacía
      const {data} = await pokeApi.get<PokePaginatedResponse>(
        nextPageUrl.current,
      );

      nextPageUrl.current = data.next;
      mapPokemonList(data.results);
    } else {
      setIsLoading(false); // Si la URL es vacía, se establece isLoading en false
    }
  }, [mapPokemonList]);

  // const loadPokemons = useCallback(async () => {
  //   setIsLoading(true);
  //   const {data} = await pokeApi.get<PokePaginatedResponse>(
  //     nextPageUrl.current,
  //   );
  //   nextPageUrl.current = data.next;
  //   mapPokemonList(data.results);
  // }, [mapPokemonList]);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  return {
    isLoading,
    simplePokemonList,
    loadPokemons,
  };
};
