import React, { createContext, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import useTheme from './useTheme';
import { theme, tokens } from './theme';
import { media } from 'utils/style';
import GothamBook from 'assets/fonts/gotham-book.woff2';
import GothamMedium from 'assets/fonts/gotham-medium.woff2';

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
`;

const ThemeContext = createContext({});

const ThemeProvider = ({
  themeId = 'dark',
  theme: themeOverrides,
  children,
  className,
  as: Component = 'div',
}) => {
  const currentTheme = { ...theme[themeId], ...themeOverrides };
  const parentTheme = useTheme();
  const isRootProvider =
    Object.keys(parentTheme).length === 0 && parentTheme.constructor === Object;

  return (
    <ThemeContext.Provider value={currentTheme}>
      {/* Add fonts and base tokens for the root privider */}
      {isRootProvider && (
        <Fragment>
          <Helmet>
            <link rel="preload" href={GothamMedium} as="font" crossorigin="" />
            <link rel="preload" href={GothamBook} as="font" crossorigin="" />
            <style>{fontStyles}</style>
            <style>{tokenStyles}</style>
          </Helmet>
          {children}
        </Fragment>
      )}
      {/* Nested providers need a div to override theme tokens */}
      {!isRootProvider && (
        <Component
          className={classNames('theme-provider', className)}
          style={createThemeStyleObject(currentTheme)}
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

export const tokenStyles = `
  :root {
    ${createThemeProperties(tokens.base)}
  }

  @media (max-width: ${media.desktop}px) {
    :root {
      ${createThemeProperties(tokens.desktop)}
    }
  }

  @media (max-width: ${media.laptop}px) {
    :root {
      ${createThemeProperties(tokens.laptop)}
    }
  }

  @media (max-width: ${media.tablet}px) {
    :root {
      ${createThemeProperties(tokens.tablet)}
    }
  }

  @media (max-width: ${media.mobile}px) {
    :root {
      ${createThemeProperties(tokens.mobile)}
    }
  }

  @media (max-width: ${media.mobileS}px) {
    :root {
      ${createThemeProperties(tokens.mobileS)}
    }
  }

  .dark {
    ${createThemeProperties(theme.dark)}
  }

  .light {
    ${createThemeProperties(theme.light)}
  }
`;

export { theme, useTheme, ThemeContext, createThemeProperties, createThemeStyleObject };

export default ThemeProvider;
