import classNames from 'classnames';
import Icon from 'components/Icon';
import { Button } from 'components/Button';
import './NavToggle.css';

const NavToggle = ({ menuOpen, ...rest }) => {
  const iconClass = classNames('nav-toggle__icon', {
    'nav-toggle__icon--open': menuOpen,
  });

  return (
    <Button
      iconOnly
      className="nav-toggle"
      aria-label="Menu"
      aria-expanded={menuOpen}
      {...rest}
    >
      <div className="nav-toggle__inner">
        <Icon
          className={classNames(iconClass, 'nav-toggle__icon--menu')}
          open={menuOpen}
          icon="menu"
        />
        <Icon
          className={classNames(iconClass, 'nav-toggle__icon--close')}
          open={menuOpen}
          icon="close"
        />
      </div>
    </Button>
  );
};

export default NavToggle;
