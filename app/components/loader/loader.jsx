import { Text } from '~/components/text';
import { useReducedMotion } from 'framer-motion';
import { classes, cssProps } from '~/utils/style';
import { forwardRef } from 'react';
import styles from './loader.module.css';

export const Loader = forwardRef(
  (
    { className, style, width = 32, height = 4, text = 'Loading...', center, ...rest },
    ref
  ) => {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
      return (
        <Text className={classes(styles.text, className)} weight="medium" {...rest}>
          {text}
        </Text>
      );
    }

    return (
      <div
        ref={ref}
        className={classes(styles.loader, className)}
        data-center={center}
        style={cssProps({ width, height }, style)}
        {...rest}
      >
        <div className={styles.span} />
      </div>
    );
  }
);
