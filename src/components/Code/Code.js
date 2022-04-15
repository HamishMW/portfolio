import { useTheme } from 'components/ThemeProvider';
import styles from './Code.module.css';

export const Code = props => {
  const theme = useTheme();

  return (
    <pre className={styles.code} data-theme={theme.themeId}>
      <pre {...props} />
    </pre>
  );
};
