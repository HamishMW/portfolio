import { Link } from 'components/Link';
import { classes } from 'utils/style';
import styles from './Footer.module.css';

export const Footer = ({ className }) => (
  <footer className={classes(styles.footer, className)}>
    <span className={styles.date}>
      {`© ${new Date().getFullYear()} Hamish Williams.`}
    </span>
    <Link secondary className={styles.link} href="/humans.txt" target="_self">
      Crafted by yours truly
    </Link>
  </footer>
);
