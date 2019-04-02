import { keyframes } from 'styled-components/macro';

export const AnimFade = keyframes`
  0% {opacity: 0}
  100% {opacity: 1}
`;

const numMedia = {
  numDesktop: 1440,
  numTablet: 1024,
  numMobile: 696,
};

export const media = {
  ...numMedia,
  desktop: `${numMedia.numDesktop}px`,
  tablet: `${numMedia.numTablet}px`,
  mobile: `${numMedia.numMobile}px`,
  mobileLS: `(max-width: 820px) and (max-height: 420px)`,
};

function stringToRgba(colorString) {
  return colorString.replace(' ', '').replace('rgba(', '').replace(')', '').split(',');
}

export function tint(colorString, percent) {
  const colorArray = colorString.split(',');
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * - 1 : percent;
  const r = parseInt(colorArray[0], 10);
  const g = parseInt(colorArray[1], 10);
  const b = parseInt(colorArray[2], 10);
  const a = parseInt(colorArray[3], 10);
  return `rgba(${(Math.round((t - r) * p) + r)}, ${(Math.round((t - g) * p) + g)}, ${(Math.round((t - b) * p) + b)}, ${a})`;
};

export function rgba(colorString, alpha) {
  const colorArray = stringToRgba(colorString);
  return `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${alpha})`;
};
