import Router from 'next/router';
import { useEffect } from 'react';

// Temporary fix to avoid flash of unstyled content (FOUC) during route transitions.
// Keep an eye on this issue and remove this code when resolved: https://github.com/vercel/next.js/issues/17464
export function useFoucFix() {
  useEffect(() => {
    const handleRouteChange = () => {
      const allStyleElements = document.querySelectorAll('style[media="x"]');

      allStyleElements.forEach(elem => {
        elem.removeAttribute('media');
      });
    };

    Router.events.on('routeChangeComplete', handleRouteChange);
    Router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const pathname = Router.router?.pathname;
    const query = Router.router?.query;
    Router.router?.push({ pathname, query });
  }, []);
}
