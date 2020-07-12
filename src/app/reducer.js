import { theme } from 'app/theme';

export const initialState = {
  menuOpen: false,
  theme: theme.dark,
};

export function reducer(state, action) {
  switch (action.type) {
    case 'setTheme':
      return { ...state, theme: action.value };
    case 'updateTheme':
      return {
        ...state,
        theme: { ...theme[state.theme.themeId], ...action.value },
      };
    case 'toggleTheme': {
      const newThemeKey = state.theme.themeId === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem('theme', JSON.stringify(newThemeKey));
      document.body.setAttribute('class', newThemeKey);
      return { ...state, theme: theme[newThemeKey] };
    }
    case 'toggleMenu':
      return { ...state, menuOpen: !state.menuOpen };
    default:
      throw new Error();
  }
}
