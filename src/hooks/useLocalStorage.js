import { useState } from 'react';
import { useHasMounted } from './hasMounted';

export function useLocalStorage(key, initialValue) {
  const hasMounted = useHasMounted();

  const [storedValue, setStoredValue] = useState(() => {
    if (!hasMounted) return;

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
