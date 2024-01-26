import { useContext } from 'react';
import { AppContext } from '~/root';

export function useAppContext() {
  return useContext(AppContext);
}
