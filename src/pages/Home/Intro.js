import './Intro.css';

import { ReactComponent as ArrowDown } from 'assets/arrow-down.svg';
import { DecoderText } from 'components/DecoderText';
import { Heading } from 'components/Heading';
import { Section } from 'components/Section';
import { useTheme } from 'components/ThemeProvider';
import { tokens } from 'components/ThemeProvider/theme';
import { VisuallyHidden } from 'components/VisuallyHidden';
import { useInterval, usePrevious, useWindowSize } from 'hooks';
import { Fragment, Suspense, lazy, useEffect, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { prerender } from 'utils/prerender';
import { cssProps, media } from 'utils/style';
import { reflow } from 'utils/transition';

const DisplacementSphere = lazy(() => import('pages/Home/DisplacementSphere'));

export function Intro({ id, sectionRef, disciplines, scrollIndicatorHidden, ...rest }) {
  const theme = useTheme();
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const windowSize = useWindowSize();
  const prevTheme = usePrevious(theme);
  const introLabel = [disciplines.slice(0, -1).join(', '), disciplines.slice(-1)[0]].join(
    ', and '
  );
  const currentDisciplines = disciplines.filter(
    (item, index) => index === disciplineIndex
  );
  const titleId = `${id}-title`;

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

  return (
    <Section
      className="intro"
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition
        key={theme.themeId}
        appear={!prerender}
        in={!prerender}
        timeout={3000}
        onEnter={reflow}
      >
        {status => (
          <Fragment>
            {!prerender && (
              <Suspense fallback={null}>
                <DisplacementSphere />
              </Suspense>
            )}
            <header className="intro__text">
              <h1 className="intro__name" data-status={status} id={titleId}>
                <DecoderText text="Hamish Williams" start={!prerender} delay={300} />
              </h1>
              <Heading level={0} as="h2" className="intro__title">
                <VisuallyHidden className="intro__title-label">{`Designer + ${introLabel}`}</VisuallyHidden>
                <span aria-hidden className="intro__title-row" data-hidden={prerender}>
                  <span
                    className="intro__title-word"
                    data-status={status}
                    style={cssProps({ delay: tokens.base.durationXS })}
                  >
                    Designer
                  </span>
                  <span className="intro__title-line" data-status={status} />
                </span>
                <TransitionGroup
                  className="intro__title-row"
                  data-hidden={prerender}
                  component="span"
                >
                  {currentDisciplines.map(item => (
                    <Transition
                      appear
                      timeout={{ enter: 3000, exit: 2000 }}
                      key={item}
                      onEnter={reflow}
                    >
                      {wordStatus => (
                        <span
                          aria-hidden
                          className="intro__title-word"
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
            {windowSize.width > media.tablet && (
              <div
                className="intro__scroll-indicator"
                data-status={status}
                data-hidden={scrollIndicatorHidden}
              />
            )}
            {windowSize.width <= media.tablet && (
              <div
                className="intro__mobile-scroll-indicator"
                data-status={status}
                data-hidden={scrollIndicatorHidden}
              >
                <ArrowDown aria-hidden />
              </div>
            )}
          </Fragment>
        )}
      </Transition>
    </Section>
  );
}
