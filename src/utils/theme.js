import { rgba } from './style';

const fontStack = [
  'Gotham',
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'San Francisco',
  'Roboto',
  'Segoe UI',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
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

const spacing = {
  spacingGutter: 20,
  spacingOuter: {
    desktop: 60,
    tablet: 40,
    mobile: 20,
  }
};

const media = {
  desktop: 1440,
  laptop: 1280,
  tablet: 1024,
  mobile: 696,
  mobileLS: `(max-width: 820px) and (max-height: 420px)`,
};

const base = {
  curveFastoutSlowin: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  clipPath: (size = 8) => `polygon(0 0, 100% 0, 100% calc(100% - ${size}px), calc(100% - ${size}px) 100%, 0 100%)`,
  fontStack: fontStack.join(', '),
  monoFontStack: monoFontStack.join(', '),
  colorBlack: 'rgba(0, 0, 0, 1)',
  colorWhite: 'rgba(255, 255, 255, 1)',
  maxWidthDesktop: 1100,
  maxWidthLaptop: 1000,
};

const dark = {
  id: 'dark',
  ...spacing,
  ...base,
  ...media,
  colorBackground: 'rgba(17, 17, 17, 1)',
  colorBackgroundLight: 'rgba(26, 26, 26, 1)',
  colorTitle: base.colorWhite,
  colorText: base.colorWhite,
  colorPrimary: 'rgba(0, 229, 255, 1)',
  colorAccent: 'rgba(0, 229, 255, 1)',
};

const light = {
  id: 'light',
  ...spacing,
  ...base,
  ...media,
  colorBackground: 'rgba(242, 242, 242, 1)',
  colorBackgroundLight: 'rgba(255, 255, 255, 1)',
  colorTitle: base.colorBlack,
  colorText: rgba(base.colorBlack, 0.8),
  colorPrimary: 'rgba(0, 0, 0, 1)',
  colorAccent: 'rgba(0, 229, 255, 1)',
};

export const theme = { dark, light };
