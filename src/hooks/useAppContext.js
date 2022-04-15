import { AppContext } from 'pages/_app.page';
import { useContext } from 'react';

export function useAppContext() {
  return useContext(AppContext);
}
