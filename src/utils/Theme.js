const Spacing = {
  spacingGutter: '20px',
  spacingOuter: {
    desktop: '60px',
    tablet: '40px',
    mobile: '20px',
  },
}

export default {
  ...Spacing,
  fontStack: '"Gotham", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif',
  colorBlack: alpha => `rgba(0, 0, 0, ${alpha})`,
  colorWhite: alpha => `rgba(255, 255, 255, ${alpha})`,
  colorBackground: alpha => `rgba(17, 17, 17, ${alpha})`,
  colorText: alpha => `rgba(255, 255, 255, ${alpha})`,
  colorPrimary: alpha => `rgba(0, 229, 255, ${alpha})`,
  curveFastoutSlowin: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  clipPath: size => `polygon(0 0, 100% 0, 100% calc(100% - ${size}px), calc(100% - ${size}px) 100%, 0 100%)`,
}

export const ColorTint = (color, percent) => {
  const values = color.split(',');
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent *- 1 : percent;
  const R = parseInt(values[0].slice(5), 10);
  const G = parseInt(values[1], 10);
  const B = parseInt(values[2], 10);
  const A = parseInt(values[3], 10);
  return `rgba(${(Math.round((t-R)*p)+R)}, ${(Math.round((t-G)*p)+G)}, ${(Math.round((t-B)*p)+B)}, ${A})`;
}
