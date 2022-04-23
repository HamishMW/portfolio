import { useIsPresent } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Custom scroll restoration to avoid jank during page transitions
export const ScrollRestore = () => {
  const isPresent = useIsPresent();
  const { asPath, beforePopState } = useRouter();

  useEffect(() => {
    // Opt out of native scroll restoration
    window.history.scrollRestoration = 'manual';
  }, []);

  // Prevent insta-scroll on browser back button
  useEffect(() => {
    beforePopState(state => {
      state.options.scroll = false;
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle scroll restoration
  useEffect(() => {
    if (!isPresent) return;
    const hash = asPath.split('#')[1];
    const targetElement = document.getElementById(hash);

    if (hash && targetElement) {
      // If there's a hash in the url and a matching element
      // id, scroll to and focus it
      window.scrollTo(0, targetElement.offsetTop);
      targetElement.focus({ preventScroll: true });
    } else {
      window.scrollTo(0, 0);
      document.body.focus({ preventScroll: true });
    }
  }, [asPath, isPresent]);
};
