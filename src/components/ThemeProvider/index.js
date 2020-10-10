import React, { createContext, Fragment } from 'react';
import useTheme from './useTheme';
import { theme, tokens } from './theme';
import { media } from 'utils/style';

const ThemeContext = createContext({});

const ThemeProvider = ({
  themeId = 'dark',
  theme: themeOverrides,
  children,
  className,
}) => {
  const currentTheme = { ...theme[themeId], ...themeOverrides };
  const parentTheme = useTheme();
  const isRootProvider =
    Object.keys(parentTheme).length === 0 && parentTheme.constructor === Object;

  return (
    <ThemeContext.Provider value={currentTheme}>
      {!isRootProvider && (
        <div className={className} style={createThemeStyleObject(currentTheme)}>
          {children}
        </div>
      )}
      {isRootProvider && (
        <Fragment>
          <style>{tokenStyles}</style>
          {children}
        </Fragment>
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
