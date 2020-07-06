import React from 'react';
import classNames from 'classnames';
import Loader from 'components/Loader';
import Icon from 'components/Icon';
import { blurOnMouseUp } from 'utils/focus';
import './index.css';

export const Button = ({
  className,
  as: Component = 'button',
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
}) => {
  return (
    <Component
      className={classNames('button', className, {
        'button--loading': loading,
        'button--icon-only': iconOnly,
        'button--secondary': secondary,
      })}
      href={href}
      rel={rel || target === '_blank' ? 'noopener noreferrer' : null}
      target={target}
      onMouseUp={blurOnMouseUp}
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
};
