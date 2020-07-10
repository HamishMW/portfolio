import React from 'react';
import classNames from 'classnames';
import { blurOnMouseUp } from '/utils/focus';
import './index.css';

const Anchor = ({
  rel,
  target,
  children,
  secondary,
  className,
  as: Component = 'a',
  ...rest
}) => {
  const relValue = rel || target === '_blank' ? 'noreferrer noopener' : undefined;

  return (
    <Component
      className={classNames('anchor', className, { 'anchor--secondary': secondary })}
      rel={relValue}
      target={target}
      onMouseUp={blurOnMouseUp}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Anchor;
