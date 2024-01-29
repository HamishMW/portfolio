export const initialState = {
  menuOpen: false,
};

export function reducer(state, action) {
  const { type, value } = action;

  switch (type) {
    case 'setTheme':
      window.localStorage.setItem('theme', JSON.stringify(value));
      return { ...state, theme: value };
    case 'toggleTheme': {
      const newThemeId = state.theme === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem('theme', JSON.stringify(newThemeId));
      return { ...state, theme: newThemeId };
    }
    case 'toggleMenu':
      return { ...state, menuOpen: !state.menuOpen };
    default:
      throw new Error();
  }
}
