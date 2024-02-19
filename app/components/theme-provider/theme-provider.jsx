import GothamBoldItalic from '~/assets/fonts/gotham-bold-italic.woff2';
import GothamBold from '~/assets/fonts/gotham-bold.woff2';
import GothamBookItalic from '~/assets/fonts/gotham-book-italic.woff2';
import GothamBook from '~/assets/fonts/gotham-book.woff2';
import GothamMediumItalic from '~/assets/fonts/gotham-medium-italic.woff2';
import GothamMedium from '~/assets/fonts/gotham-medium.woff2';
import IPAGothic from '~/assets/fonts/ipa-gothic.woff2';
import { createContext, useContext } from 'react';
import { classes, media } from '~/utils/style';
import { themes, tokens } from './theme';

export const ThemeContext = createContext({});

export const ThemeProvider = ({
  theme = 'dark',
  children,
  className,
  as: Component = 'div',
  toggleTheme,
  ...rest
}) => {
  const parentTheme = useTheme();
  const isRootProvider = !parentTheme.theme;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: toggleTheme || parentTheme.toggleTheme,
      }}
    >
      {isRootProvider && children}
      {/* Nested providers need a div to override theme tokens */}
      {!isRootProvider && (
        <Component className={classes(className)} data-theme={theme} {...rest}>
          {children}
        </Component>
      )}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const currentTheme = useContext(ThemeContext);
  return currentTheme;
}

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
    style[`--${key}`] = theme[key];
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

const layerStyles = squish(`
  @layer theme, base, components, layout;
`);

const tokenStyles = squish(`
  :root {
    ${createThemeProperties(tokens.base)}
  }

  ${createMediaTokenProperties()}

  [data-theme='dark'] {
    ${createThemeProperties(themes.dark)}
  }

  [data-theme='light'] {
    ${createThemeProperties(themes.light)}
  }
`);

const fontStyles = squish(`
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

  @font-face {
    font-family: IPA Gothic;
    font-weight: 400;
    src: url(${IPAGothic}) format('woff2');
    font-display: swap;
    font-style: normal;
  }
`);

export const themeStyles = squish(`
  ${layerStyles}

  @layer theme {
    ${tokenStyles}
    ${fontStyles}
  }
`);
