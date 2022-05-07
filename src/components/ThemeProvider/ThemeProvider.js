import GothamBoldItalic from 'assets/fonts/gotham-bold-italic.woff2';
import GothamBold from 'assets/fonts/gotham-bold.woff2';
import GothamBookItalic from 'assets/fonts/gotham-book-italic.woff2';
import GothamBook from 'assets/fonts/gotham-book.woff2';
import GothamMediumItalic from 'assets/fonts/gotham-medium-italic.woff2';
import GothamMedium from 'assets/fonts/gotham-medium.woff2';
import { useHasMounted } from 'hooks';
import Head from 'next/head';
import { createContext, useEffect } from 'react';
import { classes, media } from 'utils/style';
import { theme, tokens } from './theme';
import { useTheme } from './useTheme';

export const ThemeContext = createContext({});

export const ThemeProvider = ({
  themeId = 'dark',
  theme: themeOverrides,
  children,
  className,
  as: Component = 'div',
  ...rest
}) => {
  const currentTheme = { ...theme[themeId], ...themeOverrides };
  const parentTheme = useTheme();
  const isRootProvider = !parentTheme.themeId;
  const hasMounted = useHasMounted();

  // Save root theme id to localstorage and apply class to body
  useEffect(() => {
    if (isRootProvider && hasMounted) {
      window.localStorage.setItem('theme', JSON.stringify(themeId));
      document.body.dataset.theme = themeId;
    }
  }, [themeId, isRootProvider, hasMounted]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      {isRootProvider && (
        <>
          <Head>
            <meta name="theme-color" content={`rgb(${currentTheme.rgbBackground})`} />
          </Head>
          {children}
        </>
      )}
      {/* Nested providers need a div to override theme tokens */}
      {!isRootProvider && (
        <Component
          className={classes('theme-provider', className)}
          data-theme={themeId}
          {...rest}
        >
          {children}
        </Component>
      )}
    </ThemeContext.Provider>
  );
};

/**
 * Squeeze out spaces and newlines
 */
export function squish(styles) {
  return styles.replace(/\s\s+/g, ' ');
}

/**
 * Transform theme token objects into CSS custom property strings
 */
export function createThemeProperties(theme) {
  return squish(
    Object.keys(theme)
      .filter(key => key !== 'themeId')
      .map(key => `--${key}: ${theme[key]};`)
      .join('\n\n')
  );
}

/**
 * Transform theme tokens into a React CSSProperties object
 */
export function createThemeStyleObject(theme) {
  let style = {};

  for (const key of Object.keys(theme)) {
    if (key !== 'themeId') {
      style[`--${key}`] = theme[key];
    }
  }

  return style;
}

/**
 * Generate media queries for tokens
 */
export function createMediaTokenProperties() {
  return squish(
    Object.keys(media)
      .map(key => {
        return `
        @media (max-width: ${media[key]}px) {
          :root {
            ${createThemeProperties(tokens[key])}
          }
        }
      `;
      })
      .join('\n')
  );
}

export const tokenStyles = squish(`
  :root {
    ${createThemeProperties(tokens.base)}
  }

  ${createMediaTokenProperties()}

  [data-theme='dark'] {
    ${createThemeProperties(theme.dark)}
  }

  [data-theme='light'] {
    ${createThemeProperties(theme.light)}
  }
`);

export const fontStyles = squish(`
  @font-face {
    font-family: Gotham;
    font-weight: 400;
    src: url(${GothamBook}) format('woff2');
    font-display: block;
    font-style: normal;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 400;
    src: url(${GothamBookItalic}) format('woff2');
    font-display: block;
    font-style: italic;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 500;
    src: url(${GothamMedium}) format('woff2');
    font-display: block;
    font-style: normal;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 500;
    src: url(${GothamMediumItalic}) format('woff2');
    font-display: block;
    font-style: italic;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 700;
    src: url(${GothamBold}) format('woff2');
    font-display: block;
    font-style: normal;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 700;
    src: url(${GothamBoldItalic}) format('woff2');
    font-display: block;
    font-style: italic;
  }
`);
