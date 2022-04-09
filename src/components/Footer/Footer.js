import './Footer.css';

import { Link } from 'components/Link';

export const Footer = () => (
  <footer className="footer">
    <span className="footer__date">
      {`© ${new Date().getFullYear()} Hamish Williams.`}
    </span>
    <Link secondary className="footer__link" href="/humans.txt" target="_self">
      Crafted by yours truly
    </Link>
  </footer>
);
