import { useState, useEffect } from 'react';

const isBrowser = typeof window !== 'undefined';

function getSize() {
  return {
    width: isBrowser ? window.innerWidth : 1280, // Default width for SSR
    height: isBrowser ? window.innerHeight : 800, // Default height for SSR
  };
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isBrowser) {
      return; // Don't add event listener on the server
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}