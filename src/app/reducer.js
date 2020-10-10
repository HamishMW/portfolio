export const initialState = {
  menuOpen: false,
  theme: 'dark',
};

export function reducer(state, action) {
  switch (action.type) {
    case 'setTheme':
      return { ...state, theme: action.value };
    case 'toggleTheme': {
      const newThemeKey = state.theme === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem('theme', JSON.stringify(newThemeKey));
      document.body.setAttribute('class', newThemeKey);
      return { ...state, theme: newThemeKey };
    }
    case 'toggleMenu':
      return { ...state, menuOpen: !state.menuOpen };
    default:
      throw new Error();
  }
}
