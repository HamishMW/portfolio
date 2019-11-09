import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';

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

// Generic legible light theme by Hamish Williams
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

function CodeBlock(props) {
  const theme = useContext(ThemeContext);
  const codeTheme = codeThemes[theme.id];

  return (
    <CodeBlockWrapper codeTheme={codeTheme}>
      <CodeBlockContent codeTheme={codeTheme} {...props} />
    </CodeBlockWrapper>
  );
};

const CodeBlockWrapper = styled.pre`
  padding: 30px;
  margin: 60px -30px;
  background: ${props => props.codeTheme.background};
  clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%);
  color: ${props => props.theme.colorText};
  overflow-x: auto;

  @media (max-width: ${props => props.theme.mobile}px) {
    padding: 20px;
    margin: 40px -20px;
  }
`;

const CodeBlockContent = styled.pre`
  margin: 0;

  code,
  pre,
  pre.prism-code {
    height: auto;
    font-size: 16px;
    line-height: 1.4;
    white-space: pre;
    font-family: ${props => props.theme.monoFontStack};

    @media (max-width: ${props => props.theme.mobile}px) {
      font-size: 14px;
    }
  }

  .token.attr-name {
    color: ${props => props.codeTheme.keyword};
  }

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${props => props.codeTheme.comment};
  }

  .token.property,
  .token.number,
  .token.function-name,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: ${props => props.codeTheme.primitive};
  }

  .token.boolean {
    color: ${props => props.codeTheme.boolean};
  }

  .token.tag {
    color: ${props => props.codeTheme.tag};
  }

  .token.string {
    color: ${props => props.codeTheme.string};
  }

  .token.punctuation {
    color: ${props => props.codeTheme.punctuation};
  }

  .token.selector,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: ${props => props.codeTheme.char};
  }

  .token.function {
    color: ${props => props.codeTheme.function};
  }

  .token.operator,
  .token.entity,
  .token.url,
  .token.variable {
    color: ${props => props.codeTheme.variable};
  }

  .token.attr-value {
    color: ${props => props.codeTheme.string};
  }

  .token.keyword {
    color: ${props => props.codeTheme.keyword};
  }

  .token.atrule,
  .token.class-name {
    color: ${props => props.codeTheme.className};
  }

  .token.important {
    font-weight: 400;
  }

  .token.bold {
    font-weight: 700,
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

export default CodeBlock;
