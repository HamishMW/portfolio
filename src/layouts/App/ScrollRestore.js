import { useIsPresent } from 'framer-motion';
import { useRouteTransition } from 'hooks';
import { useRouter } from 'next/router';
import { ROUTE_TRANSITION_DURATION } from 'pages/_app.page';
import { useEffect } from 'react';

// Custom scroll restoration to avoid jank during page transitions
export const ScrollRestore = () => {
  const isPresent = useIsPresent();
  const { asPath, replace, events, beforePopState } = useRouter();
  const { status } = useRouteTransition();

  useEffect(() => {
    // Opt out of native scroll restoration
    window.history.scrollRestoration = 'manual';
  }, []);

  // Wait for route transition before applying hash
  useEffect(() => {
    beforePopState(state => {
      state.options.scroll = false;
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wait for route transition before applying hash
  useEffect(() => {
    const handleRouteChange = url => {
      const [path, hash] = url.split('#');

      if (hash) {
        replace(path, null, { scroll: false });

        setTimeout(() => {
          replace(`${path}#${hash}`, null, { scroll: false });
        }, ROUTE_TRANSITION_DURATION);
      }
    };

    events.on('routeChangeStart', handleRouteChange);

    return () => {
      events.off('routeChangeStart', handleRouteChange);
    };
  }, [events, replace]);

  // Handle shifting focus to linked element
  useEffect(() => {
    const hash = asPath.split('#')[1];
    const targetElement = document.getElementById(hash);

    if (targetElement) {
      requestAnimationFrame(() => {
        targetElement.focus({ preventScroll: true });
      });
    }
  }, [asPath]);

  useEffect(() => {
    if (!isPresent) return;

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
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
        });
      }
    };

    restoreScroll();
    document.getElementById('MainContent').focus({ preventScroll: true });
  }, [asPath, isPresent, status]);
};
