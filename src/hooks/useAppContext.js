import { AppContext } from 'pages/_app';
import { useContext } from 'react';

export function useAppContext() {
  return useContext(AppContext);
}
