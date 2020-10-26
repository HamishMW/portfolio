import Link from 'components/Link';
import './index.css';

const Footer = () => (
  <footer className="footer">
    <span className="footer__date">
      {`© ${new Date().getFullYear()} Hamish Williams.`}
    </span>
    <Link className="footer__link" secondary href="/humans.txt">
      Crafted by yours truly
    </Link>
  </footer>
);

export default Footer;
