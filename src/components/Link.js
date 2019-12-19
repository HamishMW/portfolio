import React, { Fragment, useState, useEffect, useRef, forwardRef } from 'react';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import prerender from 'utils/prerender';

// Wraps react router's link to prefetch visible page links

export const Link = forwardRef(({ to, prefetch, component: Component, ...props }, ref) => {
  const [shouldPrefetch, setShouldPrefetch] = useState(false);
  const fullUrl = `${window.location.origin}${to.pathname ? to.pathname : to}`;
  const linkRef = useRef(ref ? ref.current : null);
  const idleCallbackRef = useRef();

  useEffect(() => {
    const linkElement = linkRef.current;

    const linkObserver = new IntersectionObserver(([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);

        if (window.requestIdleCallback) {
          idleCallbackRef.current = window.requestIdleCallback(() => {
            setShouldPrefetch(true);
          });
        } else {
          setShouldPrefetch(true);
        }
      }
    });

    if (!prerender && prefetch && to) {
      linkObserver.observe(linkElement);
    }

    return () => {
      if (idleCallbackRef.current) {
        cancelIdleCallback(idleCallbackRef.current);
      }
      linkObserver.disconnect();
    };
  }, [prefetch, to]);

  return (
    <Fragment>
      <Helmet>
        {shouldPrefetch && <link rel="prefetch" href={fullUrl} as="document" />}
      </Helmet>
      <Component ref={linkRef} to={to} {...props} />
    </Fragment>
  );
});

Link.defaultProps = {
  prefetch: true,
  component: RouterLink,
};

export const NavLink = forwardRef((props, ref) => <Link component={RouterNavLink} ref={ref} {...props} />);
