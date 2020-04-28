import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import { usePrefersReducedMotion } from 'hooks';
import { Button } from 'components/Button';
import Icon from 'components/Icon';
import { Transition } from 'react-transition-group';
import { reflow } from 'utils/transition';
import prerender from 'utils/prerender';

function ProgressiveImage(props) {
  const { className, style, reveal, delay = 0, ...rest } = props;
  const [loaded, setLoaded] = useState(false);
  const [intersect, setIntersect] = useState(false);
  const containerRef = useRef();

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        setIntersect(true);
        observer.unobserve(image);
      }
    });

    observer.observe(containerRef.current);

    return function cleanUp() {
      observer.disconnect();
    };
  }, []);

  return (
    <ImageContainer
      className={className}
      style={style}
      ref={containerRef}
      reveal={reveal}
      intersect={intersect}
      loaded={loaded}
      delay={delay}
    >
      <ImageElements
        delay={delay}
        onLoad={onLoad}
        loaded={loaded}
        intersect={intersect}
        reveal={reveal}
        {...rest}
      />
    </ImageContainer>
  );
};

function ImageElements(props) {
  const {
    onLoad,
    loaded,
    intersect,
    srcSet,
    placeholder,
    delay,
    videoSrc,
    src,
    alt,
    reveal,
    ...rest
  } = props;
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [playing, setPlaying] = useState(!prefersReducedMotion);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const placeholderRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    const purgePlaceholder = () => {
      setShowPlaceholder(false);
    };

    const placeholderElement = placeholderRef.current;
    placeholderElement.addEventListener('transitionend', purgePlaceholder);

    return function cleanUp() {
      if (placeholderElement) {
        placeholderElement.removeEventListener('transitionend', purgePlaceholder);
      }
    };
  }, []);

  const togglePlaying = (event) => {
    event.preventDefault();

    if (videoRef.current.paused) {
      setPlaying(true);
      videoRef.current.play();
    } else {
      setPlaying(false);
      videoRef.current.pause();
    }
  };

  const handleShowPlayButton = () => {
    setShowPlayButton(true);
    setIsHovered(true);
  };

  const handleFocusPlayButton = () => {
    setShowPlayButton(true);
    setIsFocused(true);
  };

  return (
    <ImageElementWrapper
      reveal={reveal}
      intersect={intersect}
      delay={delay}
      onMouseOver={videoSrc ? handleShowPlayButton : undefined}
      onMouseOut={videoSrc ? () => setIsHovered(false) : undefined}
    >
      {videoSrc &&
        <Fragment>
          <ImageActual
            muted
            loop
            playsInline
            autoPlay={!prefersReducedMotion}
            as="video"
            role="img"
            delay={delay}
            onLoadStart={onLoad}
            loaded={loaded}
            src={videoSrc}
            aria-label={alt}
            ref={videoRef}
            {...rest}
          />
          <Transition
            in={isHovered || isFocused}
            onExit={reflow}
            onExited={() => setShowPlayButton(false)}
            timeout={{ enter: 0, exit: 300 }}
          >
            {(status) => (
              <ImageButton
                iconOnly
                status={status}
                showPlayButton={showPlayButton}
                onFocus={handleFocusPlayButton}
                onBlur={() => setIsFocused(false)}
                onClick={togglePlaying}
              >
                <Icon icon={playing ? 'pause' : 'play'} />
                {playing ? 'Pause' : 'Play'}
              </ImageButton>
            )}
          </Transition>
        </Fragment>
      }
      {!videoSrc &&
        <ImageActual
          delay={delay}
          onLoad={onLoad}
          decoding="async"
          loaded={loaded}
          src={!prerender && intersect ? srcSet.split(' ')[0] : ''}
          srcSet={!prerender && intersect ? srcSet : ''}
          alt={alt}
          {...rest}
        />
      }
      {showPlaceholder &&
        <ImagePlaceholder
          delay={delay}
          ref={placeholderRef}
          loaded={loaded}
          src={placeholder}
          alt=""
          role="presentation"
        />
      }
    </ImageElementWrapper>
  );
}

const AnimImageReveal = keyframes`
  0% {
    transform: scale3d(0, 1, 1);
    transform-origin: left;
  }
  49% {
    transform: scale3d(1, 1, 1);
    transform-origin: left;
  }
  50% {
    transform: scale3d(1, 1, 1);
    transform-origin: right;
  }
  100% {
    transform: scale3d(0, 1, 1);
    transform-origin: right;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  transform: translate3d(0, 0, 0);
  display: grid;
  grid-template-columns: 100%;

  ${props => props.reveal && css`
    &::before {
      content: '';
      background-color: rgb(var(--rgbAccent));
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: scale3d(0, 1, 1);
      transform-origin: left;
      z-index: 16;
      animation: ${props.intersect && !prerender && css`
        ${AnimImageReveal} 1.8s var(--curveFastoutSlowin) ${props.delay + 200}ms
      `};
    }
  `}
`;

const ImageElementWrapper = styled.div`
  opacity: ${props => !props.reveal || props.intersect ? 1 : 0};
  transition: ${props => props.reveal ? `opacity 0.4s ease ${props.delay + 1000}ms` : 'none'};
  transform: translate3d(0, 0, 0);
  position: relative;
  display: grid;
  grid-template-columns: 100%;
`;

const ImagePlaceholder = styled.img`
  width: 100%;
  height: auto;
  transition: opacity 0.4s ease;
  pointer-events: none;
  display: block;
  position: relative;
  z-index: 1;
  opacity: ${props => props.loaded ? 0 : 1};
  grid-column: 1;
  grid-row: 1;
`;

const ImageActual = styled.img`
  width: 100%;
  height: auto;
  display: block;
  opacity: ${props => props.loaded ? 1 : 0};
  grid-column: 1;
  grid-row: 1;
`;

const ImageButton = styled(Button)`
  border: 0;
  position: absolute;
  opacity: 0;
  font-size: 16px;
  transition-property: opacity, background;
  transition-duration: 0.3s;
  transition-delay: 0s;
  cursor: pointer;
  padding: 0 14px 0 10px;
  height: 40px;

  svg {
    fill: white;
    margin-right: 8px;
    position: relative;
    top: -1px;
  }

  span {
    color: white;
    display: inline-flex;
    align-items: center;
    line-height: 1;
  }

  &::after {
    background: rgba(0, 0, 0, 0.6);
  }

  &:hover::after,
  &:focus::after {
    background: rgba(0, 0, 0, 0.7);
  }

  &::before {
    background: rgba(0, 0, 0, 0.9);
  }

  ${props => props.status === 'entered' && css`
    opacity: 1;
  `}

  ${props => !props.showPlayButton && css`
    padding: 0;
    height: 1px;
    width: 1px;
    clip: rect(0 0 0 0);
    margin: -1px;
    overflow: hidden;
  `}

  ${props => props.showPlayButton && css`
    clip: auto;
    margin: 0;
    top: 10px;
    left: 10px;
    overflow: visible;
    width: auto;
  `}
`;

export default ProgressiveImage;
