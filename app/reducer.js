export const initialState = {
  menuOpen: false,
};

export function reducer(state, action) {
  const { type, value } = action;

  switch (type) {
    case 'setMenu':
      return { ...state, menuOpen: value };
    case 'toggleMenu':
      return { ...state, menuOpen: !state.menuOpen };
    default:
      throw new Error();
  }
}
