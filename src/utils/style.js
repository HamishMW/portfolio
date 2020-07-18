import { Color } from 'three/src/math/Color';

/**
 * Media query breakpoints
 */
export const media = {
  desktop: 1600,
  laptop: 1280,
  tablet: 1024,
  mobile: 696,
  mobileS: 320,
};

/**
 * Convert a px string to a number
 */
export const pxToNum = px => Number(px.replace('px', ''));

/**
 * Convert a number to a px string
 */
export const numToPx = num => `${num}px`;

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
 * Convert a number to an ms string
 */
export const numToMs = num => `${num}ms`;

/**
 * Convert an rgb theme property (e.g. rgbBlack: '0 0 0')
 * to a ThreeJS Color class
 */
export const rgbToThreeColor = rgb =>
  new Color(...rgb.split(' ').map(value => Number(value) / 255));
