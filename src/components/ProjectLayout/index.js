import React from 'react';
import classNames from 'classnames';
import Image from 'components/Image';
import { Button } from 'components/Button';
import { useParallax } from 'hooks';
import prerender from 'utils/prerender';
import Section from 'components/Section';
import './index.css';

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
        style={{ '--initDelay': `${initDelay}ms` }}
      >
        <div className="project__details">
          <h1
            className={classNames('project__title', {
              'project__title--entered': !prerender,
            })}
          >
            {title}
          </h1>
          <p
            className={classNames('project__description', {
              'project__description--entered': !prerender,
            })}
          >
            {description}
          </p>
          <Button
            secondary
            iconHoverShift
            className={classNames('project__link-button', {
              'project__link-button--entered': !prerender,
            })}
            as="a"
            icon="chevronRight"
            href={url}
            target="_blank"
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
              style={{ '--delay': `${initDelay + 300 + index * 140}ms` }}
              key={role}
            >
              {role}
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
        '--offset': `${offset}px`,
        '--initDelay': `${initDelay}ms`,
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

export const ProjectSectionContent = ({ className, ...rest }) => (
  <div className={classNames('project__section-content', className)} {...rest} />
);

export const ProjectSectionHeading = ({ className, children, ...rest }) => (
  <h2 className={classNames('project__section-heading', className)} {...rest}>
    {children}
  </h2>
);

export const ProjectSectionText = ({ className, ...rest }) => (
  <p className={classNames('project__section-text', className)} {...rest} />
);

export const ProjectTextRow = ({
  center,
  noMargin,
  className,
  centerMobile,
  ...rest
}) => (
  <div
    className={classNames('project__text-row', className, {
      'project__text-row--center': center,
      'project__text-row--center-mobile': centerMobile,
      'project__text-row--no-margin': noMargin,
    })}
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
