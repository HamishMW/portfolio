import { useCallback, useEffect, useRef, useState } from 'react';

function useWindowSize() {
  const isClient = typeof window === 'object';
  const isIOS = navigator.userAgent.match(/iphone|ipod|ipad/i);
  const axis = useRef(() => ({ w: 0, h: 0 }));
  const dimensions = useRef(() => Math.abs(window.orientation));

  const createRuler = useCallback(() => {
    let ruler = document.createElement('div');

    ruler.style.position = 'fixed';
    ruler.style.height = '100vh';
    ruler.style.width = 0;
    ruler.style.top = 0;

    document.documentElement.appendChild(ruler);

    // Set cache conscientious of device orientation
    dimensions.current.w = axis.current === 90 ? ruler.offsetHeight : window.innerWidth;
    dimensions.current.h = axis.current === 90 ? window.innerWidth : ruler.offsetHeight;

    // Clean up after ourselves
    document.documentElement.removeChild(ruler);
    ruler = null;
  }, []);

  // Get the actual height on iOS Safari
  const getHeight = useCallback(() => {
    if (!isClient) return 0;

    if (isIOS) {
      createRuler();

      if (Math.abs(window.orientation) !== 90) {
        return dimensions.current.h;
      }

      return dimensions.current.w;
    }

    return window.innerHeight;
  }, [createRuler, isClient, isIOS]);

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: getHeight(),
    };
  }, [getHeight, isClient]);

  const [windowSize, setWindowSize] = useState(() => getSize());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getSize, isClient]);

  return windowSize;
}

export default useWindowSize;
