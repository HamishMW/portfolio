import React from 'react';
import { useAppContext } from 'hooks';
import './index.css';

const Code = props => {
  const { theme } = useAppContext();

  return (
    <pre className={`code code--${theme.themeId}`}>
      <pre className="code__content" {...props} />
    </pre>
  );
};

export default Code;
