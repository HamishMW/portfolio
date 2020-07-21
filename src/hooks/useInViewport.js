import { useEffect, useState } from 'react';

function useInViewport(elementRef, unobserveOnIntersect, options = {}) {
  const [intersect, setIntersect] = useState(false);

  useEffect(() => {
    if (!elementRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      const { isIntersecting, target } = entry;

      setIntersect(isIntersecting);

      if (isIntersecting && unobserveOnIntersect) {
        observer.unobserve(target);
      }
    }, options);

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef, unobserveOnIntersect, options]);

  return intersect;
}

export default useInViewport;
