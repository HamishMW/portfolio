import { classes } from '~/utils/style';
import styles from './Icon.module.css';
import manifest from './manifest.json';

export const Icon = ({ icon, className, size, ...rest }) => {
  const id = Object.keys(manifest).find(key => key === icon);

  if (!id) {
    throw new Error(`The icon '${icon}' doesn't seem to exist`);
  }

  const { width, height } = manifest[id];

  return (
    <svg
      aria-hidden
      className={classes(styles.icon, className)}
      width={size || width}
      height={size || height}
      {...rest}
    >
      <use href={`#${id}`} />
    </svg>
  );
};
