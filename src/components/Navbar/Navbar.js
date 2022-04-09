import './Navbar.css';

import classNames from 'classnames';
import { Icon } from 'components/Icon';
import { Monogram } from 'components/Monogram';
import { tokens } from 'components/ThemeProvider/theme';
import { useAppContext, useWindowSize } from 'hooks';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { blurOnMouseUp } from 'utils/focus';
import { media, msToNum, numToMs } from 'utils/style';
import { reflow } from 'utils/transition';
import { NavToggle } from './NavToggle';
import { ThemeToggle } from './ThemeToggle';
import { navLinks, socialLinks } from './navData';

const NavbarIcons = () => (
  <div className="navbar__nav-icons">
    {socialLinks.map(({ label, url, icon }) => (
      <a
        key={label}
        className="navbar__nav-icon-link"
        aria-label={label}
        href={url}
        onMouseUp={blurOnMouseUp}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="navbar__nav-icon" icon={icon} />
      </a>
    ))}
  </div>
);

export function Navbar(props) {
  const { menuOpen, dispatch } = useAppContext();
  const { location } = props;
  const [hashKey, setHashKey] = useState();
  const windowSize = useWindowSize();
  const headerRef = useRef();
  const isMobile = windowSize.width <= media.mobile || windowSize.height <= 696;

  const handleNavClick = () => {
    setHashKey(Math.random().toString(32).substr(2, 8));
  };

  const handleMobileNavClick = () => {
    handleNavClick();
    if (menuOpen) dispatch({ type: 'toggleMenu' });
  };

  const isMatch = (url = '', hash = '') => {
    if (!url) return false;
    return `${url}${hash}` === `${location.pathname}${location.hash}`;
  };

  return (
    <header className="navbar" ref={headerRef}>
      <RouterLink
        className="navbar__logo"
        to={{ pathname: '/', hash: '#intro', state: hashKey }}
        aria-label="Hamish Williams, Designer"
        onClick={handleMobileNavClick}
        onMouseUp={blurOnMouseUp}
      >
        <Monogram highlight />
      </RouterLink>
      <NavToggle onClick={() => dispatch({ type: 'toggleMenu' })} menuOpen={menuOpen} />
      <nav className="navbar__nav">
        <div className="navbar__nav-list">
          {navLinks.map(({ label, pathname, hash }) => (
            <RouterLink
              className="navbar__nav-link"
              aria-current={isMatch(pathname, hash) ? 'page' : undefined}
              onClick={handleNavClick}
              key={label}
              to={{ pathname, hash, state: hashKey }}
              onMouseUp={blurOnMouseUp}
            >
              {label}
            </RouterLink>
          ))}
        </div>
        <NavbarIcons />
      </nav>
      <Transition
        mountOnEnter
        unmountOnExit
        in={menuOpen}
        timeout={{ enter: 0, exit: msToNum(tokens.base.durationL) }}
        onEnter={reflow}
      >
        {status => (
          <nav className={`navbar__mobile-nav navbar__mobile-nav--${status}`}>
            {navLinks.map(({ label, pathname, hash }, index) => (
              <RouterLink
                className={classNames(
                  'navbar__mobile-nav-link',
                  `navbar__mobile-nav-link--${status}`
                )}
                aria-current={isMatch(pathname, hash) ? 'page' : undefined}
                key={label}
                onClick={handleMobileNavClick}
                to={{ pathname, hash, state: hashKey }}
                onMouseUp={blurOnMouseUp}
                style={{
                  transitionDelay: numToMs(
                    Number(msToNum(tokens.base.durationS)) + index * 50
                  ),
                }}
              >
                {label}
              </RouterLink>
            ))}
            <NavbarIcons />
            <ThemeToggle isMobile />
          </nav>
        )}
      </Transition>
      {!isMobile && <ThemeToggle />}
    </header>
  );
}
