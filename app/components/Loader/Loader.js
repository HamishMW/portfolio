import { Text } from '~/components/Text';
import { useReducedMotion } from 'framer-motion';
import { classes, cssProps } from '~/utils/style';
import styles from './Loader.module.css';
import { forwardRef } from 'react';

export const Loader = forwardRef(
  ({ className, style, size = 32, text = 'Loading...', ...rest }, ref) => {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
      return (
        <Text className={classes(styles.text, className)} weight="medium" {...rest}>
          {text}
        </Text>
      );
    }

    const gapSize = Math.round((size / 3) * 0.2);
    const spanSize = Math.round(size / 3 - gapSize * 2 - 1);

    return (
      <div
        ref={ref}
        className={classes(styles.loader, className)}
        style={cssProps({ size, spanSize, gapSize }, style)}
        {...rest}
      >
        <div className={styles.content}>
          <div className={styles.span} />
          <div className={styles.span} />
          <div className={styles.span} />
        </div>
      </div>
    );
  }
);
