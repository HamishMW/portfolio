import { Button } from '~/components/button';
import { Icon } from '~/components/icon';
import { useTheme } from '~/components/theme-provider';
import { useReducedMotion } from 'framer-motion';
import { useHasMounted, useInViewport } from '~/hooks';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { resolveSrcFromSrcSet } from '~/utils/image';
import { classes, cssProps, numToMs } from '~/utils/style';
import styles from './image.module.css';

export const Image = ({
  className,
  style,
  reveal,
  delay = 0,
  raised,
  src: baseSrc,
  srcSet,
  placeholder,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();
  const containerRef = useRef();
  const src = baseSrc || srcSet.split(' ')[0];
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
      data-theme={theme}
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
        srcSet={srcSet}
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
  restartOnPause,
  reveal,
  sizes,
  width,
  height,
  noPauseButton,
  cover,
  ...rest
}) => {
  const reduceMotion = useReducedMotion();
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [playing, setPlaying] = useState(!reduceMotion);
  const [videoSrc, setVideoSrc] = useState();
  const [videoInteracted, setVideoInteracted] = useState(false);
  const placeholderRef = useRef();
  const videoRef = useRef();
  const isVideo = getIsVideo(src);
  const showFullRes = inViewport;
  const hasMounted = useHasMounted();

  useEffect(() => {
    const resolveVideoSrc = async () => {
      const resolvedVideoSrc = await resolveSrcFromSrcSet({ srcSet, sizes });
      setVideoSrc(resolvedVideoSrc);
    };

    if (isVideo && srcSet) {
      resolveVideoSrc();
    } else if (isVideo) {
      setVideoSrc(src);
    }
  }, [isVideo, sizes, src, srcSet]);

  useEffect(() => {
    if (!videoRef.current || !videoSrc) return;

    const playVideo = () => {
      setPlaying(true);
      videoRef.current.play();
    };

    const pauseVideo = () => {
      setPlaying(false);
      videoRef.current.pause();
    };

    if (!play) {
      pauseVideo();

      if (restartOnPause) {
        videoRef.current.currentTime = 0;
      }
    }

    if (videoInteracted) return;

    if (!inViewport) {
      pauseVideo();
    } else if (inViewport && !reduceMotion && play) {
      playVideo();
    }
  }, [inViewport, play, reduceMotion, restartOnPause, videoInteracted, videoSrc]);

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

  return (
    <div
      className={styles.elementWrapper}
      data-reveal={reveal}
      data-visible={inViewport || loaded}
      style={cssProps({ delay: numToMs(delay + 1000) })}
    >
      {isVideo && hasMounted && (
        <Fragment>
          <video
            muted
            loop
            playsInline
            className={styles.element}
            data-loaded={loaded}
            data-cover={cover}
            autoPlay={!reduceMotion}
            onLoadStart={onLoad}
            src={videoSrc}
            aria-label={alt}
            ref={videoRef}
            {...rest}
          />
          {!noPauseButton && (
            <Button className={styles.button} onClick={togglePlaying}>
              <Icon icon={playing ? 'pause' : 'play'} />
              {playing ? 'Pause' : 'Play'}
            </Button>
          )}
        </Fragment>
      )}
      {!isVideo && (
        <img
          className={styles.element}
          data-loaded={loaded}
          data-cover={cover}
          onLoad={onLoad}
          decoding="async"
          src={showFullRes ? src : undefined}
          srcSet={showFullRes ? srcSet : undefined}
          width={width}
          height={height}
          alt={alt}
          sizes={sizes}
          {...rest}
        />
      )}
      {showPlaceholder && (
        <img
          aria-hidden
          className={styles.placeholder}
          data-loaded={loaded}
          data-cover={cover}
          style={cssProps({ delay: numToMs(delay) })}
          ref={placeholderRef}
          src={placeholder}
          width={width}
          height={height}
          onTransitionEnd={() => setShowPlaceholder(false)}
          decoding="async"
          loading="lazy"
          alt=""
          role="presentation"
        />
      )}
    </div>
  );
};

function getIsVideo(src) {
  return typeof src === 'string' && src.includes('.mp4');
}
