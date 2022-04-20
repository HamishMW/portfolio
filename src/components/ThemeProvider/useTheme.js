import { useContext } from 'react';
import { ThemeContext } from '.';

export function useTheme() {
  const currentTheme = useContext(ThemeContext);
  return currentTheme;
}
