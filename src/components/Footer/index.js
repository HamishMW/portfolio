import React from 'react';
import styled from 'styled-components/macro';
import Anchor from 'components/Anchor';
import { sectionPadding } from 'utils/style';

const Footer = () => (
  <FooterContainer role="contentinfo">
    <FooterDate>{`© ${new Date().getFullYear()}`} Hamish Williams.</FooterDate>
    <Anchor secondary href="/humans.txt">
      Crafted by yours truly
    </Anchor>
  </FooterContainer>
);

const FooterContainer = styled.footer`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  width: 100vw;
  padding: var(--space3XL) var(--spaceL);
  z-index: 16;
  position: relative;
  font-size: var(--fontSizeBodyS);
  color: var(--colorTextLight);
  ${sectionPadding}

  ${Anchor} {
    display: inline-flex;
  }
`;

const FooterDate = styled.span`
  padding-right: var(--spaceXS);
  display: inline-flex;
`;

export default Footer;
