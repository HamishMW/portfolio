import React, { Fragment, useState, useEffect, useRef, forwardRef } from 'react';
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  useLocation,
} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import prerender from 'utils/prerender';
import { useInViewport } from 'hooks';

// Wraps react router's link to prefetch visible page links
export const Link = forwardRef(({ to, prefetch, as: Component, ...props }, ref) => {
  const [shouldPrefetch, setShouldPrefetch] = useState(false);
  const toPathname = to.pathname || to;
  const fullUrl = `${window.location.origin}${toPathname}`;
  const linkRef = useRef(ref ? ref.current : null);
  const animationFrameRef = useRef();
  const location = useLocation();
  const prefetchable = prefetch || location.pathname !== toPathname;
  const shouldObserve = !prerender && prefetchable;
  const inViewport = useInViewport(shouldObserve ? linkRef : undefined, true);

  useEffect(() => {
    if (inViewport) {
      animationFrameRef.current = requestAnimationFrame(() => {
        setShouldPrefetch(true);
      });
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [inViewport]);

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
  as: RouterLink,
};

export const NavLink = forwardRef((props, ref) => (
  <Link as={RouterNavLink} ref={ref} {...props} />
));
