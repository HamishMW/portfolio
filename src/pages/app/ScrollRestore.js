import { usePrefersReducedMotion, usePrevious, useRouteTransition } from 'hooks';
import { useEffect } from 'react';

// Custom scroll restoration to avoid jank during page transitions
export const ScrollRestore = () => {
  const { status } = useRouteTransition();
  const prevStatus = usePrevious(status);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const hasEntered = prevStatus === 'entering' && status === 'entered';
    const hasEnteredReducedMotion = prefersReducedMotion && status === 'entered';

    if (hasEntered || hasEnteredReducedMotion) {
      window.scrollTo(0, 0);
      document.getElementById('MainContent').focus();
    }
  }, [prefersReducedMotion, prevStatus, status]);
};
