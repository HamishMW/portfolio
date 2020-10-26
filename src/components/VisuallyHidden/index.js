import classNames from 'classnames';
import './index.css';

const VisuallyHidden = ({
  className,
  showOnFocus,
  as: Component = 'span',
  children,
  visible,
  ...rest
}) => {
  return (
    <Component
      className={classNames('visually-hidden', className, {
        'visually-hidden--hidden': !visible && !showOnFocus,
        'visually-hidden--show-on-focus': showOnFocus,
      })}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default VisuallyHidden;
