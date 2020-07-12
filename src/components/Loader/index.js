import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { usePrefersReducedMotion } from 'hooks';
import './index.css';

const Loader = ({ className, style, size = 32, text = 'Loading...', ...rest }) => {
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
      style={{
        '--size': `${size}px`,
        '--spanSize': `${spanSize}px`,
        '--gapSize': `${gapSize}px`,
        ...style,
      }}
      {...rest}
    >
      <div className="loader__content">
        <div className="loader__span" />
        <div className="loader__span" />
        <div className="loader__span" />
      </div>
      {renderScreenReaderTextPortal()}
    </div>
  );
};

export default Loader;
