import React, { lazy, Suspense, useRef } from 'react';
import styled, { css } from 'styled-components/macro';
import { NavLink, Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import Monogram from './Monogram';
import Icon from './Icon';
import NavToggle from '../components/NavToggle';
import { media, rgba } from '../utils/styleUtils';
import { useWindowSize } from '../utils/hooks';

const ThemeToggle = lazy(() => import('../components/ThemeToggle'));

const navLinks = [
  {
    label: 'Projects',
    url: '/#projects',
  },
  {
    label: 'Details',
    url: '/#details',
  },
  {
    label: 'Contact',
    url: '/contact',
  },
];

const socialLinks = [
  {
    label: 'Twitter',
    url: 'https://twitter.com/hamishMW',
    icon: 'twitter',
  },
  {
    label: 'Dribbble',
    url: 'https://dribbble.com/hamishw',
    icon: 'dribbble',
  },
  {
    label: 'Github',
    url: 'https://github.com/HamishMW',
    icon: 'github',
  },
];

const HeaderIcons = () => (
  <HeaderNavIcons>
    {socialLinks.map(({ label, url, icon }) => (
      <HeaderNavIconLink key={label} aria-label={label} href={url}>
        <HeaderNavIcon icon={icon} />
      </HeaderNavIconLink>
    ))}
  </HeaderNavIcons>
);

function Header(props) {
  const { menuOpen, toggleMenu, currentTheme, toggleTheme } = props;
  const windowSize = useWindowSize();
  const headerRef = useRef();
  const isMobile = windowSize.width <= media.numMobile || windowSize.height <= 696;

  const handleHashClick = () => {
    const newHash = window.location.hash;
    window.location.hash = '';
    window.location.hash = newHash;
  };

  const handleLogoClick = () => {
    handleHashClick();
    if (menuOpen) toggleMenu();
  };

  return (
    <HeaderWrapper role="banner" ref={headerRef}>
      <HeaderLogo to="/#intro" aria-label="Home" onClick={handleLogoClick}>
        <Monogram highlight />
      </HeaderLogo>
      {isMobile && <NavToggle onClick={toggleMenu} menuOpen={menuOpen} />}
      {!isMobile &&
        <HeaderNav role="navigation">
          <HeaderNavList>
            {navLinks.map(({ label, url }) => (
              <HeaderNavLink
                key={label}
                onClick={url.includes('#') ? handleHashClick : undefined}
                to={url}
              >
                {label}
              </HeaderNavLink>
            ))}
          </HeaderNavList>
          <HeaderIcons />
        </HeaderNav>
      }
      <Transition
        mountOnEnter
        unmountOnExit
        in={menuOpen}
        timeout={{ enter: 10, exit: 500 }}
      >
        {status => (
          <HeaderMobileNav status={status} tabIndex={-1}>
            {navLinks.map(({ label, url }, index) => (
              <HeaderMobileNavLink
                key={label}
                delay={300 + index * 50}
                status={status}
                onClick={toggleMenu}
                to={url}
              >
                {label}
              </HeaderMobileNavLink>
            ))}
            <HeaderIcons />
            <Suspense fallback={<React.Fragment />}>
              <ThemeToggle isMobile themeId={currentTheme.id} toggleTheme={toggleTheme} />
            </Suspense>
          </HeaderMobileNav>
        )}
      </Transition>
      {!isMobile &&
        <Suspense fallback={<React.Fragment />}>
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
  z-index: 16;
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
`;

const HeaderNavList = styled.div`
  transform: rotate(-90deg) translate3d(-50%, 0, 0);
  display: flex;
  flex-direction: row-reverse;
`;

const HeaderNavLink = styled(NavLink)`
  padding: 20px;
  color: ${props => rgba(props.theme.colorText, 0.8)};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease 0.1s;
  line-height: 1;

  &:hover,
  &:active,
  &:focus,
  &.active {
    color: ${props => props.theme.colorText};
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    left: 10px;
    height: 4px;
    background: ${props => props.theme.colorAccent};
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
  position: relative;
  z-index: 16;

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
  fill: ${props => rgba(props.theme.colorText, 0.6)};
  transition: fill 0.4s ease;

  ${/* sc-selector */HeaderNavIconLink}:hover &,
  ${/* sc-selector */HeaderNavIconLink}:focus &,
  ${/* sc-selector */HeaderNavIconLink}:active & {
    fill: ${props => props.theme.colorAccent};
  }
`;

const HeaderMobileNav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${props => rgba(props.theme.colorBackground, 0.9)};
  transform: translate3d(0, ${props => props.status === 'entered' ? 0 : '-100%'}, 0);
  transition-property: transform, background;
  transition-duration: 0.5s;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);

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
  color: ${props => props.theme.colorText};
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

  @media (max-height: 360px) {
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
    background: ${props => props.theme.colorAccent};
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
