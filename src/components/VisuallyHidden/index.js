import React from 'react';
import classNames from 'classnames';
import './index.css';

const VisuallyHidden = ({
  className,
  as: Component = 'span',
  children,
  visible,
  ...rest
}) => {
  return (
    <Component
      className={classNames('visually-hidden', className, {
        'visually-hidden--hidden': !visible,
      })}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default VisuallyHidden;
