import { useEffect, useState } from 'react';

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
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

export default usePrefersReducedMotion;
