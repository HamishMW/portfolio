import { theme } from '/app/theme';

export const initialState = {
  menuOpen: false,
  currentTheme: theme.dark,
};

export function reducer(state, action) {
  switch (action.type) {
    case 'setTheme':
      return { ...state, currentTheme: action.value };
    case 'updateTheme':
      return {
        ...state,
        currentTheme: { ...theme[state.currentTheme.themeId], ...action.value },
      };
    case 'toggleTheme': {
      const newThemeKey = state.currentTheme.themeId === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem('theme', JSON.stringify(newThemeKey));
      document.body.setAttribute('class', newThemeKey);
      return { ...state, currentTheme: theme[newThemeKey] };
    }
    case 'toggleMenu':
      return { ...state, menuOpen: !state.menuOpen };
    default:
      throw new Error();
  }
}
