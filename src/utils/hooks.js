import { useEffect, useRef, useState, useCallback } from 'react';

let id = 0;
const genId = () => ++id;

export const useId = () => {
  const [id, setId] = useState(null);
  useEffect(() => setId(genId()), []);
  return id;
};

export function useScrollToTop(status) {
  const prevStatus = useRef();

  useEffect(() => {
    if (prevStatus.current === 'entering' && status === 'entered') {
      window.scrollTo(0, 0);
      document.getElementById('MainContent').focus();
    };

    prevStatus.current = status;
  }, [status]);
}

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event) {
    setValue(event.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}

export function useInterval(callback, delay, reset) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, reset]);
}

export function useWindowSize() {
  const isClient = typeof window === 'object';

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSize, isClient]);

  return windowSize;
}

export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export function usePrefersReducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const [reducedMotion, setReducedMotion] = useState(mediaQuery.matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMediaChange = () => {
      if (mediaQuery.matches) {
        setReducedMotion(true);
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    return function cleanup() {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return reducedMotion;
}
