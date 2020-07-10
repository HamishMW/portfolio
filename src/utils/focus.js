import { css } from 'styled-components';

/**
 * Blur clickable element on mouseup to hide focus states from
 * users with pointer devices
 */
export function blurOnMouseUp(event) {
  event.currentTarget.blur();
}

export const focusRing = css`
  &:focus {
    box-shadow: 0 0 0 4px rgb(var(--rgbBackground)), 0 0 0 8px rgb(var(--rgbText));
    outline: none;
  }

  &:-moz-focus-inner {
    border: 0;
  }

  &:active {
    box-shadow: none;
  }
`;
