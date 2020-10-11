import React from 'react';
import classNames from 'classnames';
import Image from 'components/Image';
import { Button } from 'components/Button';
import { useParallax } from 'hooks';
import prerender from 'utils/prerender';
import Section from 'components/Section';
import { numToPx, numToMs } from 'utils/style';
import Heading from 'components/Heading';
import './index.css';
import Text from 'components/Text';

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
    <ProjectSection className={classNames('project__header', className)}>
      <div
        className="project__header-content"
        style={{ '--initDelay': numToMs(initDelay) }}
      >
        <div className="project__details">
          <Heading
            className={classNames('project__title', {
              'project__title--entered': !prerender,
            })}
            level={2}
            as="h1"
          >
            {title}
          </Heading>
          <Text
            className={classNames('project__description', {
              'project__description--entered': !prerender,
            })}
            size="xl"
          >
            {description}
          </Text>
          <Button
            secondary
            iconHoverShift
            className={classNames('project__link-button', {
              'project__link-button--entered': !prerender,
            })}
            icon="chevronRight"
            href={url}
          >
            {linkLabel}
          </Button>
        </div>
        <ul className="project__meta">
          {roles?.map((role, index) => (
            <li
              className={classNames('project__meta-item', {
                'project__meta-item--entered': !prerender,
              })}
              style={{ '--delay': numToMs(initDelay + 300 + index * 140) }}
              key={role}
            >
              <Text secondary as="span">
                {role}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </ProjectSection>
  );
}

export const ProjectContainer = ({ className, ...rest }) => (
  <article className={classNames('project', className)} {...rest} />
);

export const ProjectSection = ({ className, light, ...rest }) => (
  <Section
    className={classNames('project__section', className, {
      'project__section--light': light,
    })}
    as="section"
    {...rest}
  />
);

export const ProjectBackground = ({ opacity = 0.7, className, entered, ...rest }) => {
  const offset = useParallax(-0.6);

  return (
    <Image
      className={classNames('project__background-image', className, {
        'project__background-image--entered': entered,
      })}
      alt=""
      role="presentation"
      style={{
        '--opacity': opacity,
        '--offset': numToPx(offset),
      }}
      {...rest}
    />
  );
};

export const ProjectImage = ({ className, ...rest }) => (
  <div className={classNames('project__image', className)}>
    <Image reveal delay={300} {...rest} />
  </div>
);

export const ProjectSectionContent = ({ className, wide, ...rest }) => (
  <div
    className={classNames('project__section-content', className, {
      'project__section-content--wide': wide,
    })}
    {...rest}
  />
);

export const ProjectSectionHeading = ({ className, level = 3, ...rest }) => (
  <Heading
    className={classNames('project__section-heading', className)}
    level={level}
    {...rest}
  />
);

export const ProjectSectionText = ({ className, ...rest }) => (
  <Text className={classNames('project__section-text', className)} size="l" {...rest} />
);

export const ProjectTextRow = ({
  center,
  justify,
  noMargin,
  className,
  centerMobile,
  ...rest
}) => (
  <div
    className={classNames(
      'project__text-row',
      `project__text-row--justify-${justify}`,
      className,
      {
        'project__text-row--center': center,
        'project__text-row--center-mobile': centerMobile,
        'project__text-row--no-margin': noMargin,
      }
    )}
    {...rest}
  />
);

export const ProjectSectionColumns = ({ className, centered, ...rest }) => (
  <ProjectSectionContent
    className={classNames(
      'project__section-columns',
      { 'project__section-columns--centered': centered },
      className
    )}
    {...rest}
  />
);
