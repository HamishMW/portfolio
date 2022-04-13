// import './VisuallyHidden.css';

import { forwardRef } from 'react';
import { classes } from 'utils/style';

export const VisuallyHidden = forwardRef(
  (
    { className, showOnFocus, as: Component = 'span', children, visible, ...rest },
    ref
  ) => {
    return (
      <Component
        className={classes('visually-hidden', className)}
        data-hidden={!visible && !showOnFocus}
        data-show-on-focus={showOnFocus}
        ref={ref}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);
