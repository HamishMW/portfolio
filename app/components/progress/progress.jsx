import { useNavigation } from '@remix-run/react';
import { useRef, useEffect, useState } from 'react';
import styles from './progress.module.css';

export function Progress() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const { state } = useNavigation();
  const progressRef = useRef();

  useEffect(() => {
    if (!progressRef.current) return;

    const controller = new AbortController();

    if (state !== 'idle') {
      return setAnimationComplete(false);
    }

    Promise.all(
      progressRef.current
        .getAnimations({ subtree: true })
        .map(animation => animation.finished)
    ).then(() => {
      if (controller.signal.aborted) return;
      setAnimationComplete(true);
    });

    return () => {
      controller.abort();
    };
  }, [state]);

  return (
    <div
      className={styles.progress}
      data-status={state}
      data-complete={animationComplete}
      ref={progressRef}
    />
  );
}
