import { useContext } from 'react';
import { AppContext } from 'app';

function useAppContext() {
  return useContext(AppContext);
}

export default useAppContext;
