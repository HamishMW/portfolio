import { useEffect, useState } from 'react';

const SSR_SIZE = { width: 1280, height: 800 };

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(SSR_SIZE);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}
