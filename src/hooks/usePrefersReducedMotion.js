import { useEffect, useState } from 'react';

function usePrefersReducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const [reduceMotion, setReduceMotion] = useState(mediaQuery.matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMediaChange = () => {
      if (mediaQuery.matches) {
        setReduceMotion(true);
      }
    };

    mediaQuery.addListener(handleMediaChange);

    return () => {
      mediaQuery.removeListener(handleMediaChange);
    };
  }, []);

  return reduceMotion;
}

export default usePrefersReducedMotion;
