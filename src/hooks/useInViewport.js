import { useEffect, useState } from 'react';

function useInViewport(elementRef) {
  const [intersect, setIntersect] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersect(entry.isIntersecting);
    });

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef]);

  return intersect;
}

export default useInViewport;
