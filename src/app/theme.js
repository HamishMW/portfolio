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

const baseTokens = {
  rgbBlack: '0 0 0',
  rgbWhite: '255 255 255',
  curveFastoutSlowin: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  fontStack: fontStack.join(', '),
  monoFontStack: monoFontStack.join(', '),
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  fontSizeH1: '58px',
  fontSizeH2: '38px',
  fontSizeH3: '26px',
  fontSizeBodyL: '20px',
  fontSizeBodyM: '18px',
  fontSizeBodyS: '16px',
  lineHeightTitle: '1.1',
  lineHeightBody: '1.5',
  maxWidthS: '480px',
  maxWidthM: '640px',
  maxWidthL: '1096px',
  spaceOuter: '64px',
  spaceXS: '4px',
  spaceS: '8px',
  spaceM: '16px',
  spaceL: '24px',
  spaceXL: '32px',
  space2XL: '48px',
  space3XL: '64px',
  space4XL: '96px',
  space5XL: '128px',
};

const tokensLaptop = {
  maxWidthL: '1000px',
  fontSizeH2: '36px',
};

const tokensTablet = {
  spaceOuter: '48px',
  fontSizeH1: '48px',
  fontSizeH2: '32px',
  fontSizeH3: '24px',
};

const tokensMobile = {
  spaceOuter: '24px',
  fontSizeH1: '34px',
  fontSizeH2: '28px',
  fontSizeH3: '22px',
  fontSizeBodyL: '18px',
  fontSizeBodyM: '16px',
  fontSizeBodyS: '14px',
};

const tokensMobileSmall = {
  spaceOuter: '16px',
  fontSizeH1: '28px',
  fontSizeH2: '24px',
  fontSizeH3: '20px',
};

export const tokens = {
  desktop: baseTokens,
  laptop: tokensLaptop,
  tablet: tokensTablet,
  mobile: tokensMobile,
  mobileSmall: tokensMobileSmall,
};

const dark = {
  id: 'dark',
  rgbBackground: '17 17 17',
  rgbBackgroundLight: '26 26 26',
  rgbText: '255 255 255',
  colorTextTitle: 'rgb(var(--rgbText) / 1)',
  colorTextBody: 'rgb(var(--rgbText) / 0.8)',
  colorTextLight: 'rgb(var(--rgbText) / 0.6)',
  rgbPrimary: '0 229 255',
  rgbAccent: '0 229 255',
};

const light = {
  id: 'light',
  rgbBackground: '242 242 242',
  rgbBackgroundLight: '255 255 255',
  rgbText: '0 0 0',
  colorTextTitle: 'rgb(var(--rgbText) / 1)',
  colorTextBody: 'rgb(var(--rgbText) / 0.7)',
  colorTextLight: 'rgb(var(--rgbText) / 0.6)',
  rgbPrimary: '0 0 0',
  rgbAccent: '0 229 255',
};

export function createThemeProperties(theme) {
  return Object.keys(theme).map(key => `--${key}: ${theme[key]};`);
}

export const theme = { dark, light };
