import './Section.css';

import classNames from 'classnames';
import { forwardRef } from 'react';

export const Section = forwardRef(
  ({ as: Component = 'div', children, className, ...rest }, ref) => (
    <Component className={classNames('section', className)} ref={ref} {...rest}>
      {children}
    </Component>
  )
);
