import React from 'react';
import { useTheme } from 'styled-components/macro';
import './index.css';

const Code = props => {
  const { themeId } = useTheme();

  return (
    <pre className={`code code--${themeId}`}>
      <pre className="code__content" {...props} />
    </pre>
  );
};

export default Code;
