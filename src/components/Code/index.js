import React from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { generateThemeProperties } from 'app/theme';
import { media } from 'utils/style';

// Netrunner theme by Hamish Williams
const netrunnerTheme = {
  char: '#D8DEE9',
  comment: '#B2B2B2',
  keyword: '#c592ff',
  primitive: 'rgba(0,229,255,1)',
  string: '#00FF9C',
  variable: '#d7deea',
  boolean: '#ff8b50',
  punctuation: '#88C6BE',
  tag: '#FF4081',
  function: 'rgba(0,229,255,1)',
  className: '#fcee0a',
  method: 'rgba(0,229,255,1)',
  operator: '#FF4081',
  background: 'rgb(29, 29, 35)',
};

// Legible light theme by Hamish Williams
const lightCodeTheme = {
  char: 'rgba(0, 0, 0, 0.8)',
  comment: 'rgba(0, 0, 0, 0.6)',
  keyword: 'rgba(0, 0, 0, 0.8)',
  primitive: 'rgba(0, 0, 0, 0.8)',
  string: 'rgba(0, 0, 0, 0.8)',
  variable: 'rgba(0, 0, 0, 0.8)',
  boolean: 'rgba(0, 0, 0, 0.8)',
  punctuation: 'rgba(0, 0, 0, 0.4)',
  tag: 'rgba(0, 0, 0, 0.8)',
  function: 'rgba(0, 0, 0, 0.8)',
  className: 'rgba(0, 0, 0, 1)',
  method: 'rgba(0, 0, 0, 0.8)',
  operator: 'rgba(0, 0, 0, 0.4)',
  background: 'rgb(228, 228, 228)',
};

const codeThemes = {
  dark: netrunnerTheme,
  light: lightCodeTheme,
};

function Code(props) {
  const theme = useTheme();
  const codeTheme = codeThemes[theme.id];

  return (
    <CodeWrapper codeTheme={codeTheme}>
      <CodeContent codeTheme={codeTheme} {...props} />
    </CodeWrapper>
  );
};

const CodeWrapper = styled.pre`
  ${generateThemeProperties(lightCodeTheme)};

  @media (prefers-color-scheme: dark) {
    ${generateThemeProperties(netrunnerTheme)};
  }

  padding: 30px;
  margin: 60px -30px;
  background: var(--background);
  clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%);
  color: rgb(var(--rgbText));
  overflow-x: auto;

  @media (max-width: ${media.mobile}px) {
    padding: 20px;
    margin: 40px -20px;
  }
`;

const CodeContent = styled.pre`
  margin: 0;

  code,
  pre,
  pre.prism-code {
    height: auto;
    font-size: 16px;
    line-height: 1.4;
    white-space: pre;
    font-family: var(--monoFontStack);

    @media (max-width: ${media.mobile}px) {
      font-size: 14px;
    }
  }

  .token.attr-name {
    color: var(--keyword);
  }

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: var(--comment);
  }

  .token.property,
  .token.number,
  .token.function-name,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: var(--primitive);
  }

  .token.boolean {
    color: var(--boolean);
  }

  .token.tag {
    color: var(--tag);
  }

  .token.string {
    color: var(--string);
  }

  .token.punctuation {
    color: var(--punctuation);
  }

  .token.selector,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: var(--char);
  }

  .token.function {
    color: var(--function);
  }

  .token.operator,
  .token.entity,
  .token.url,
  .token.variable {
    color: var(--variable);
  }

  .token.attr-value {
    color: var(--string);
  }

  .token.keyword {
    color: var(--keyword);
  }

  .token.atrule,
  .token.class-name {
    color: var(--className);
  }

  .token.important {
    font-weight: var(--fontWeightRegular);
  }

  .token.bold {
    font-weight: var(--fontWeightBold),
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .namespace {
    opacity: 0.7;
  }
`;

export default Code;
