import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components/macro';
import lottie from 'lottie-web/build/player/lottie_light.min';
import { Button } from '../components/Button';
import themeIconData from '../data/themeIconData.json';
import { media } from '../utils/styleUtils';
import { usePrefersReducedMotion } from '../utils/hooks';

export default function ThemeToggle({ themeId, toggleTheme, isMobile, ...rest }) {
  const initThemeId = useRef(themeId);
  const lottieContainerRef = useRef();
  const lottieAnimRef = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    lottieAnimRef.current = lottie.loadAnimation({
      container: lottieContainerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: themeIconData,
    });

    const duration = lottieAnimRef.current.totalFrames - 1;
    lottieAnimRef.current.goToAndStop(initThemeId.current === 'dark' ? duration : 0, true);
  }, []);

  useEffect(() => {
    lottieAnimRef.current.setDirection(themeId === 'dark' ? 1 : -1);

    if (prefersReducedMotion) {
      const duration = lottieAnimRef.current.totalFrames - 1;
      lottieAnimRef.current.goToAndStop(themeId === 'dark' ? duration : 0, true);
    } else {
      lottieAnimRef.current.play();
    }
  }, [themeId, prefersReducedMotion]);

  return (
    <ThemeToggleButton
      iconOnly
      aria-label="Toggle theme"
      onClick={toggleTheme}
      isMobile={isMobile}
      {...rest}
    >
      <ThemeToggleWrapper ref={lottieContainerRef} />
    </ThemeToggleButton>
  );
}

const ThemeToggleButton = styled(Button)`
  position: fixed;
  z-index: 2048;
  width: 48px;
  height: 48px;
  padding: 6px;
  top: ${props => props.theme.spacingOuter.numDesktop - 8}px;
  right: ${props => props.theme.spacingOuter.numDesktop - 8}px;

  @media (max-width: ${media.tablet}) {
    top: ${props => props.isMobile ? 'unset' : `${props.theme.spacingOuter.numTablet - 8}px`};
    right: ${props => props.isMobile ? '30px' : `${props.theme.spacingOuter.numTablet - 8}px`};
  }

  ${props => props.isMobile && css`
    top: unset;
    bottom: 30px;
  `}

  svg path {
    transition-property: fill, stroke;
    transition-timing-function: ease;
    transition-duration: 0.4s;
  }

  svg g > path {
    stroke: ${props => props.theme.colorText};
  }

  svg g[mask] path {
    fill: ${props => props.theme.colorText};
    stroke: none;
  }
`;

const ThemeToggleWrapper = styled.div`
  display: flex;
`;
