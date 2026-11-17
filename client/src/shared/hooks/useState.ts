import { useState as useReactState, Dispatch, SetStateAction } from 'react';

/**
 * Wrapper del hook useState de React que centraliza su uso y permite mocking en tests.
 * @template T Tipo del estado.
 * @param initialState Estado inicial.
 * @returns Tupla con el estado actual y la función para actualizarlo.
 */
export const useState = <T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useReactState(initialState);

  // Validación de invariantes para tipos primitivos
  const setStateWithValidation = (newState: SetStateAction<T>): void => {
    if (typeof newState === 'function') {
      const stateUpdater = newState as (prevState: T) => T;
      const updatedState = stateUpdater(state);
      if (typeof updatedState === 'number' && isNaN(updatedState)) {
        console.warn('Advertencia: Se intentó establecer un estado numérico como NaN');
      }
      setState(updatedState);
    } else {
      if (typeof newState === 'number' && isNaN(newState as unknown as number)) {
        console.warn('Advertencia: Se intentó establecer un estado numérico como NaN');
      }
      setState(newState);
    }
  };

  return [state, setStateWithValidation];
};

// Tipos auxiliares para manejo de estado complejo
export type StateUpdater<T> = Dispatch<SetStateAction<T>>;
export type StateTuple<T> = [T, StateUpdater<T>];