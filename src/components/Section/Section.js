import './Section.css';

import { forwardRef } from 'react';
import { classes } from 'utils/style';

export const Section = forwardRef(
  ({ as: Component = 'div', children, className, ...rest }, ref) => (
    <Component className={classes('section', className)} ref={ref} {...rest}>
      {children}
    </Component>
  )
);
