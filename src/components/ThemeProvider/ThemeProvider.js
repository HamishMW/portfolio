import GothamBold from 'assets/fonts/gotham-bold.woff2';
import GothamBook from 'assets/fonts/gotham-book.woff2';
import GothamMedium from 'assets/fonts/gotham-medium.woff2';
import Head from 'next/head';
import { Fragment, createContext, useEffect } from 'react';
import { classes, media } from 'utils/style';
import { theme, tokens } from './theme';
import useTheme from './useTheme';

export const fontStyles = `
  @font-face {
    font-family: "Gotham";
    font-weight: 400;
    src: url(${GothamBook}) format("woff");
    font-display: swap;
  }

  @font-face {
    font-family: "Gotham";
    font-weight: 500;
    src: url(${GothamMedium}) format("woff2");
    font-display: swap;
  }

  @font-face {
    font-family: 'Gotham';
    font-weight: 700;
    src: url(${GothamBold}) format('woff2');
    font-display: swap;
  }
`;

const ThemeContext = createContext({});

const ThemeProvider = ({
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

  // Save root theme id to localstorage and apply class to body
  useEffect(() => {
    if (isRootProvider) {
      window.localStorage.setItem('theme', JSON.stringify(themeId));
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(themeId);
    }
  }, [themeId, isRootProvider]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      {/* Add fonts and base tokens for the root provider */}
      {isRootProvider && (
        <Fragment>
          <Head>
            <link rel="prefetch" href={GothamMedium} as="font" crossOrigin="" />
            <link rel="prefetch" href={GothamBook} as="font" crossOrigin="" />
            <style>{fontStyles}</style>
            <style>{tokenStyles}</style>
          </Head>
          {children}
        </Fragment>
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
 * Transform theme token objects into CSS custom property strings
 */
function createThemeProperties(theme) {
  return Object.keys(theme)
    .filter(key => key !== 'themeId')
    .map(key => `--${key}: ${theme[key]};`)
    .join('\n');
}

/**
 * Transform theme tokens into a React CSSProperties object
 */
function createThemeStyleObject(theme) {
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
function createMediaTokenProperties() {
  return Object.keys(media)
    .map(key => {
      return `
        @media (max-width: ${media[key]}px) {
          :root {
            ${createThemeProperties(tokens[key])}
          }
        }
      `;
    })
    .join('\n');
}

export const tokenStyles = `
  :root {
    ${createThemeProperties(tokens.base)}
  }

  ${createMediaTokenProperties()}

  .dark,
  [data-theme='dark'] {
    ${createThemeProperties(theme.dark)}
  }

  .light,
  [data-theme='light'] {
    ${createThemeProperties(theme.light)}
  }
`;

export {
  theme,
  useTheme,
  ThemeContext,
  ThemeProvider,
  createThemeProperties,
  createThemeStyleObject,
  createMediaTokenProperties,
};
