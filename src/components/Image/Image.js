import { Button } from 'components/Button';
import { Icon } from 'components/Icon';
import { useTheme } from 'components/ThemeProvider';
import { tokens } from 'components/ThemeProvider/theme';
import { VisuallyHidden } from 'components/VisuallyHidden';
import { useInViewport, usePrefersReducedMotion } from 'hooks';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { resolveVideoSrcFromSrcSet } from 'utils/image';
import { classes, cssProps, msToNum, numToMs } from 'utils/style';
import { reflow } from 'utils/transition';
import styles from './Image.module.css';

export const Image = ({
  className,
  style,
  reveal,
  delay = 0,
  raised,
  src,
  placeholder,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const { themeId } = useTheme();
  const containerRef = useRef();
  const inViewport = useInViewport(containerRef, !getIsVideo(src));

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className={classes(styles.image, className)}
      data-visible={inViewport || loaded}
      data-reveal={reveal}
      data-raised={raised}
      data-theme={themeId}
      style={cssProps({ delay: numToMs(delay) }, style)}
      ref={containerRef}
    >
      <ImageElements
        delay={delay}
        onLoad={onLoad}
        loaded={loaded}
        inViewport={inViewport}
        reveal={reveal}
        src={src}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

const ImageElements = ({
  onLoad,
  loaded,
  inViewport,
  srcSet,
  placeholder,
  delay,
  src,
  alt,
  play = true,
  reveal,
  ...rest
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [playing, setPlaying] = useState(!prefersReducedMotion);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [videoSrc, setVideoSrc] = useState();
  const [videoInteracted, setVideoInteracted] = useState(false);
  const placeholderRef = useRef();
  const videoRef = useRef();
  const isVideo = getIsVideo(src);
  const showFullRes = inViewport;

  useEffect(() => {
    const resolveVideoSrc = async () => {
      const resolvedVideoSrc = await resolveVideoSrcFromSrcSet(srcSet);
      setVideoSrc(resolvedVideoSrc);
    };

    if (isVideo && srcSet) {
      resolveVideoSrc();
    } else if (isVideo) {
      setVideoSrc(src);
    }
  }, [isVideo, src, srcSet]);

  useEffect(() => {
    if (!videoRef.current || !videoSrc || videoInteracted) return;

    if (!play || !inViewport) {
      setPlaying(false);
      videoRef.current.pause();
    } else if (inViewport && !prefersReducedMotion) {
      setPlaying(true);
      videoRef.current.play();
    }
  }, [inViewport, play, prefersReducedMotion, videoInteracted, videoSrc]);

  const togglePlaying = event => {
    event.preventDefault();

    setVideoInteracted(true);

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
      className={styles.elementWrapper}
      data-reveal={reveal}
      data-visible={inViewport || loaded}
      onMouseOver={isVideo ? handleShowPlayButton : undefined}
      onMouseOut={isVideo ? () => setIsHovered(false) : undefined}
      style={cssProps({ delay: numToMs(delay + 1000) })}
    >
      {isVideo && (
        <Fragment>
          <video
            muted
            loop
            playsInline
            className={styles.element}
            data-loaded={loaded}
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
              <VisuallyHidden visible={showPlayButton}>
                <Button
                  className={styles.button}
                  data-status={status}
                  onFocus={handleFocusPlayButton}
                  onBlur={() => setIsFocused(false)}
                  onClick={togglePlaying}
                >
                  <Icon icon={playing ? 'pause' : 'play'} />
                  {playing ? 'Pause' : 'Play'}
                </Button>
              </VisuallyHidden>
            )}
          </Transition>
        </Fragment>
      )}
      {!isVideo && (
        <img
          className={styles.element}
          data-loaded={loaded}
          onLoad={onLoad}
          decoding="async"
          src={showFullRes ? src.src : undefined}
          srcSet={showFullRes ? srcSet : undefined}
          width={src.width}
          height={src.height}
          alt={alt}
          {...rest}
        />
      )}
      {showPlaceholder && (
        <img
          aria-hidden
          className={styles.placeholder}
          data-loaded={loaded}
          style={cssProps({ delay: numToMs(delay) })}
          ref={placeholderRef}
          src={placeholder.src}
          width={placeholder.width}
          height={placeholder.height}
          onTransitionEnd={() => setShowPlaceholder(false)}
          decoding="async"
          alt=""
          role="presentation"
        />
      )}
    </div>
  );
};

function getIsVideo(src) {
  return typeof src === 'string' && src.endsWith('.mp4');
}
