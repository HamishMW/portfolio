import { Icon } from 'components/Icon';
import { Monogram } from 'components/Monogram';
import { useTheme } from 'components/ThemeProvider';
import { tokens } from 'components/ThemeProvider/theme';
import { useAppContext, usePrefersReducedMotion, useWindowSize } from 'hooks';
import RouterLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
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
  const [current, setCurrent] = useState();
  const [target, setTarget] = useState();
  const { themeId } = useTheme();
  const { menuOpen, dispatch } = useAppContext();
  const { route, asPath, push } = useRouter();
  const scrollTimeout = useRef();
  const windowSize = useWindowSize();
  const headerRef = useRef();
  const isMobile = windowSize.width <= media.mobile || windowSize.height <= 696;
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Prevent ssr mismatch by storing this in state
    setCurrent(asPath);
  }, [asPath]);

  useEffect(() => {
    const hash = route.split('#')[1];

    if (hash) {
      const targetElement = document.getElementById(target);
      targetElement.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const navItems = document.querySelectorAll('[data-navbar-item]');
    const inverseTheme = themeId === 'dark' ? 'light' : 'dark';
    const invertedElements = document.querySelectorAll(
      `[data-theme='${inverseTheme}'][data-invert]`
    );

    const isOverlap = (rect1, rect2, scrollY) => {
      return !(rect1.bottom - scrollY < rect2.top || rect1.top - scrollY > rect2.bottom);
    };

    const navItemMeasurements = Array.from(navItems).map(item => {
      const rect = item.getBoundingClientRect();

      return {
        element: item,
        top: rect.top,
        bottom: rect.bottom,
      };
    });

    const handleInversion = () =>
      requestAnimationFrame(() => {
        const { scrollY } = window;

        const inverseMeasurements = Array.from(invertedElements).map(item => ({
          element: item,
          top: item.offsetTop,
          bottom: item.offsetTop + item.offsetHeight,
        }));

        inverseMeasurements.forEach(inverseMeasurement => {
          if (
            inverseMeasurement.top - scrollY > window.innerHeight ||
            inverseMeasurement.bottom - scrollY < 0
          ) {
            return;
          }

          navItemMeasurements.forEach(measurement => {
            if (isOverlap(inverseMeasurement, measurement, scrollY)) {
              measurement.element.dataset.theme = inverseTheme;
            } else {
              measurement.element.dataset.theme = '';
            }
          });
        });
      });

    if (invertedElements) {
      document.addEventListener('scroll', handleInversion);
      handleInversion();
    }

    return () => {
      document.removeEventListener('scroll', handleInversion);
    };
  }, [themeId, windowSize]);

  const getCurrent = (url = '') => {
    const nonTrailing = current?.endsWith('/') ? current?.slice(0, -1) : current;

    if (url === nonTrailing) {
      return 'page';
    }

    return '';
  };

  const handleNavItemClick = event => {
    const hash = event.currentTarget.href.split('#')[1];

    if (route !== '/' || !hash) return;

    event.preventDefault();

    setTarget(hash);
  };

  useEffect(() => {
    if (!target) return;

    const targetElement = document.getElementById(target);
    targetElement.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });

    const handleScroll = () => {
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setTarget(null);
        push(`#${target}`, null, { scroll: false });
        targetElement.focus();
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [push, reduceMotion, target]);

  const handleMobileNavClick = event => {
    handleNavItemClick(event);
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
                onClick={handleNavItemClick}
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
