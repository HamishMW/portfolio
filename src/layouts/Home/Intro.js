import ArrowDown from 'assets/arrow-down.svg';
import { DecoderText } from 'components/DecoderText';
import { Heading } from 'components/Heading';
import { Section } from 'components/Section';
import { useTheme } from 'components/ThemeProvider';
import { tokens } from 'components/ThemeProvider/theme';
import { VisuallyHidden } from 'components/VisuallyHidden';
import { useInterval, usePrevious, useRouteTransition, useScrollToHash } from 'hooks';
import dynamic from 'next/dynamic';
import RouterLink from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { cssProps } from 'utils/style';
import styles from './Intro.module.css';

const DisplacementSphere = dynamic(() =>
  import('layouts/Home/DisplacementSphere').then(mod => mod.DisplacementSphere)
);

export function Intro({ id, sectionRef, disciplines, scrollIndicatorHidden, ...rest }) {
  const theme = useTheme();
  const { status: pageStatus } = useRouteTransition();
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const prevTheme = usePrevious(theme);
  const introLabel = [disciplines.slice(0, -1).join(', '), disciplines.slice(-1)[0]].join(
    ', and '
  );
  const currentDisciplines = disciplines.filter(
    (item, index) => index === disciplineIndex
  );
  const titleId = `${id}-title`;
  const scrollToHash = useScrollToHash();

  useInterval(
    () => {
      const index = (disciplineIndex + 1) % disciplines.length;
      setDisciplineIndex(index);
    },
    5000,
    theme.themeId
  );

  useEffect(() => {
    if (prevTheme && prevTheme.themeId !== theme.themeId) {
      setDisciplineIndex(0);
    }
  }, [theme.themeId, prevTheme]);

  const handleScrollClick = event => {
    event.preventDefault();
    scrollToHash(event.currentTarget.href);
  };

  return (
    <Section
      className={styles.intro}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition appear in key={theme.themeId} timeout={3000}>
        {status => (
          <Fragment>
            <DisplacementSphere />
            <header className={styles.text}>
              <h1 className={styles.name} data-status={status} id={titleId}>
                <DecoderText text="Hamish Williams" delay={300} />
              </h1>
              <Heading level={0} as="h2" className={styles.title}>
                <VisuallyHidden
                  className={styles.label}
                >{`Designer + ${introLabel}`}</VisuallyHidden>
                <span aria-hidden className={styles.row}>
                  <span
                    className={styles.word}
                    data-status={status}
                    style={cssProps({ delay: tokens.base.durationXS })}
                  >
                    Designer
                  </span>
                  <span className={styles.line} data-status={status} />
                </span>
                <TransitionGroup className={styles.row} component="span">
                  {currentDisciplines.map(item => (
                    <Transition appear timeout={{ enter: 3000, exit: 2000 }} key={item}>
                      {wordStatus => (
                        <span
                          aria-hidden
                          className={styles.word}
                          data-plus={true}
                          data-status={wordStatus}
                          style={cssProps({ delay: tokens.base.durationL })}
                        >
                          {item}
                        </span>
                      )}
                    </Transition>
                  ))}
                </TransitionGroup>
              </Heading>
            </header>
            <RouterLink href="/#project-1">
              <a
                className={styles.scrollIndicator}
                data-status={status}
                data-hidden={scrollIndicatorHidden || pageStatus !== 'entered'}
                onClick={handleScrollClick}
              >
                <VisuallyHidden>Scroll to projects</VisuallyHidden>
              </a>
            </RouterLink>
            <RouterLink href="/#project-1">
              <a
                className={styles.mobileScrollIndicator}
                data-status={status}
                data-hidden={scrollIndicatorHidden || pageStatus !== 'entered'}
                onClick={handleScrollClick}
              >
                <VisuallyHidden>Scroll to projects</VisuallyHidden>
                <ArrowDown aria-hidden />
              </a>
            </RouterLink>
          </Fragment>
        )}
      </Transition>
    </Section>
  );
}
