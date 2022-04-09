import './Code.css';

import { useTheme } from 'components/ThemeProvider';

export const Code = props => {
  const theme = useTheme();

  return (
    <pre className={`code code--${theme.themeId}`}>
      <pre className="code__content" {...props} />
    </pre>
  );
};
