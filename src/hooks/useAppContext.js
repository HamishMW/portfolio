import { AppContext } from 'app';
import { useContext } from 'react';

export function useAppContext() {
  return useContext(AppContext);
}
