import { forwardRef } from 'react';
import classNames from 'classnames';
import './index.css';

const Section = forwardRef(
  ({ as: Component = 'div', children, className, ...rest }, ref) => (
    <Component className={classNames('section', className)} ref={ref} {...rest}>
      {children}
    </Component>
  )
);

export default Section;
