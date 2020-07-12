import React from 'react';
import classNames from 'classnames';
import './index.css';

const Divider = ({
  lineWidth,
  lineHeight,
  notchWidth,
  notchHeight,
  collapseDelay,
  collapsed,
  className,
  style,
}) => (
  <div
    className={classNames('divider', className)}
    style={{
      '--lineWidth': lineWidth,
      '--lineHeight': lineHeight,
      '--notchWidth': notchWidth,
      '--notchHeight': notchHeight,
      '--collapseDelay': `${collapseDelay}ms`,
      ...style,
    }}
  >
    <div
      className={classNames('divider__line', { 'divider__line--collapsed': collapsed })}
    />
    <div
      className={classNames('divider__notch', { 'divider__notch--collapsed': collapsed })}
      style={{ '--collapseDelay': `${collapseDelay + 160}ms` }}
    />
  </div>
);

Divider.defaultProps = {
  lineWidth: '100%',
  lineHeight: '2px',
  notchWidth: '90px',
  notchHeight: '10px',
  collapsed: false,
  collapseDelay: 0,
};

export default Divider;
