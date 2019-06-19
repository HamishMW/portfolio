import React, { Fragment } from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';

function CodeBlock(props) {
  return (
    <Fragment>
      <Helmet>
        <link href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" rel="stylesheet" />
      </Helmet>
      <CodeBlockElement>
        <CodeBlockContent {...props} />
      </CodeBlockElement>
    </Fragment>
  );
};

const prismColors = {
  char: '#D8DEE9',
  comment: '#B2B2B2',
  keyword: '#c5a5c5',
  primitive: '#5a9bcf',
  string: '#8dc891',
  variable: '#d7deea',
  boolean: '#ff8b50',
  punctuation: '#88C6BE',
  tag: '#fc929e',
  function: '#79b6f2',
  className: '#FAC863',
  method: '#6699CC',
  operator: '#fc929e',
  background: 'rgb(29, 29, 35)',
};

const CodeBlockElement = styled.pre`
  padding: 40px;
  margin: 60px -40px;
  background: ${prismColors.background};
  clip-path: ${props => props.theme.clipPath(24)};
  color: white;
`;

const CodeBlockContent = styled.code`
  &,
  pre,
  pre.prism-code {
    height: auto;
    font-size: 18px;
    line-height: 1.4;
    white-space: pre;
    word-break: break-word;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
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
