import { useEffect, useContext } from 'react';
import { usePrevious, usePrefersReducedMotion } from '.';
import { TransitionContext } from 'app';

function useScrollRestore() {
  const { status } = useContext(TransitionContext);
  const prevStatus = usePrevious(status);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const hasEntered = prevStatus === 'entering' && status === 'entered';
    const hasEnteredReducedMotion = prefersReducedMotion && status === 'entered';

    if (hasEntered || hasEnteredReducedMotion) {
      window.scrollTo(0, 0);
      document.getElementById('MainContent').focus();
    };

  }, [prefersReducedMotion, prevStatus, status]);
}

export default useScrollRestore;
