import './Link.css';

import { Link as RouterLink } from 'react-router-dom';
import { classes } from 'utils/style';

// File extensions that can be linked to
const VALID_EXT = ['txt', 'png', 'jpg'];

export const Link = ({
  rel,
  target,
  children,
  secondary,
  className,
  href,
  as,
  ...rest
}) => {
  const isValidExtension = VALID_EXT.includes(href?.split('.').pop());
  const isAnchor = href?.includes('://') || href?.[0] === '#' || isValidExtension;
  const relValue = rel || (isAnchor ? 'noreferrer noopener' : undefined);
  const targetValue = target || (isAnchor ? '_blank' : undefined);
  const Component = as || (isAnchor ? 'a' : RouterLink);

  return (
    <Component
      className={classes('link', className)}
      data-secondary={secondary}
      rel={relValue}
      href={isAnchor ? href : undefined}
      to={!isAnchor ? href : undefined}
      target={targetValue}
      {...rest}
    >
      {children}
    </Component>
  );
};
