import React, { useEffect, useRef, useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import lottie from 'lottie-web/build/player/lottie_light.min';
import { Button } from 'components/Button';
import themeIconData from 'data/themeIcon.json';
import { media } from 'utils/styleUtils';
import { usePrefersReducedMotion } from 'utils/hooks';
import { AppContext } from 'app';

export default function ThemeToggle({ isMobile, ...rest }) {
  const theme = useContext(ThemeContext);
  const { dispatch } = useContext(AppContext);
  const initThemeId = useRef(theme.id);
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

    return () => {
      lottieAnimRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    lottieAnimRef.current.setDirection(theme.id === 'dark' ? 1 : -1);

    if (prefersReducedMotion) {
      const duration = lottieAnimRef.current.totalFrames - 1;
      lottieAnimRef.current.goToAndStop(theme.id === 'dark' ? duration : 0, true);
    } else {
      lottieAnimRef.current.play();
    }
  }, [prefersReducedMotion, theme.id]);

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
  transform: translate3d(0, 0, 0);

  @media (max-width: ${media.tablet}) {
    top: ${props => props.isMobile ? 'unset' : `${props.theme.spacingOuter.numTablet - 8}px`};
    right: ${props => props.isMobile ? '30px' : `${props.theme.spacingOuter.numTablet - 8}px`};
  }

  ${props => props.isMobile && css`
    top: unset;
    bottom: 30px;
  `}

  ${props => !props.isMobile && css`
    @media (max-width: ${media.mobile}), (max-height: ${media.mobile}) {
      display: none;
    }
  `}

  svg {
    flex: 1 1 100%;
    position: relative;
  }

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
