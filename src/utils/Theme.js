const spacing = {
  spacingGutter: '20px',
  spacingOuter: {
    desktop: '60px',
    tablet: '40px',
    mobile: '20px',
  },
};

const base = {
  curveFastoutSlowin: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  clipPath: size => `polygon(0 0, 100% 0, 100% calc(100% - ${size}px), calc(100% - ${size}px) 100%, 0 100%)`,
  fontStack: 'Gotham, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  colorBlack: alpha => `rgba(0, 0, 0, ${alpha})`,
  colorWhite: alpha => `rgba(255, 255, 255, ${alpha})`,
};

export const dark = {
  id: 'dark',
  ...spacing,
  ...base,
  colorBackground: alpha => `rgba(17, 17, 17, ${alpha})`,
  colorBackgroundLight: alpha => `rgba(26, 26, 26, ${alpha})`,
  colorText: alpha => base.colorWhite(alpha),
  colorPrimary: alpha => `rgba(0, 229, 255, ${alpha})`,
  sphereAmbientLight: 0.1,
};

export const light = {
  id: 'light',
  ...spacing,
  ...base,
  colorBackground: alpha => `rgba(242, 242, 242, ${alpha})`,
  colorBackgroundLight: alpha => `rgba(255, 255, 255, ${alpha})`,
  colorText: alpha => base.colorBlack(alpha),
  colorPrimary: alpha => `rgba(7, 107, 117, ${alpha})`,
  sphereAmbientLight: 0.8,
};
