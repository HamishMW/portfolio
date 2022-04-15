import { Icon } from 'components/Icon';
import { Monogram } from 'components/Monogram';
import { useTheme } from 'components/ThemeProvider';
import { tokens } from 'components/ThemeProvider/theme';
import { useAppContext, useWindowSize } from 'hooks';
import RouterLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { cssProps, media, msToNum, numToMs } from 'utils/style';
import { reflow } from 'utils/transition';
import { NavToggle } from './NavToggle';
import styles from './Navbar.module.css';
import { ThemeToggle } from './ThemeToggle';
import { navLinks, socialLinks } from './navData';

const NavbarIcons = ({ desktop }) => (
  <div className={styles.navIcons}>
    {socialLinks.map(({ label, url, icon }) => (
      <a
        key={label}
        data-navbar-item={desktop || undefined}
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
  const { themeId } = useTheme();
  const { menuOpen, dispatch } = useAppContext();
  const { route, asPath } = useRouter();
  const windowSize = useWindowSize();
  const headerRef = useRef();
  const isMobile = windowSize.width <= media.mobile || windowSize.height <= 696;

  useEffect(() => {
    const navItems = document.querySelectorAll('[data-navbar-item]');
    const inverseTheme = themeId === 'dark' ? 'light' : 'dark';
    const invertedElements = document.querySelectorAll(
      `[data-theme='${inverseTheme}'][data-invert]`
    );

    const isOverlap = (rect1, rect2, scrollY) => {
      return !(rect1.bottom - scrollY < rect2.top || rect1.top - scrollY > rect2.bottom);
    };

    const navItemMeasurements = Array.from(navItems).map(item => ({
      element: item,
      top: item.offsetTop,
      bottom: item.offsetTop + item.offsetHeight,
    }));

    const inverseMeasurements = Array.from(invertedElements).map(item => ({
      element: item,
      top: item.offsetTop,
      bottom: item.offsetTop + item.offsetHeight,
    }));

    const handleInversion = () => {
      invertedElements.forEach(element => {
        const rect1 = inverseMeasurements.find(item => item.element === element);
        const { scrollY } = window;

        // console.log(element, rect1.top - scrollY, window.innerHeight);

        if (rect1.top - scrollY > window.innerHeight || rect1.bottom - scrollY < 0)
          return;

        console.log(rect1);

        navItems.forEach(navItem => {
          const rect2 = navItemMeasurements.find(item => item.element === navItem);

          if (isOverlap(rect1, rect2, scrollY)) {
            navItem.dataset.theme = inverseTheme;
          } else {
            navItem.dataset.theme = '';
          }
        });
      });
    };

    if (invertedElements) {
      document.addEventListener('scroll', handleInversion);
    }

    return () => {
      document.removeEventListener('scroll', handleInversion);
    };
  }, [themeId]);

  const getCurrent = (url = '') => {
    if (url === asPath) {
      return 'page';
    }

    return '';
  };

  const handleMobileNavClick = () => {
    if (menuOpen) dispatch({ type: 'toggleMenu' });
  };

  return (
    <header className={styles.navbar} ref={headerRef}>
      <RouterLink href={route === '/' ? '/#intro' : '/'} scroll={false}>
        <a
          data-navbar-item
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
              <a
                data-navbar-item
                className={styles.navLink}
                aria-current={getCurrent(pathname)}
              >
                {label}
              </a>
            </RouterLink>
          ))}
        </div>
        <NavbarIcons desktop />
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
      {!isMobile && <ThemeToggle data-navbar-item />}
    </header>
  );
}
