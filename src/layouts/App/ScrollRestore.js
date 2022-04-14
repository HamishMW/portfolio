import { usePrefersReducedMotion, usePrevious, useRouteTransition } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Custom scroll restoration to avoid jank during page transitions
export const ScrollRestore = () => {
  const { asPath } = useRouter();
  const { status } = useRouteTransition();
  const prevStatus = usePrevious(status);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const hasEntered = prevStatus === 'entering' && status === 'entered';
    const hasEnteredReducedMotion = prefersReducedMotion && status === 'entered';

    const restoreScroll = () => {
      // Handle hash link restoration
      if (asPath.includes('#')) {
        requestAnimationFrame(() => {
          const target = document.getElementById(asPath.split('#')[1]);

          if (target) {
            window.scrollTo(0, target.offsetTop);
          }
        });
      } else {
        window.scrollTo(0, 0);
      }
    };

    // if (!prevStatus) {
    //   restoreScroll();
    // }

    if (hasEntered || hasEnteredReducedMotion) {
      restoreScroll();
      document.getElementById('MainContent').focus();
    }
  }, [asPath, prefersReducedMotion, prevStatus, status]);
};
