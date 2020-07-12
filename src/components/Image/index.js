import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import classNames from 'classnames';
import { usePrefersReducedMotion } from 'hooks';
import { Button } from 'components/Button';
import Icon from 'components/Icon';
import { Transition } from 'react-transition-group';
import { reflow } from 'utils/transition';
import prerender from 'utils/prerender';
import { msToNum, tokens } from 'app/theme';
import './index.css';

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
    <div
      className={classNames('image', className, {
        'image--intersect': intersect,
        'image--reveal': reveal,
      })}
      style={{ ...style, '--delay': `${delay}ms` }}
      ref={containerRef}
    >
      <ImageElements
        delay={delay}
        onLoad={onLoad}
        loaded={loaded}
        intersect={intersect}
        reveal={reveal}
        {...rest}
      />
    </div>
  );
}

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

  const togglePlaying = event => {
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
    <div
      className={classNames('image__element-wrapper', {
        'image__element-wrapper--reveal': reveal,
        'image__element-wrapper--intersect': intersect,
      })}
      onMouseOver={videoSrc ? handleShowPlayButton : undefined}
      onMouseOut={videoSrc ? () => setIsHovered(false) : undefined}
      style={{ '--delay': `${delay + 1000}ms` }}
    >
      {videoSrc && (
        <Fragment>
          <video
            muted
            loop
            playsInline
            className={classNames('image__element', { 'image__element--loaded': loaded })}
            autoPlay={!prefersReducedMotion}
            role="img"
            onLoadStart={onLoad}
            src={videoSrc}
            aria-label={alt}
            ref={videoRef}
            {...rest}
          />
          <Transition
            in={isHovered || isFocused}
            onExit={reflow}
            onExited={() => setShowPlayButton(false)}
            timeout={{ enter: 0, exit: msToNum(tokens.base.durationS) }}
          >
            {status => (
              <Button
                iconOnly
                className={classNames('image__button', `image__button--${status}`, {
                  'image__button--visible': showPlayButton,
                })}
                onFocus={handleFocusPlayButton}
                onBlur={() => setIsFocused(false)}
                onClick={togglePlaying}
              >
                <Icon icon={playing ? 'pause' : 'play'} />
                {playing ? 'Pause' : 'Play'}
              </Button>
            )}
          </Transition>
        </Fragment>
      )}
      {!videoSrc && (
        <img
          className={classNames('image__element', { 'image__element--loaded': loaded })}
          onLoad={onLoad}
          decoding="async"
          src={!prerender && intersect ? srcSet.split(' ')[0] : ''}
          srcSet={!prerender && intersect ? srcSet : ''}
          alt={alt}
          {...rest}
        />
      )}
      {showPlaceholder && (
        <img
          aria-hidden
          className={classNames('image__placeholder', {
            'image__placeholder--loaded': loaded,
          })}
          style={{ transitionDelay: `${delay}ms` }}
          ref={placeholderRef}
          src={placeholder}
          alt=""
          role="presentation"
        />
      )}
    </div>
  );
}

export default ProgressiveImage;
