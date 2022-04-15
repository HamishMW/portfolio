import { Button } from 'components/Button';
import { Icon } from 'components/Icon';
import styles from './NavToggle.module.css';

export const NavToggle = ({ menuOpen, ...rest }) => {
  return (
    <Button
      iconOnly
      className={styles.toggle}
      aria-label="Menu"
      aria-expanded={menuOpen}
      {...rest}
    >
      <div className={styles.inner}>
        <Icon className={styles.icon} data-menu={true} data-open={menuOpen} icon="menu" />
        <Icon
          className={styles.icon}
          data-close={true}
          data-open={menuOpen}
          icon="close"
        />
      </div>
    </Button>
  );
};
