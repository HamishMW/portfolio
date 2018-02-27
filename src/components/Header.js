import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import Monogram from './Monogram';
import Icon from '../utils/Icon';
import { Media } from '../utils/StyleUtils';

const Header = ({menuOpen, toggleMenu}) => (
  <HeaderWrapper>
    <Transition
      in={menuOpen}
      timeout={{enter: 5, exit: 400}}
      mountOnEnter
      unmountOnExit
    >
      {(status) => (
        <HeaderMobileNav status={status}>
          <HeaderMobileNavLink
            delay={250}
            status={status}
            onClick={toggleMenu}
            to="/"
          >
            Intro
          </HeaderMobileNavLink>
          <HeaderMobileNavLink
            delay={300}
            status={status}
            onClick={toggleMenu}
            to="/"
          >
            Projects
          </HeaderMobileNavLink>
          <HeaderMobileNavLink
            delay={350}
            status={status}
            onClick={toggleMenu}
            to="/"
          >
            Details
          </HeaderMobileNavLink>
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
        </HeaderMobileNav>
      )}
    </Transition>
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
  position: fixed;
  padding: 0;
  width: 45px;
  z-index: 1024;
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
  position: relative;
  padding: 10px;
  padding-bottom: 0;
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
  padding: 20px;
  color: ${props => props.theme.colorText(0.8)};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease 0.1s;

  &:hover,
  &:active,
  &:focus {
    color: ${props => props.theme.colorText(1)};
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    left: 10px;
    height: 4px;
    background: ${props => props.theme.colorPrimary(1)};
    transform: scaleX(0) translateY(-2px);
    transition: transform 0.4s ${props => props.theme.curveFastoutSlowin};
    transform-origin: right;
  }

  &:hover:after,
  &:active:after,
  &:focus:after {
    transform: scaleX(1) translateY(-2px);
    transform-origin: left;
  }
`;

const HeaderNavIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: ${Media.mobile}) {
    flex-direction: row;
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const HeaderNavIconLink = styled.a`
  display: flex;
  padding: 10px;
`;

const HeaderNavIcon = styled(Icon)`
  fill: ${props => props.theme.colorText(0.6)};
  transition: all 0.4s ease;

  ${HeaderNavIconLink}:hover & {
    fill: ${props => props.theme.colorPrimary(1)};
  }
`;

const HeaderMobileNav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${props => props.theme.colorBackground(0.9)};
  transform: translate3d(100%, 0, 0);
  transition: transform 0.4s ${props => props.theme.curveFastoutSlowin};
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${props => props.status === 'entered' &&`
    transform: translate3d(0, 0, 0);
  `}

  @media (max-width: ${Media.mobile}) {
    display: flex;
  }
`;

const HeaderMobileNavLink = styled(NavLink).attrs({
	active: 'active',
})`
  width: 100%;
  font-size: 24px;
  text-align: center;
  text-decoration: none;
  color: ${props => props.theme.colorText(1)};
  padding: 20px;
  transform: translate3d(0, -30px, 0);
  opacity: 0;
  transition: all 0.3s ${props => props.theme.curveFastoutSlowin};
  transition-delay: ${props => props.delay}ms;
  position: relative;
  top: -15px;

  ${props => props.status === 'entered' &&`
    opacity: 1;
    transform: translate3d(0, 0, 0);
  `}

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 60px;
    left: 60px;
    height: 4px;
    background: ${props => props.theme.colorPrimary(1)};
    transform: scaleX(0) translateY(-2px);
    transition: transform 0.4s ${props => props.theme.curveFastoutSlowin};
    transform-origin: right;
  }

  &:hover:after,
  &:active:after,
  &:focus:after {
    transform: scaleX(1) translateY(-2px);
    transform-origin: left;
  }
`;

export default Header;
