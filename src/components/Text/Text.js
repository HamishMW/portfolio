import './Text.css';

import classNames from 'classnames';

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
      className={classNames(
        className,
        'text',
        `text--align-${align}`,
        `text--size-${size}`,
        `text--weight-${weight}`,
        {
          'text--secondary': secondary,
        }
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
