import { classes } from '~/utils/style';
import styles from './Icon.module.css';

export const Icon = ({ icon, className, size, ...rest }) => {
  return (
    <svg
      aria-hidden
      className={classes(styles.icon, className)}
      width={size || 24}
      height={size || 24}
      {...rest}
    >
      <use href={`#${icon}`} />
    </svg>
  );
};
