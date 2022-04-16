import { usePrefersReducedMotion } from 'hooks';
import { useRouter } from 'next/router';
import { useCallback, useRef } from 'react';

export function useScrollToHash() {
  const scrollTimeout = useRef();
  const { route, push } = useRouter();
  const reduceMotion = usePrefersReducedMotion();

  const scrollToHash = useCallback(
    (hash, onDone) => {
      const id = hash.split('#')[1];
      const targetElement = document.getElementById(id);
      const newPath = `${route}#${id}`;

      targetElement.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });

      const handleScroll = () => {
        clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
          onDone?.();
          push(newPath, null, { scroll: false });
          window.removeEventListener('scroll', handleScroll);
        }, 50);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    },
    [push, reduceMotion, route]
  );

  return scrollToHash;
}
