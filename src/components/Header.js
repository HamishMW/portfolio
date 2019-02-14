import React from 'react';
import styled, { withTheme, css } from 'styled-components/macro';
import { NavLink, Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import Monogram from './Monogram';
import Icon from '../utils/Icon';
import { Media } from '../utils/StyleUtils';

const HeaderIcons = ({ toggleMenu }) => (
  <HeaderNavIcons>
    <HeaderNavIconLink
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      href="https://twitter.com/hamishMW"
    >
      <HeaderNavIcon icon="twitter" />
    </HeaderNavIconLink>
    <HeaderNavIconLink
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Dribbble"
      href="https://dribbble.com/hamishw"
    >
      <HeaderNavIcon icon="dribbble" />
    </HeaderNavIconLink>
    <HeaderNavIconLink
      as={Link}
      aria-label="Contact"
      to="/contact"
      onClick={!!toggleMenu ? () => toggleMenu() : null}
    >
      <HeaderNavIcon icon="email" />
    </HeaderNavIconLink>
  </HeaderNavIcons>
);

function Header(props) {
  const { menuOpen, toggleMenu, theme } = props;

  return (
    <HeaderWrapper role="banner">
      <Transition
        in={menuOpen}
        timeout={{ enter: 5, exit: 500 }}
        mountOnEnter
        unmountOnExit
      >
        {status => (
          <HeaderMobileNav status={status}>
            <HeaderMobileNavLink
              delay={250}
              status={status}
              onClick={toggleMenu}
              to="/#intro"
            >
              Intro
          </HeaderMobileNavLink>
            <HeaderMobileNavLink
              delay={300}
              status={status}
              onClick={toggleMenu}
              to="/#projects"
            >
              Projects
          </HeaderMobileNavLink>
            <HeaderMobileNavLink
              delay={350}
              status={status}
              onClick={toggleMenu}
              to="/#details"
            >
              Details
          </HeaderMobileNavLink>
            <HeaderIcons toggleMenu={toggleMenu} />
          </HeaderMobileNav>
        )}
      </Transition>
      <HeaderLogo to="/#intro" aria-label="Back to home">
        <Monogram highlight={theme.colorPrimary(1)} />
      </HeaderLogo>
      <HeaderNav role="navigation">
        <HeaderNavList>
          <HeaderNavLink to="/#projects">Projects</HeaderNavLink>
          <HeaderNavLink to="/#details">Details</HeaderNavLink>
        </HeaderNavList>
        <HeaderIcons />
      </HeaderNav>
    </HeaderWrapper>
  );
};

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

  @media (max-width: ${Media.mobile}), (max-height: ${Media.mobile}) {
    top: ${props => props.theme.spacingOuter.mobile};
    left: ${props => props.theme.spacingOuter.mobile};
    bottom: auto;
  }
`;

const HeaderLogo = styled(Link)`
  display: flex;
  position: relative;
  padding: 10px;

  g rect {
    opacity: 0;
    transform: scale3d(1, 0, 1);
    transform-origin: top;
    transition:
      transform 0.4s ${props => props.theme.curveFastoutSlowin},
      opacity 0.1s ease 0.4s;
  }

  &:hover g rect,
  &:focus g rect,
  &:active g rect {
    opacity: 1;
    transform: scale3d(1, 1, 1);
    transform-origin: bottom;
    transition:
      transform 0.4s ${props => props.theme.curveFastoutSlowin},
      opacity 0.1s ease;
  }
`;

const HeaderNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 auto;
  max-width: 45px;
  position: relative;
  top: -10px;

  @media (max-width: ${Media.mobile}), (max-height: ${Media.mobile}) {
    display: none;
  }
`;

const HeaderNavList = styled.div`
  transform: rotate(-90deg) translate3d(-50%, 0, 0);
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
  line-height: 1;

  &:hover,
  &:active,
  &:focus,
  &.active {
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
  &:focus:after,
  &.active:after {
    transform: scaleX(1) translateY(-2px);
    transform-origin: left;
  }
`;

const HeaderNavIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: ${Media.mobile}), (max-height: ${Media.mobile}) {
    flex-direction: row;
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
  }

  @media ${Media.mobileLS} {
    left: 20px;
    transform: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const HeaderNavIconLink = styled.a`
  display: flex;
  padding: 10px;
`;

const HeaderNavIcon = styled(Icon)`
  fill: ${props => props.theme.colorText(0.6)};
  transition: all 0.4s ease;

  ${HeaderNavIconLink}:hover &,
  ${HeaderNavIconLink}:focus &,
  ${HeaderNavIconLink}:active & {
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
  transform: translate3d(0, -100%, 0);
  transition: transform 0.5s ${props => props.theme.curveFastoutSlowin};
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
  `}

  @media (max-width: ${Media.mobile}), (max-height: ${Media.mobile}) {
    display: flex;
  }
`;

const HeaderMobileNavLink = styled(NavLink).attrs(props => ({
  active: 'active',
}))`
  width: 100%;
  font-size: 22px;
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

  @media ${Media.mobileLS} {
    top: auto;
  }

  ${props => props.status === 'entered' && css`
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
    transform: scaleX(0) translateY(-1px);
    transition: transform 0.4s ${props => props.theme.curveFastoutSlowin};
    transform-origin: right;
  }

  &:hover:after,
  &:active:after,
  &:focus:after {
    transform: scaleX(1) translateY(-1px);
    transform-origin: left;
  }
`;

export default React.memo(withTheme(Header));
