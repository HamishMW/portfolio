import { classes } from '~/utils/style';
import styles from './list.module.css';

export const List = ({ ordered, children, className, ...rest }) => {
  const Element = ordered ? 'ol' : 'ul';

  return (
    <Element className={classes(styles.list, className)} {...rest}>
      {children}
    </Element>
  );
};

export const ListItem = ({ children, ...rest }) => {
  return (
    <li className={styles.item} {...rest}>
      {children}
    </li>
  );
};
