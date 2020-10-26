import { forwardRef } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Loader from 'components/Loader';
import Icon from 'components/Icon';
import { blurOnMouseUp } from 'utils/focus';
import './index.css';

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
        className={classNames('button', className, {
          'button--loading': loading,
          'button--icon-only': iconOnly,
          'button--secondary': secondary,
        })}
        href={href && isExternalLink ? href : undefined}
        to={href && !isExternalLink ? href : undefined}
        rel={rel || isExternalLink ? 'noopener noreferrer' : undefined}
        target={target || isExternalLink ? '_blank' : undefined}
        onMouseUp={blurOnMouseUp}
        ref={ref}
        {...rest}
      >
        {!!icon && (
          <Icon
            className={classNames('button__icon', {
              'button__icon--start': !iconOnly,
              'button__icon--shift': iconHoverShift,
            })}
            icon={icon}
          />
        )}
        {!!children && <span className="button__text">{children}</span>}
        {!!iconEnd && (
          <Icon
            className={classNames('button__icon', {
              'button__icon--end': !iconOnly,
              'button__icon--shift': iconHoverShift,
            })}
            icon={iconEnd}
          />
        )}
        {loading && <Loader className="button__loader" size={32} text={loadingText} />}
      </Component>
    );
  }
);
