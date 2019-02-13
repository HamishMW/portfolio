const Spacing = {
  spacingGutter: '20px',
  spacingOuter: {
    desktop: '60px',
    tablet: '40px',
    mobile: '20px',
  },
};

export default {
  ...Spacing,
  fontStack: 'Gotham, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  colorBlack: alpha => `rgba(0, 0, 0, ${alpha})`,
  colorWhite: alpha => `rgba(255, 255, 255, ${alpha})`,
  colorBackground: alpha => `rgba(17, 17, 17, ${alpha})`,
  colorText: alpha => `rgba(255, 255, 255, ${alpha})`,
  colorPrimary: alpha => `rgba(0, 229, 255, ${alpha})`,
  curveFastoutSlowin: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  clipPath: size => `polygon(0 0, 100% 0, 100% calc(100% - ${size}px), calc(100% - ${size}px) 100%, 0 100%)`,
};
