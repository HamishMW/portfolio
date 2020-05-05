import { keyframes, css } from 'styled-components/macro';

// Media query breakpoints
export const media = {
  desktop: 1600,
  laptop: 1280,
  tablet: 1024,
  mobile: 696,
  mobileLS: `(max-width: 820px) and (max-height: 420px)`,
};

// Animation utils
export const AnimFade = keyframes`
  0% {opacity: 0}
  100% {opacity: 1}
`;

// Style helpers
export const sectionPadding = css`
  padding-right: 120px;
  padding-left: 200px;

  @media (min-width: ${media.desktop}px) {
    padding-left: 120px;
  }

  @media (max-width: ${media.tablet}px) {
    padding-left: 160px;
  }

  @media (max-width: ${media.mobile}px) {
    padding-right: 25px;
    padding-left: 25px;
  }

  @media (max-width: ${media.mobile}px), (max-height: ${media.mobile}px) {
    padding-left: var(--spacingOuter);
    padding-right: var(--spacingOuter);
  }

  @media ${media.mobileLS} {
    padding-left: 100px;
    padding-right: 100px;
  }
`;

export function cornerClip(size = 8) {
  return css`
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - ${size}px),
      calc(100% - ${size}px) 100%,
      0 100%
    );
  `;
}
