import { useEffect, useState } from 'react';

function useInViewport(elementRef, unobserveOnIntersect, options = {}) {
  const [intersect, setIntersect] = useState(false);
  const [isUnobserved, setIsUnobserved] = useState(false);

  useEffect(() => {
    if (!elementRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      const { isIntersecting, target } = entry;

      setIntersect(isIntersecting);

      if (isIntersecting && unobserveOnIntersect) {
        observer.unobserve(target);
        setIsUnobserved(true);
      }
    }, options);

    if (!isUnobserved) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [elementRef, unobserveOnIntersect, options, isUnobserved]);

  return intersect;
}

export default useInViewport;
