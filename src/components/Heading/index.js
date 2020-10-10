import React from 'react';
import classNames from 'classnames';
import './index.css';

const Heading = ({
  children,
  level = 1,
  as,
  align = 'start',
  weight = 'medium',
  className,
  ...rest
}) => {
  const clampedLevel = Math.min(Math.max(level, 0), 4);
  const Component = as || `h${Math.max(clampedLevel, 1)}`;

  return (
    <Component
      className={classNames(
        className,
        'heading',
        `heading--align-${align}`,
        `heading--level-${clampedLevel}`,
        `heading--weight-${weight}`
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Heading;
