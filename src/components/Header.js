import React, { lazy, Suspense } from 'react';
import styled, { css } from 'styled-components/macro';
import { NavLink, Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import Monogram from './Monogram';
import Icon from '../utils/Icon';
import { media } from '../utils/StyleUtils';
import { useWindowSize } from '../utils/Hooks';

const ThemeToggle = lazy(() => import('../components/ThemeToggle'));

const HeaderIcons = () => (
  <HeaderNavIcons>
    <HeaderNavIconLink
      aria-label="Twitter"
      href="https://twitter.com/hamishMW"
    >
      <HeaderNavIcon icon="twitter" />
    </HeaderNavIconLink>
    <HeaderNavIconLink
      aria-label="Dribbble"
      href="https://dribbble.com/hamishw"
    >
      <HeaderNavIcon icon="dribbble" />
    </HeaderNavIconLink>
    <HeaderNavIconLink
      aria-label="Github"
      href="https://github.com/HamishMW"
    >
      <HeaderNavIcon icon="github" />
    </HeaderNavIconLink>
  </HeaderNavIcons>
);

function Header(props) {
  const { menuOpen, toggleMenu, currentTheme, toggleTheme } = props;
  const windowSize = useWindowSize();

  return (
    <HeaderWrapper role="banner">
      <Transition
        mountOnEnter
        unmountOnExit
        in={menuOpen}
        timeout={{ enter: 0, exit: 500 }}
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
            <HeaderMobileNavLink
              delay={400}
              status={status}
              onClick={toggleMenu}
              to="/contact"
            >
              Contact
            </HeaderMobileNavLink>
            <HeaderIcons />
            <Suspense fallback={React.Fragment}>
              <ThemeToggle isMobile themeId={currentTheme.id} toggleTheme={toggleTheme} />
            </Suspense>
          </HeaderMobileNav>
        )}
      </Transition>
      <HeaderLogo to="/#intro" aria-label="Home">
        <Monogram />
      </HeaderLogo>
      <HeaderNav role="navigation">
        <HeaderNavList>
          <HeaderNavLink to="/#projects">Projects</HeaderNavLink>
          <HeaderNavLink to="/#details">Details</HeaderNavLink>
          <HeaderNavLink to="/contact">Contact</HeaderNavLink>
        </HeaderNavList>
        <HeaderIcons />
      </HeaderNav>
      {windowSize.width > media.numMobile && windowSize.height > 696 &&
        <Suspense fallback={React.Fragment}>
          <ThemeToggle themeId={currentTheme.id} toggleTheme={toggleTheme} />
        </Suspense>
      }
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

  @media (max-width: ${media.tablet}) {
    top: ${props => props.theme.spacingOuter.tablet};
    left: ${props => props.theme.spacingOuter.tablet};
    bottom: ${props => props.theme.spacingOuter.tablet};
  }

  @media (max-width: ${media.mobile}), (max-height: ${media.mobile}) {
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

  @media (max-width: ${media.mobile}), (max-height: ${media.mobile}) {
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
    color: ${props => props.theme.colorText()};
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    left: 10px;
    height: 4px;
    background: ${props => props.theme.colorAccent()};
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

  @media (max-width: ${media.mobile}), (max-height: ${media.mobile}) {
    flex-direction: row;
    position: absolute;
    bottom: 30px;
    left: 30px;
  }

  @media ${media.mobileLS} {
    left: 20px;
    transform: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const HeaderNavIconLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  display: flex;
  padding: 10px;
`;

const HeaderNavIcon = styled(Icon)`
  fill: ${props => props.theme.colorText(0.6)};
  transition: fill 0.4s ease;

  ${HeaderNavIconLink}:hover &,
  ${HeaderNavIconLink}:focus &,
  ${HeaderNavIconLink}:active & {
    fill: ${props => props.theme.colorAccent()};
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
  transition-property: transform, background;
  transition-duration: 0.5s;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
  `}

  @media (max-width: ${media.mobile}), (max-height: ${media.mobile}) {
    display: flex;
  }
`;

const HeaderMobileNavLink = styled(NavLink).attrs({
  active: 'active',
})`
  width: 100%;
  font-size: 22px;
  text-align: center;
  text-decoration: none;
  color: ${props => props.theme.colorText()};
  padding: 20px;
  transform: translate3d(0, -30px, 0);
  opacity: 0;
  transition: all 0.3s ${props => props.theme.curveFastoutSlowin};
  transition-delay: ${props => props.delay}ms;
  position: relative;
  top: -15px;

  @media ${media.mobileLS} {
    top: auto;
  }

  @media (max-width: 400px) {
    font-size: 18px;
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
    background: ${props => props.theme.colorAccent()};
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

export default React.memo(Header);
