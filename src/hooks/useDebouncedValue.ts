import {useState, useEffect} from 'react';

export const useDebouncedValue = (input: string = '', time: number = 600) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    // Cada vez que cambia el valor de "input", se configura un temporizador para actualizar el valor debounced después del tiempo especificado
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    // Se cancela el temporizador anterior cuando el valor de "input" cambia antes de que se cumpla el tiempo especificado
    return () => clearTimeout(timeout);
  }, [input, time]);
  return debouncedValue;
};
