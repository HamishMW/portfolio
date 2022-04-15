import { usePrefersReducedMotion, usePrevious, useRouteTransition } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Custom scroll restoration to avoid jank during page transitions
export const ScrollRestore = () => {
  const { asPath, beforePopState } = useRouter();
  const { status } = useRouteTransition();
  const prevStatus = usePrevious(status);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    beforePopState(state => {
      state.options.scroll = false;
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Opt out of auto scroll restoration
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    const hasEntered = prevStatus === 'entering' && status === 'entered';
    const hasEnteredReducedMotion = prefersReducedMotion && status === 'entered';

    const restoreScroll = () => {
      document.documentElement.style = 'scroll-behavior: auto';

      // Handle hash link restoration
      if (asPath.includes('#')) {
        requestAnimationFrame(() => {
          const target = document.getElementById(asPath.split('#')[1]);

          if (target) {
            window.scrollTo(0, target.offsetTop);
          }
        });
      } else {
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
        });
      }

      setTimeout(() => {
        document.documentElement.removeAttribute('style');
      }, 1000);
    };

    if (hasEntered || hasEnteredReducedMotion) {
      restoreScroll();
      document.getElementById('MainContent').focus();
    }
  }, [asPath, prefersReducedMotion, prevStatus, status]);
};
