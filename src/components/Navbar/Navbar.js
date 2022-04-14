import { Icon } from 'components/Icon';
import { Monogram } from 'components/Monogram';
import { tokens } from 'components/ThemeProvider/theme';
import { useAppContext, useWindowSize } from 'hooks';
import RouterLink from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { Transition } from 'react-transition-group';
import { cssProps, media, msToNum, numToMs } from 'utils/style';
import { reflow } from 'utils/transition';
import { NavToggle } from './NavToggle';
import styles from './Navbar.module.css';
import { ThemeToggle } from './ThemeToggle';
import { navLinks, socialLinks } from './navData';

const NavbarIcons = () => (
  <div className={styles.navIcons}>
    {socialLinks.map(({ label, url, icon }) => (
      <a
        key={label}
        className={styles.navIconLink}
        aria-label={label}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className={styles.navIcon} icon={icon} />
      </a>
    ))}
  </div>
);

export function Navbar() {
  const { menuOpen, dispatch } = useAppContext();
  const { asPath } = useRouter();
  const windowSize = useWindowSize();
  const headerRef = useRef();
  const isMobile = windowSize.width <= media.mobile || windowSize.height <= 696;

  const handleMobileNavClick = () => {
    if (menuOpen) dispatch({ type: 'toggleMenu' });
  };

  const getCurrent = (url = '') => {
    if (url === asPath) {
      return 'page';
    }
  };

  return (
    <header className={styles.navbar} ref={headerRef}>
      <RouterLink href="/#intro" scroll={false}>
        <a
          className={styles.logo}
          aria-label="Hamish Williams, Designer"
          onClick={handleMobileNavClick}
        >
          <Monogram highlight />
        </a>
      </RouterLink>
      <NavToggle onClick={() => dispatch({ type: 'toggleMenu' })} menuOpen={menuOpen} />
      <nav className={styles.nav}>
        <div className={styles.navList}>
          {navLinks.map(({ label, pathname }) => (
            <RouterLink href={pathname} scroll={false} key={label}>
              <a className={styles.navLink} aria-current={getCurrent(pathname)}>
                {label}
              </a>
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
          <nav className={styles.mobileNav} data-status={status}>
            {navLinks.map(({ label, pathname }, index) => (
              <RouterLink href={pathname} scroll={false} key={label}>
                <a
                  className={styles.mobileNavLink}
                  data-status={status}
                  aria-current={getCurrent(pathname)}
                  onClick={handleMobileNavClick}
                  style={cssProps({
                    transitionDelay: numToMs(
                      Number(msToNum(tokens.base.durationS)) + index * 50
                    ),
                  })}
                >
                  {label}
                </a>
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
