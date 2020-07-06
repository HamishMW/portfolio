import { Color } from 'three/src/math/Color';

/**
 * Convert pixel values to rem for a11y
 */
export const pxToRem = px => `${px / 16}rem`;

/**
 * Convert ms token values to a raw numbers for ReactTransitionGroup
 * Transition delay props
 */
export const msToNum = msString => Number(msString.replace('ms', ''));

/**
 * Convert an rgb theme property (e.g. rgbBlack: '0 0 0')
 * to a ThreeJS Color class
 */
export const rgbToThreeColor = rgb =>
  new Color(...rgb.split(' ').map(value => Number(value) / 255));

/**
 * Transform theme token objects into CSS custom properties
 */
export function createThemeProperties(theme) {
  return Object.keys(theme)
    .map(key => `--${key}: ${theme[key]};`)
    .join('\n');
}

// Full list of tokens
const baseTokens = {
  rgbBlack: '0 0 0',
  rgbWhite: '255 255 255',
  bezierFastoutSlowin: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  durationXS: '200ms',
  durationS: '300ms',
  durationM: '400ms',
  durationL: '600ms',
  durationXL: '800ms',
  fontStack:
    'Gotham, system-ui, -apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Ubuntu, Helvetica Neue, sans-serif',
  monoFontStack:
    'SFMono Regular, Roboto Mono, Consolas, Liberation Mono, Menlo, Courier, monospace',
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  fontSizeH1: pxToRem(58),
  fontSizeH2: pxToRem(38),
  fontSizeH3: pxToRem(26),
  fontSizeBodyL: pxToRem(20),
  fontSizeBodyM: pxToRem(18),
  fontSizeBodyS: pxToRem(16),
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

// Tokens that change based on viewport size
const tokensLaptop = {
  maxWidthL: '1000px',
  fontSizeH2: pxToRem(36),
};

const tokensTablet = {
  spaceOuter: '48px',
  fontSizeH1: pxToRem(48),
  fontSizeH2: pxToRem(32),
  fontSizeH3: pxToRem(24),
};

const tokensMobile = {
  spaceOuter: '24px',
  fontSizeH1: pxToRem(34),
  fontSizeH2: pxToRem(28),
  fontSizeH3: pxToRem(22),
  fontSizeBodyL: pxToRem(18),
  fontSizeBodyM: pxToRem(16),
  fontSizeBodyS: pxToRem(14),
};

const tokensMobileSmall = {
  spaceOuter: '16px',
  fontSizeH1: pxToRem(28),
  fontSizeH2: pxToRem(24),
  fontSizeH3: pxToRem(20),
};

// Tokens that change based on theme
const dark = {
  themeId: 'dark',
  rgbBackground: '17 17 17',
  rgbBackgroundLight: '26 26 26',
  rgbPrimary: '0 229 255',
  rgbAccent: '0 229 255',
  rgbText: '255 255 255',
  colorTextTitle: 'rgb(var(--rgbText) / 1)',
  colorTextBody: 'rgb(var(--rgbText) / 0.8)',
  colorTextLight: 'rgb(var(--rgbText) / 0.6)',
};

const light = {
  themeId: 'light',
  rgbBackground: '242 242 242',
  rgbBackgroundLight: '255 255 255',
  rgbPrimary: '0 0 0',
  rgbAccent: '0 229 255',
  rgbText: '0 0 0',
  colorTextTitle: 'rgb(var(--rgbText) / 1)',
  colorTextBody: 'rgb(var(--rgbText) / 0.7)',
  colorTextLight: 'rgb(var(--rgbText) / 0.6)',
};

export const tokens = {
  base: baseTokens,
  laptop: tokensLaptop,
  tablet: tokensTablet,
  mobile: tokensMobile,
  mobileSmall: tokensMobileSmall,
};

export const theme = { dark, light };
