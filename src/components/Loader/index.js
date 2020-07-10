import React from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { usePrefersReducedMotion } from '/hooks';
import './index.css';

const Loader = ({ className, size = 32, text = 'Loading...', style, ...rest }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const renderScreenReaderTextPortal = () =>
    ReactDOM.createPortal(
      <div className="loader-announcement" aria-live="assertive">
        {text}
      </div>,
      document.body
    );

  if (prefersReducedMotion) {
    return (
      <div className="loader-text" {...rest}>
        {text}
        {renderScreenReaderTextPortal()}
      </div>
    );
  }

  const gapSize = Math.round((size / 3) * 0.2);
  const spanSize = Math.round(size / 3 - gapSize * 2 - 1);

  return (
    <div
      className={classNames('loader', className)}
      aria-label={text}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      <div
        className="loader__content"
        style={{
          gridTemplateColumns: `repeat(3, ${spanSize}px)`,
          gridGap: gapSize,
        }}
      >
        <div className="loader__span" />
        <div className="loader__span" />
        <div className="loader__span" />
      </div>
      {renderScreenReaderTextPortal()}
    </div>
  );
};

export default Loader;
