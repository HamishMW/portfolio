import { usePrefersReducedMotion, usePrevious, useRouteTransition } from 'hooks';
import { useRouter } from 'next/router';
import { ROUTE_TRANSITION_DURATION } from 'pages/_app.page';
import { useEffect } from 'react';

// Custom scroll restoration to avoid jank during page transitions
export const ScrollRestore = () => {
  const { asPath, replace, events } = useRouter();
  const { status } = useRouteTransition();
  const prevStatus = usePrevious(status);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Opt out of native scroll restoration
    window.history.scrollRestoration = 'manual';
  }, []);

  // Wait for route transition before applying hash
  useEffect(() => {
    const handleRouteChange = url => {
      console.log({ url });
      const [path, hash] = url.split('#');

      if (hash) {
        replace(path);

        setTimeout(() => {
          replace(`${path}#${hash}`);
        }, ROUTE_TRANSITION_DURATION * 2);
      }
    };

    events.on('routeChangeStart', handleRouteChange);

    return () => {
      events.off('routeChangeStart', handleRouteChange);
    };
  }, [events, replace]);

  // Handle shifting focus to linked element
  useEffect(() => {
    if (['entering', 'exiting'].includes(status)) return;

    const hash = asPath.split('#')[1];
    const targetElement = document.getElementById(hash);

    if (targetElement) {
      targetElement.focus({ preventScroll: true });
    }
  }, [asPath, status]);

  useEffect(() => {
    const hasEntered = prevStatus === 'entering' && status === 'entered';
    const hasEnteredReducedMotion = reduceMotion && status === 'entered';

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
  }, [asPath, reduceMotion, prevStatus, status]);
};
