export default {
  fontStack: '"Gotham", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif',
  colorBlack: alpha => `rgba(0, 0, 0, ${alpha})`,
  colorWhite: alpha => `rgba(255, 255, 255, ${alpha})`,
  colorBackground: alpha => `rgba(17, 17, 17, ${alpha})`,
  colorText: alpha => `rgba(255, 255, 255, ${alpha})`,
  colorPrimary: alpha => `rgba(0, 229, 255, ${alpha})`,
  curveFastoutSlowin: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  spacingGutter: '20px',
  spacingOuter: {
    desktop: '60px',
    tablet: '40px',
    mobile: '20px',
  },
}
