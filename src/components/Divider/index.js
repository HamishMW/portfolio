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
}) => (
  <div
    className={classNames('divider', className)}
    style={{ width: lineWidth, height: lineHeight }}
  >
    <div
      className={classNames('divider__line', { 'divider__line--collapsed': collapsed })}
      style={{ transitionDelay: `${collapseDelay}ms` }}
    />
    <div
      className={classNames('divider__notch', { 'divider__notch--collapsed': collapsed })}
      style={{
        width: notchWidth,
        height: notchHeight,
        top: lineHeight,
        transitionDelay: `${collapseDelay + 160}ms`,
      }}
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
