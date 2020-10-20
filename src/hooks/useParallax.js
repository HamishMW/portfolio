import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from 'hooks';

function useParallax(multiplier, clamp = true) {
  const [offset, setOffset] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let ticking = false;
    let animationFrame = null;

    const animate = () => {
      const { innerHeight } = window;
      const offsetValue = Math.max(0, window.scrollY) * multiplier;
      const clampedOffsetValue = Math.max(
        -innerHeight,
        Math.min(innerHeight, offsetValue)
      );
      setOffset(clamp ? clampedOffsetValue : offsetValue);
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, [clamp, multiplier, prefersReducedMotion]);

  return offset;
}

export default useParallax;
