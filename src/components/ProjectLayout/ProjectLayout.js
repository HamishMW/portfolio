import './ProjectLayout.css';

import { Button } from 'components/Button';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { useParallax } from 'hooks';
import { forwardRef } from 'react';
import { prerender } from 'utils/prerender';
import { classes, cssProps, numToMs } from 'utils/style';

const initDelay = 300;

export function ProjectHeader({
  title,
  description,
  linkLabel = 'Visit website',
  url,
  roles,
  className,
}) {
  return (
    <Section className={classes('project__header', className)}>
      <div
        className="project__header-content"
        style={cssProps({ initDelay: numToMs(initDelay) })}
      >
        <div className="project__details">
          <Heading className="project__title" data-entered={!prerender} level={2} as="h1">
            {title}
          </Heading>
          <Text className="project__description" data-entered={!prerender} size="xl">
            {description}
          </Text>
          {!!url && (
            <Button
              secondary
              iconHoverShift
              className="project__link-button"
              data-entered={!prerender}
              icon="chevronRight"
              href={url}
            >
              {linkLabel}
            </Button>
          )}
        </div>
        {!!roles?.length && (
          <ul className="project__meta">
            {roles?.map((role, index) => (
              <li
                className="project__meta-item"
                data-entered={!prerender}
                style={cssProps({ delay: numToMs(initDelay + 300 + index * 140) })}
                key={role}
              >
                <Text secondary as="span">
                  {role}
                </Text>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}

export const ProjectContainer = ({ className, ...rest }) => (
  <article className={classes('project', className)} {...rest} />
);

export const ProjectSection = forwardRef(
  (
    {
      className,
      light,
      first,
      fullHeight,
      backgroundOverlayOpacity = 0.9,
      backgroundElement,
      children,
      ...rest
    },
    ref
  ) => (
    <section
      className={classes('project__section', className)}
      data-light={light}
      data-full-height={fullHeight}
      ref={ref}
      {...rest}
    >
      {!!backgroundElement && (
        <div
          className="project__section-background"
          style={cssProps({ opacity: backgroundOverlayOpacity })}
        >
          {backgroundElement}
        </div>
      )}
      <Section className="project__section-inner" data-first={first}>
        {children}
      </Section>
    </section>
  )
);

export const ProjectBackground = ({ opacity = 0.7, className, entered, ...rest }) => {
  const offset = useParallax(0.6);

  return (
    <div className="project__background-image" data-entered={entered}>
      <div className="project__background-image-element" style={cssProps({ offset })}>
        <Image alt="" role="presentation" {...rest} />
      </div>
      <div className="project__background-scrim" style={cssProps({ opacity })} />
    </div>
  );
};

export const ProjectImage = ({ className, ...rest }) => (
  <div className={classes('project__image', className)}>
    <Image reveal delay={300} {...rest} />
  </div>
);

export const ProjectSectionContent = ({ className, width = 'l', ...rest }) => (
  <div
    className={classes('project__section-content', className)}
    data-width={width}
    {...rest}
  />
);

export const ProjectSectionHeading = ({ className, level = 3, as = 'h2', ...rest }) => (
  <Heading
    className={classes('project__section-heading', className)}
    as={as}
    level={level}
    align="auto"
    {...rest}
  />
);

export const ProjectSectionText = ({ className, ...rest }) => (
  <Text className={classes('project__section-text', className)} size="l" {...rest} />
);

export const ProjectTextRow = ({
  center,
  stretch,
  justify = 'center',
  width = 'm',
  noMargin,
  className,
  centerMobile,
  ...rest
}) => (
  <div
    className={classes('project__text-row', className)}
    data-center={center}
    data-stretch={stretch}
    data-center-mobile={centerMobile}
    data-no-margin={noMargin}
    data-width={width}
    data-justify={justify}
    {...rest}
  />
);

export const ProjectSectionColumns = ({ className, centered, ...rest }) => (
  <ProjectSectionContent
    className={classes('project__section-columns', className)}
    data-centered={centered}
    {...rest}
  />
);
