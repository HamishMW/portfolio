import { useEffect, useState } from 'react';

function useInViewport(elementRef, unobserveOnIntersect) {
  const [intersect, setIntersect] = useState(false);

  useEffect(() => {
    if (!elementRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      const { isIntersecting, target } = entry;

      setIntersect(isIntersecting);

      if (isIntersecting && unobserveOnIntersect) {
        observer.unobserve(target);
      }
    });

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef, unobserveOnIntersect]);

  return intersect;
}

export default useInViewport;
