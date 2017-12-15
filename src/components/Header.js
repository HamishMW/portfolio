import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import Monogram from './Monogram';
import Icon from '../utils/Icon';
import { Media } from '../utils/StyleUtils';

const Header = () => (
  <HeaderWrapper>
    <HeaderLogo to="/"><Monogram /></HeaderLogo>
    <HeaderNav>
      <HeaderNavList>
        <HeaderNavLink to="/">Projects</HeaderNavLink>
        <HeaderNavLink to="/">Details</HeaderNavLink>
      </HeaderNavList>
      <HeaderNavIcons>
        <HeaderNavIconLink href="https://twitter.com/hamishMW">
          <HeaderNavIcon icon="twitter" />
        </HeaderNavIconLink>
        <HeaderNavIconLink href="https://dribbble.com/hamishw">
          <HeaderNavIcon icon="dribbble" />
        </HeaderNavIconLink>
        <HeaderNavIconLink href="mailto:hello@hamishw.com">
          <HeaderNavIcon icon="email" />
        </HeaderNavIconLink>
      </HeaderNavIcons>
    </HeaderNav>
  </HeaderWrapper>
);

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  padding: 10px 0;
  width: 45px;
  top: ${props => props.theme.spacingOuter.desktop};
  left: ${props => props.theme.spacingOuter.desktop};
  bottom: ${props => props.theme.spacingOuter.desktop};

  @media (max-width: ${Media.tablet}) {
    top: ${props => props.theme.spacingOuter.tablet};
    left: ${props => props.theme.spacingOuter.tablet};
    bottom: ${props => props.theme.spacingOuter.tablet};
  }

  @media (max-width: ${Media.mobile}) {
    top: ${props => props.theme.spacingOuter.mobile};
    left: ${props => props.theme.spacingOuter.mobile};
    bottom: ${props => props.theme.spacingOuter.mobile};
  }
`;

const HeaderLogo = styled(Link)`
  display: flex;
`;

const HeaderNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 auto;

  @media (max-width: ${Media.mobile}) {
    display: none;
  }
`;

const HeaderNavList = styled.div`
  transform: rotate(-90deg) translateX(-50%);
  display: flex;
  flex-direction: row-reverse;
`;

const HeaderNavLink = styled(NavLink)`
  margin-right: 40px;
  color: ${props => props.theme.colorText(0.8)};
  text-decoration: none;
  font-weight: 500;

  &:hover,
  &:active,
  &:focus {
    color: ${props => props.theme.colorText(1)};
  }
`;

const HeaderNavIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderNavIconLink = styled.a`
  display: flex;
  margin-top: 20px;

  &:hover svg {
    fill: ${props => props.theme.colorText(1)};
  }
`;

const HeaderNavIcon = styled(Icon)`
  fill: ${props => props.theme.colorText(0.6)};
`;

export default Header;
