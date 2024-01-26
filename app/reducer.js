export const initialState = {
  menuOpen: false,
};

export function reducer(state, action) {
  const { type, value } = action;

  switch (type) {
    case 'setTheme':
      return { ...state, theme: value };
    case 'toggleTheme': {
      const newThemeId = state.theme === 'dark' ? 'light' : 'dark';
      document.body.dataset.theme = newThemeId;
      return { ...state, theme: newThemeId };
    }
    case 'toggleMenu':
      return { ...state, menuOpen: !state.menuOpen };
    default:
      throw new Error();
  }
}
