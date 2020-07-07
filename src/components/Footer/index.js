import React from 'react';
import Anchor from 'components/Anchor';
import './index.css';

const Footer = () => (
  <footer className="footer">
    <span className="footer__date">
      {`© ${new Date().getFullYear()} Hamish Williams.`}
    </span>
    <Anchor className="footer__link" secondary href="/humans.txt">
      Crafted by yours truly
    </Anchor>
  </footer>
);

export default Footer;
