import { VisuallyHidden } from 'components/VisuallyHidden';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { classes, cssProps } from 'utils/style';
import styles from './Loader.module.css';

export const Loader = ({ className, style, size = 32, text = 'Loading...', ...rest }) => {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderScreenReaderTextPortal = () => {
    if (!mounted) return;

    return createPortal(
      <VisuallyHidden className="loader-announcement" aria-live="assertive">
        {text}
      </VisuallyHidden>,
      document.getElementById('portal-root')
    );
  };

  if (reduceMotion) {
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
      className={classes(styles.loader, className)}
      style={cssProps({ size, spanSize, gapSize }, style)}
      {...rest}
    >
      <div className={styles.content}>
        <div className={styles.span} />
        <div className={styles.span} />
        <div className={styles.span} />
      </div>
      {renderScreenReaderTextPortal()}
    </div>
  );
};
