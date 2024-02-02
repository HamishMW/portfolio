import { classes } from '~/utils/style';
import styles from './Icon.module.css';
import { forwardRef } from 'react';

export const Icon = forwardRef(({ icon, className, size, ...rest }, ref) => {
  return (
    <svg
      aria-hidden
      ref={ref}
      className={classes(styles.icon, className)}
      width={size || 24}
      height={size || 24}
      {...rest}
    >
      <use href={`#${icon}`} />
    </svg>
  );
});
