import { useEffect, useState } from 'react';
import { useSsr } from './useSsr';

export function usePrefersReducedMotion() {
  const ssr = useSsr();

  const [reduceMotion, setReduceMotion] = useState(() =>
    !ssr ? window.matchMedia?.('(prefers-reduced-motion: reduce)').matches : false
  );

  useEffect(() => {
    if (ssr) return;

    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');

    const handleMediaChange = () => {
      setReduceMotion(mediaQuery?.matches);
    };

    mediaQuery?.addListener(handleMediaChange);
    handleMediaChange();

    return () => {
      mediaQuery?.removeListener(handleMediaChange);
    };
  }, []);

  return reduceMotion;
}
