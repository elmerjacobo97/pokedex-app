import {useCallback, useEffect, useState} from 'react';
import {PokemonFull} from '../interfaces';
import {pokeApi} from '../api';

export const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull);

  const loadPokemon = useCallback(async () => {
    setIsLoading(true);
    const {data} = await pokeApi.get<PokemonFull>(`/pokemon/${id}`);
    setPokemon(data);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  return {
    isLoading,
    pokemon,
  };
};
