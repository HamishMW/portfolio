import './Text.css';

import { classes } from 'utils/style';

export const Text = ({
  children,
  size = 'm',
  as: Component = 'p',
  align = 'auto',
  weight = 'auto',
  secondary,
  className,
  ...rest
}) => {
  return (
    <Component
      className={classes('text', className)}
      data-align={align}
      data-size={size}
      data-weight={weight}
      data-secondary={secondary}
      {...rest}
    >
      {children}
    </Component>
  );
};
