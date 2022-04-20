import { useEffect } from 'react';

// Temporary fix to avoid flash of unstyled content (FOUC) during route transitions.
// Keep an eye on this issue and remove this code when resolved: https://github.com/vercel/next.js/issues/17464
export const useFoucFix = () => {
  useEffect(() => {
    // Gather all server-side rendered stylesheet entries.
    let ssrPageStyleSheetsEntries = Array.from(
      document.querySelectorAll('link[rel="stylesheet"][data-n-p]')
    ).map(element => ({
      element,
      href: element.getAttribute('href'),
    }));

    // Remove the `data-n-p` attribute to prevent Next.js from removing it early.
    ssrPageStyleSheetsEntries.forEach(({ element }) =>
      element.removeAttribute('data-n-p')
    );

    const fixedStyleHrefs = [];

    const mutationHandler = mutations => {
      // Gather all <style data-n-href="/..."> elements.
      const newStyleEntries = mutations
        .filter(
          ({ target }) =>
            target.nodeName === 'STYLE' && target.hasAttribute('data-n-href')
        )
        .map(({ target }) => ({
          element: target,
          href: target.getAttribute('data-n-href'),
        }));

      // Cycle through them and either:
      // - Remove the `data-n-href` attribute to prevent Next.js from removing it early.
      // - Remove the element if it's already present.
      newStyleEntries.forEach(({ element, href }) => {
        const styleExists = fixedStyleHrefs.includes(href);

        if (styleExists) {
          element.remove();
        } else {
          element.setAttribute('data-fouc-fix-n-href', href);
          element.removeAttribute('data-n-href');
          fixedStyleHrefs.push(href);
        }
      });

      // Cycle through the server-side rendered stylesheets and remove the ones that
      // are already present as inline <style> tags added by Next.js, so that we don't have duplicate styles.
      ssrPageStyleSheetsEntries = ssrPageStyleSheetsEntries.reduce((entries, entry) => {
        const { element, href } = entry;
        const styleExists = fixedStyleHrefs.includes(href);

        if (styleExists) {
          element.remove();
        } else {
          entries.push(entry);
        }

        return entries;
      }, []);
    };

    const observer = new MutationObserver(mutationHandler);

    observer.observe(document.head, {
      subtree: true,
      attributeFilter: ['media'],
    });

    return () => observer.disconnect();
  }, []);
};
