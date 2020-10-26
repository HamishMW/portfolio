import { useTheme } from 'components/ThemeProvider';
import './index.css';

const Code = props => {
  const theme = useTheme();

  return (
    <pre className={`code code--${theme.themeId}`}>
      <pre className="code__content" {...props} />
    </pre>
  );
};

export default Code;
