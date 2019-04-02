const numSpacing = {
  spacingGutter: 20,
  spacingOuter: {
    numDesktop: 60,
    numTablet: 40,
    numMobile: 20,
  }
};

const spacing = {
  ...numSpacing,
  spacingGutter: `${numSpacing.spacingGutter}px`,
  spacingOuter: {
    ...numSpacing.spacingOuter,
    desktop: `${numSpacing.spacingOuter.numDesktop}px`,
    tablet: `${numSpacing.spacingOuter.numTablet}px`,
    mobile: `${numSpacing.spacingOuter.numMobile}px`,
  },
};

const base = {
  curveFastoutSlowin: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  clipPath: size => `polygon(0 0, 100% 0, 100% calc(100% - ${size}px), calc(100% - ${size}px) 100%, 0 100%)`,
  fontStack: 'Gotham, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  colorBlack: (alpha = 1) => `rgba(0, 0, 0, ${alpha})`,
  colorWhite: (alpha = 1) => `rgba(255, 255, 255, ${alpha})`,
};

const dark = {
  id: 'dark',
  ...spacing,
  ...base,
  colorBackground: (alpha = 1) => `rgba(17, 17, 17, ${alpha})`,
  colorBackgroundLight: (alpha = 1) => `rgba(26, 26, 26, ${alpha})`,
  colorTitle: (alpha = 1) => base.colorWhite(alpha),
  colorText: (alpha = 1) => base.colorWhite(alpha),
  colorPrimary: (alpha = 1) => `rgba(0, 229, 255, ${alpha})`,
  colorAccent: (alpha = 1) => `rgba(0, 229, 255, ${alpha})`,
  sphereAmbientLight: 0.1,
};

const light = {
  id: 'light',
  ...spacing,
  ...base,
  colorBackground: (alpha = 1) => `rgba(242, 242, 242, ${alpha})`,
  colorBackgroundLight: (alpha = 1) => `rgba(255, 255, 255, ${alpha})`,
  colorTitle: (alpha = 1) => base.colorBlack(alpha),
  colorText: (alpha = 0.8) => base.colorBlack(alpha),
  colorPrimary: (alpha = 1) => `rgba(0, 0, 0, ${alpha})`,
  colorAccent: (alpha = 1) => `rgba(0, 229, 255, ${alpha})`,
  sphereAmbientLight: 0.8,
};

export const theme = { dark, light };
