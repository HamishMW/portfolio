import { useRef, useState, memo } from 'react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import Monogram from 'components/Monogram';
import Icon from 'components/Icon';
import NavToggle from './NavToggle';
import ThemeToggle from './ThemeToggle';
import { useWindowSize, useAppContext } from 'hooks';
import { navLinks, socialLinks } from './navData';
import { reflow } from 'utils/transition';
import { media, msToNum, numToMs } from 'utils/style';
import { tokens } from 'components/ThemeProvider/theme';
import { blurOnMouseUp } from 'utils/focus';
import './index.css';

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

function Header(props) {
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

  const isMatch = ({ match, hash = '' }) => {
    if (!match) return false;
    return `${match.url}${hash}` === `${location.pathname}${location.hash}`;
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
            <NavLink
              exact
              className="navbar__nav-link"
              activeClassName="navbar__nav-link--active"
              isActive={match => isMatch({ match, hash })}
              onClick={handleNavClick}
              key={label}
              to={{ pathname, hash, state: hashKey }}
              onMouseUp={blurOnMouseUp}
            >
              {label}
            </NavLink>
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
              <NavLink
                className={`navbar__mobile-nav-link navbar__mobile-nav-link--${status}`}
                activeClassName="navbar__mobile-nav-link--active"
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
              </NavLink>
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

export default memo(Header);
