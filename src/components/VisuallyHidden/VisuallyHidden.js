import './VisuallyHidden.css';

import { classes } from 'utils/style';

export const VisuallyHidden = ({
  className,
  showOnFocus,
  as: Component = 'span',
  children,
  visible,
  ...rest
}) => {
  return (
    <Component
      className={classes('visually-hidden', className)}
      data-hidden={!visible && !showOnFocus}
      data-show-on-focus={showOnFocus}
      {...rest}
    >
      {children}
    </Component>
  );
};
