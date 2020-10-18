import { useContext } from 'react';
import { ThemeContext } from '.';

function useTheme() {
  const currentTheme = useContext(ThemeContext);
  return currentTheme;
}

export default useTheme;
