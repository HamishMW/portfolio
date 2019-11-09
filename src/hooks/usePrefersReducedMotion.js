import { useEffect, useState } from 'react';

function usePrefersReducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const [reducedMotion, setReducedMotion] = useState(mediaQuery.matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMediaChange = () => {
      if (mediaQuery.matches) {
        setReducedMotion(true);
      }
    };

    mediaQuery.addListener(handleMediaChange);

    return function cleanup() {
      mediaQuery.removeListener(handleMediaChange);
    };
  }, []);

  return reducedMotion;
}

export default usePrefersReducedMotion;
