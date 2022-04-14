import { useEffect, useState } from 'react';
import { ssr } from 'utils/ssr';

export function usePrefersReducedMotion() {
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
