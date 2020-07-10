import { keyframes, css } from 'styled-components';

// Media query breakpoints
export const media = {
  desktop: 1600,
  laptop: 1280,
  tablet: 1024,
  mobile: 696,
  mobileSmall: 320,
  mobileLS: `(max-width: 820px) and (max-height: 420px)`,
};

// Animation utils
export const AnimFade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

// Offset content padding based on the header nav
export const sectionPadding = css`
  padding-right: var(--space5XL);
  padding-left: calc(var(--space4XL) * 2);

  @media (min-width: ${media.desktop}px) {
    padding-left: var(--space5XL);
  }

  @media (max-width: ${media.tablet}px) {
    padding-left: calc(var(--space4XL) + var(--space3XL));
  }

  @media (max-width: ${media.mobile}px) {
    padding-right: var(--spaceL);
    padding-left: var(--spaceL);
  }

  @media (max-width: ${media.mobile}px), (max-height: ${media.mobile}px) {
    padding-left: var(--spaceOuter);
    padding-right: var(--spaceOuter);
  }

  @media ${media.mobileLS} {
    padding-left: var(--space4XL);
    padding-right: var(--space4XL);
  }
`;

// Clip path to create angled corners
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
