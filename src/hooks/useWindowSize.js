import { useEffect, useState } from 'react';

const SSR_SIZE = { width: 1280, height: 800 };

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(SSR_SIZE);

  useEffect(() => {
    const getHeight = () => {
      const isIOS = navigator?.userAgent.match(/iphone|ipod|ipad/i);

      if (isIOS) {
        let ruler = document.createElement('div');
        ruler.style.position = 'fixed';
        ruler.style.height = '100lvh';
        ruler.style.width = 0;
        ruler.style.top = 0;

        document.documentElement.appendChild(ruler);
        const fullIOSHeight = ruler.offsetHeight;

        document.documentElement.removeChild(ruler);
        ruler = null;

        return fullIOSHeight;
      }

      return window.innerHeight;
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: getHeight(),
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
