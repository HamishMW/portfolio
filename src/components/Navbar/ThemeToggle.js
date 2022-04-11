import './ThemeToggle.css';

import { Button } from 'components/Button';
import { useAppContext, useId } from 'hooks';

export const ThemeToggle = ({ isMobile, ...rest }) => {
  const { dispatch, theme: themeId } = useAppContext();
  const isDark = themeId === 'dark';
  const id = useId();
  const maskId = `theme-toggle-mask-${id}`;

  const handleClick = () => {
    dispatch({ type: 'toggleTheme' });
  };

  return (
    <Button
      iconOnly
      className="theme-toggle"
      data-mobile={isMobile}
      aria-label="Toggle theme"
      onClick={handleClick}
      {...rest}
    >
      <svg
        aria-hidden
        className="theme-toggle__svg"
        width="38"
        height="38"
        viewBox="0 0 38 38"
      >
        <defs>
          <mask id={maskId}>
            <circle
              className="theme-toggle__circle"
              data-mask={true}
              data-dark={isDark}
              cx="19"
              cy="19"
              r="13"
            />
            <circle
              className="theme-toggle__mask"
              data-dark={isDark}
              cx="25"
              cy="14"
              r="9"
            />
          </mask>
        </defs>
        <path
          className="theme-toggle__path"
          data-dark={isDark}
          d="M19 3v7M19 35v-7M32.856 11l-6.062 3.5M5.144 27l6.062-3.5M5.144 11l6.062 3.5M32.856 27l-6.062-3.5"
        />
        <circle
          className="theme-toggle__circle"
          data-dark={isDark}
          mask={`url(#${maskId})`}
          cx="19"
          cy="19"
          r="12"
        />
      </svg>
    </Button>
  );
};
