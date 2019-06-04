import { rgba } from './styleUtils';

const numSpacing = {
  numSpacingGutter: 20,
  spacingOuter: {
    numDesktop: 60,
    numTablet: 40,
    numMobile: 20,
  }
};

const spacing = {
  ...numSpacing,
  spacingGutter: `${numSpacing.numSpacingGutter}px`,
  spacingOuter: {
    ...numSpacing.spacingOuter,
    desktop: `${numSpacing.spacingOuter.numDesktop}px`,
    tablet: `${numSpacing.spacingOuter.numTablet}px`,
    mobile: `${numSpacing.spacingOuter.numMobile}px`,
  },
};

const base = {
  curveFastoutSlowin: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  clipPath: (size = 8) => `polygon(0 0, 100% 0, 100% calc(100% - ${size}px), calc(100% - ${size}px) 100%, 0 100%)`,
  fontStack: `Gotham, system-ui, -apple-system, BlinkMacSystemFont, 'San Francisco', Roboto, 'Segoe UI', Oxygen, Ubuntu, Cantarell, Helvetica Neue, sans-serif`,
  colorBlack: 'rgba(0, 0, 0, 1)',
  colorWhite: 'rgba(255, 255, 255, 1)',
};

const dark = {
  id: 'dark',
  ...spacing,
  ...base,
  colorBackground: 'rgba(17, 17, 17, 1)',
  colorBackgroundLight: 'rgba(26, 26, 26, 1)',
  colorTitle: base.colorWhite,
  colorText: base.colorWhite,
  colorPrimary: 'rgba(0, 229, 255, 1)',
  colorAccent: 'rgba(0, 229, 255, 1)',
  sphereAmbientLight: 0.1,
};

const light = {
  id: 'light',
  ...spacing,
  ...base,
  colorBackground: 'rgba(242, 242, 242, 1)',
  colorBackgroundLight: 'rgba(255, 255, 255, 1)',
  colorTitle: base.colorBlack,
  colorText: rgba(base.colorBlack, 0.8),
  colorPrimary: 'rgba(0, 0, 0, 1)',
  colorAccent: 'rgba(0, 229, 255, 1)',
  sphereAmbientLight: 0.8,
};

export const theme = { dark, light };
