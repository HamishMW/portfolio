const fontStack = [
  'Gotham',
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'San Francisco',
  'Roboto',
  'Segoe UI',
  'Ubuntu',
  'Helvetica Neue',
  'sans-serif',
];

const monoFontStack = [
  'SFMono Regular',
  'Roboto Mono',
  'Consolas',
  'Liberation Mono',
  'Menlo',
  'Courier',
  'monospace',
];

const base = {
  curveFastoutSlowin: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  fontStack: fontStack.join(', '),
  monoFontStack: monoFontStack.join(', '),
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  rgbBlack: '0 0 0',
  rgbWhite: '255 255 255',
};

const dark = {
  id: 'dark',
  ...base,
  rgbBackground: '17 17 17',
  rgbBackgroundLight: '26 26 26',
  rgbTitle: '255 255 255',
  rgbText: '255 255 255',
  rgbPrimary: '0 229 255',
  rgbAccent: '0 229 255',
};

const light = {
  id: 'light',
  ...base,
  rgbBackground: '242 242 242',
  rgbBackgroundLight: '255 255 255',
  rgbTitle: '0 0 0',
  rgbText: '51 51 51',
  rgbPrimary: '0 0 0',
  rgbAccent: '0 229 255',
};

export function createThemeProperties(theme) {
  return Object.keys(theme).map(key => `--${key}: ${theme[key]};`);
}

export const theme = { dark, light };
