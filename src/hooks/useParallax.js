import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from 'hooks';

function useParallax(multiplier) {
  const [offset, setOffset] = useState();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let ticking = false;
    let animationFrame = null;

    const animate = () => {
      setOffset(Math.max(0, window.scrollY) * multiplier);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll);
    }

    return function cleanUp() {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, [multiplier, prefersReducedMotion]);

  return offset;
}

export default useParallax;
