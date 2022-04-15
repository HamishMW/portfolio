import { forwardRef } from 'react';
import { classes } from 'utils/style';
import styles from './Section.module.css';

export const Section = forwardRef(
  ({ as: Component = 'div', children, className, ...rest }, ref) => (
    <Component className={classes(styles.section, className)} ref={ref} {...rest}>
      {children}
    </Component>
  )
);
