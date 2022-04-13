// import './Link.css';

import RouterLink from 'next/link';
import { forwardRef } from 'react';
import { classes } from 'utils/style';

// File extensions that can be linked to
const VALID_EXT = ['txt', 'png', 'jpg'];

export const Link = forwardRef(({ href, ...rest }, ref) => {
  const isValidExtension = VALID_EXT.includes(href?.split('.').pop());
  const isAnchor = href?.includes('://') || href?.[0] === '#' || isValidExtension;

  if (isAnchor) {
    return <LinkContent {...rest} />;
  }

  return (
    <RouterLink passHref href={href} scroll={false}>
      <LinkContent href={href} {...rest} />
    </RouterLink>
  );
});

export const LinkContent = forwardRef(
  (
    { rel, target, children, secondary, className, href, as: Component = 'a', ...rest },
    ref
  ) => {
    const isValidExtension = VALID_EXT.includes(href?.split('.').pop());
    const isAnchor = href?.includes('://') || href?.[0] === '#' || isValidExtension;
    const relValue = rel || (isAnchor ? 'noreferrer noopener' : undefined);
    const targetValue = target || (isAnchor ? '_blank' : undefined);

    return (
      <Component
        className={classes('link', className)}
        data-secondary={secondary}
        rel={relValue}
        href={isAnchor ? href : undefined}
        target={targetValue}
        ref={ref}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);
