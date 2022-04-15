import { Button } from 'components/Button';
import { useAppContext } from 'hooks';
import { useId } from 'react';
import styles from './ThemeToggle.module.css';

export const ThemeToggle = ({ isMobile, ...rest }) => {
  const { dispatch } = useAppContext();
  const id = useId();
  const maskId = `${id}theme-toggle-mask`;

  const handleClick = () => {
    dispatch({ type: 'toggleTheme' });
  };

  return (
    <Button
      iconOnly
      className={styles.toggle}
      data-mobile={isMobile}
      aria-label="Toggle theme"
      onClick={handleClick}
      {...rest}
    >
      <svg aria-hidden className={styles.svg} width="38" height="38" viewBox="0 0 38 38">
        <defs>
          <mask id={maskId}>
            <circle className={styles.circle} data-mask={true} cx="19" cy="19" r="13" />
            <circle className={styles.mask} cx="25" cy="14" r="9" />
          </mask>
        </defs>
        <path
          className={styles.path}
          d="M19 3v7M19 35v-7M32.856 11l-6.062 3.5M5.144 27l6.062-3.5M5.144 11l6.062 3.5M32.856 27l-6.062-3.5"
        />
        <circle
          className={styles.circle}
          mask={`url(#${maskId})`}
          cx="19"
          cy="19"
          r="12"
        />
      </svg>
    </Button>
  );
};
