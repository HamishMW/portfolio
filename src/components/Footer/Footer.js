import { Link } from 'components/Link';
import styles from './Footer.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <span className={styles.date}>
      {`© ${new Date().getFullYear()} Hamish Williams.`}
    </span>
    <Link secondary className={styles.link} href="/humans.txt" target="_self">
      Crafted by yours truly
    </Link>
  </footer>
);
