import React from 'react';
import styled from 'styled-components/macro';
import { media } from '../utils/styleUtils';

function CodeBlock(props) {
  return (
    <CodeBlockElement>
      <CodeBlockContent {...props} />
    </CodeBlockElement>
  );
};

const prismColors = {
  char: '#D8DEE9',
  comment: '#B2B2B2',
  keyword: '#c592ff',
  primitive: '#5a9bcf',
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

const CodeBlockElement = styled.pre`
  padding: 30px;
  margin: 60px -30px;
  background: ${prismColors.background};
  clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%);
  color: white;
  overflow-x: auto;

  @media (max-width: ${media.mobile}) {
    padding: 20px;
    margin: 40px -20px;
  }
`;

const CodeBlockContent = styled.code`
  &,
  pre,
  pre.prism-code {
    height: auto;
    font-size: 16px;
    line-height: 1.4;
    white-space: pre;
    font-family: SFMono-Regular, Roboto Mono, Consolas, Liberation Mono, Menlo, Courier, monospace;

    @media (max-width: ${media.mobile}) {
      font-size: 14px;
    }
  }

  .token.attr-name {
    color: ${prismColors.keyword};
  }

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${prismColors.comment};
  }

  .token.property,
  .token.number,
  .token.function-name,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: ${prismColors.primitive};
  }

  .token.boolean {
    color: ${prismColors.boolean};
  }

  .token.tag {
    color: ${prismColors.tag};
  }

  .token.string {
    color: ${prismColors.string};
  }

  .token.punctuation {
    color: ${prismColors.punctuation};
  }

  .token.selector,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: ${prismColors.char};
  }

  .token.function {
    color: ${prismColors.function};
  }

  .token.operator,
  .token.entity,
  .token.url,
  .token.variable {
    color: ${prismColors.variable};
  }

  .token.attr-value {
    color: ${prismColors.string};
  }

  .token.keyword {
    color: ${prismColors.keyword};
  }

  .token.atrule,
  .token.class-name {
    color: ${prismColors.className};
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
