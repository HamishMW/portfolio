import React from 'react';
import styled, { css, useTheme } from 'styled-components/macro';
import { Button } from 'components/Button';
import { useAppContext, useId } from 'hooks';
import { media } from 'utils/style';

const ThemeToggle = ({ isMobile, ...rest }) => {
  const { themeId } = useTheme();
  const { dispatch } = useAppContext();
  const isDark = themeId === 'dark';
  const id = useId();
  const maskId = `theme-toggle-clip-${id}`;

  const handleClick = () => {
    dispatch({ type: 'toggleTheme' });
  };

  return (
    <ThemeToggleButton
      iconOnly
      aria-label="Toggle theme"
      onClick={handleClick}
      isMobile={isMobile}
      {...rest}
    >
      <ThemeToggleSvg aria-hidden width="38" height="38" viewBox="0 0 38 38">
        <defs>
          <mask id={maskId}>
            <ThemeToggleCircle isMask isDark={isDark} cx="19" cy="19" r="13" />
            <ThemeToggleMask isDark={isDark} cx="25" cy="14" r="9" />
          </mask>
        </defs>
        <ThemeTogglePath
          isDark={isDark}
          d="M19 3v7M19 35v-7M32.856 11l-6.062 3.5M5.144 27l6.062-3.5M5.144 11l6.062 3.5M32.856 27l-6.062-3.5"
        />
        <ThemeToggleCircle
          isDark={isDark}
          mask={`url(#${maskId})`}
          cx="19"
          cy="19"
          r="12"
        />
      </ThemeToggleSvg>
    </ThemeToggleButton>
  );
};

const ThemeToggleButton = styled(Button)`
  --buttonSize: var(--space2XL);

  position: fixed;
  z-index: 2048;
  width: var(--buttonSize);
  height: var(--buttonSize);
  top: var(--spaceOuter);
  right: var(--spaceOuter);
  margin-top: calc(var(--spaceS) * -1);
  margin-right: calc(var(--spaceS) * -1);
  transform: translate3d(0, 0, 0);

  ${props =>
    props.isMobile &&
    css`
      top: unset;
      bottom: var(--spaceXL);
      right: var(--spaceXL);
      margin-top: 0;
      margin-right: 0;
    `}

  ${props =>
    !props.isMobile &&
    css`
      @media (max-width: ${media.mobile}px), (max-height: ${media.mobile}px) {
        display: none;
      }
    `}
`;

const ThemeToggleSvg = styled.svg`
  display: block;
`;

const ThemeToggleCircle = styled.circle`
  fill: ${props => (props.isMask ? 'white' : 'currentColor')};
  transform: ${props => (props.isDark ? 'none' : 'scale(0.6)')};
  transform-origin: center;
  transition-property: transform, fill;
  transition-duration: var(--durationL);
  transition-timing-function: var(--bezierFastoutSlowin);
  transition-delay: ${props => (props.isDark ? '0.3s' : '0s')};
`;

const ThemeToggleMask = styled.circle`
  fill: black;
  transform: ${props => (props.isDark ? 'none' : 'translate3d(100%, -100%, 0)')};
  transition: transform var(--durationL) var(--bezierFastoutSlowin);
  transition-delay: ${props => (props.isDark ? '0.3s' : '0s')};
`;

const ThemeTogglePath = styled.path`
  stroke: currentColor;
  fill: none;
  stroke-linecap: round;
  stroke-width: 3;
  stroke-dasharray: 7 7;
  stroke-dashoffset: ${props => (props.isDark ? 7 : 0)};
  transition-property: stroke-dashoffset, opacity;
  transition-duration: var(--durationL);
  transition-timing-function: var(--bezierFastoutSlowin);
  transition-delay: ${props => (props.isDark ? '0s' : '0.3s')};
  opacity: ${props => (props.isDark ? 0 : 1)};
`;

export default ThemeToggle;
