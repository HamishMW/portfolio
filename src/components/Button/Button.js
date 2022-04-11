import './Button.css';

import { Icon } from 'components/Icon';
import { Loader } from 'components/Loader';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { classes } from 'utils/style';

export const Button = forwardRef(
  (
    {
      className,
      as,
      secondary,
      loading,
      loadingText = 'loading',
      icon,
      iconEnd,
      iconHoverShift,
      iconOnly,
      children,
      rel,
      target,
      href,
      ...rest
    },
    ref
  ) => {
    const isExternalLink = href?.includes('://');
    const useLinkTag = isExternalLink || href?.[0] === '#';
    const linkComponent = useLinkTag ? 'a' : Link;
    const defaultComponent = href ? linkComponent : 'button';
    const Component = as || defaultComponent;

    return (
      <Component
        className={classes('button', className)}
        data-loading={loading}
        data-icon-only={iconOnly}
        data-secondary={secondary}
        href={href && isExternalLink ? href : undefined}
        to={href && !isExternalLink ? href : undefined}
        rel={rel || isExternalLink ? 'noopener noreferrer' : undefined}
        target={target || isExternalLink ? '_blank' : undefined}
        ref={ref}
        {...rest}
      >
        {!!icon && (
          <Icon
            className="button__icon"
            data-start={!iconOnly}
            data-shift={iconHoverShift}
            icon={icon}
          />
        )}
        {!!children && <span className="button__text">{children}</span>}
        {!!iconEnd && (
          <Icon
            className="button__icon"
            data-end={!iconOnly}
            data-shift={iconHoverShift}
            icon={iconEnd}
          />
        )}
        {loading && <Loader className="button__loader" size={32} text={loadingText} />}
      </Component>
    );
  }
);
