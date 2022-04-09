import './Loader.css';

import classNames from 'classnames';
import { VisuallyHidden } from 'components/VisuallyHidden';
import { usePrefersReducedMotion } from 'hooks';
import { createPortal } from 'react-dom';
import { numToPx } from 'utils/style';

export const Loader = ({ className, style, size = 32, text = 'Loading...', ...rest }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const renderScreenReaderTextPortal = () =>
    createPortal(
      <VisuallyHidden className="loader-announcement" aria-live="assertive">
        {text}
      </VisuallyHidden>,
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
        '--size': numToPx(size),
        '--spanSize': numToPx(spanSize),
        '--gapSize': numToPx(gapSize),
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
