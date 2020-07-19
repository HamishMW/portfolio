import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import { Link } from 'components/Link';
import Section from 'components/Section';
import { Button } from 'components/Button';
import Model from 'components/Model';
import Divider from 'components/Divider';
import { useWindowSize, useAppContext } from 'hooks';
import { reflow, isVisible } from 'utils/transition';
import { media } from 'utils/style';
import { ReactComponent as KatakanaProject } from 'assets/katakana-project.svg';
import deviceModels from 'components/Model/deviceModels';
import './ProjectSummary.css';

const ProjectSummary = ({
  id,
  visible,
  sectionRef,
  index,
  title,
  description,
  model,
  buttonText,
  buttonLink,
  buttonTo,
  alternate,
  ...rest
}) => {
  const { theme } = useAppContext();
  const { width } = useWindowSize();
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;
  const svgOpacity = theme.themeId === 'light' ? 0.7 : 1;
  const indexText = index < 10 ? `0${index}` : index;
  const phoneSizes = `(max-width: ${media.tablet}px) 152px, 254px`;
  const laptopSizes = `(max-width: ${media.tablet}px) 100vw, 50vw`;

  const renderDetails = status => (
    <div className="project-summary__details">
      <div aria-hidden className="project-summary__index">
        <Divider
          notchWidth="64px"
          notchHeight="8px"
          collapsed={status !== 'entered'}
          collapseDelay={1000}
        />
        <span
          className={classNames(
            'project-summary__index-number',
            `project-summary__index-number--${status}`
          )}
        >
          {indexText}
        </span>
      </div>
      <h2
        className={classNames(
          'project-summary__title',
          `project-summary__title--${status}`
        )}
        id={titleId}
      >
        {title}
      </h2>
      <p
        className={classNames(
          'project-summary__description',
          `project-summary__description--${status}`
        )}
      >
        {description}
      </p>
      <div
        className={classNames(
          'project-summary__button',
          `project-summary__button--${status}`
        )}
      >
        {buttonLink && (
          <Button
            iconHoverShift
            as="a"
            href={buttonLink}
            target="_blank"
            iconEnd="arrowRight"
          >
            {buttonText}
          </Button>
        )}
        {buttonTo && (
          <Button iconHoverShift as={Link} to={buttonTo} iconEnd="arrowRight">
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );

  const renderPreview = status => (
    <div className="project-summary__preview">
      {model.type === 'laptop' && (
        <Fragment>
          <KatakanaProject
            style={{ '--opacity': svgOpacity }}
            className={classNames(
              'project-summary__svg',
              'project-summary__svg--laptop',
              `project-summary__svg--${status}`,
              {
                'project-summary__svg--light': theme.themeId === 'light',
              }
            )}
          />
          <Model
            className={classNames(
              'project-summary__model',
              'project-summary__model--laptop'
            )}
            alt={model.alt}
            cameraPosition={[0, 0, 8]}
            showDelay={800}
            show={isVisible(status)}
            models={[
              {
                ...deviceModels.laptop,
                texture: {
                  ...model.textures[0],
                  sizes: laptopSizes,
                },
              },
            ]}
          />
        </Fragment>
      )}
      {model.type === 'phone' && (
        <Fragment>
          <KatakanaProject
            style={{ '--opacity': svgOpacity }}
            className={classNames(
              'project-summary__svg',
              'project-summary__svg--phone',
              `project-summary__svg--${status}`,
              {
                'project-summary__svg--light': theme.themeId === 'light',
              }
            )}
          />
          <Model
            className={classNames(
              'project-summary__model',
              'project-summary__model--phone'
            )}
            alt={model.alt}
            cameraPosition={[0, 0, 11.5]}
            showDelay={500}
            show={isVisible(status)}
            models={[
              {
                ...deviceModels.phone,
                position: { x: -0.6, y: 1.1, z: 0 },
                texture: {
                  ...model.textures[0],
                  sizes: phoneSizes,
                },
              },
              {
                ...deviceModels.phone,
                position: { x: 0.6, y: -0.5, z: 0.3 },
                texture: {
                  ...model.textures[1],
                  sizes: phoneSizes,
                },
              },
            ]}
          />
        </Fragment>
      )}
    </div>
  );

  return (
    <Section
      className={classNames('project-summary', {
        'project-summary--alternate': alternate,
        'project-summary--first': index === '01',
      })}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className="project-summary__content">
        <Transition in={visible} timeout={0} onEnter={reflow}>
          {status => (
            <Fragment>
              {!alternate && !isMobile && (
                <Fragment>
                  {renderDetails(status)}
                  {renderPreview(status)}
                </Fragment>
              )}
              {(alternate || isMobile) && (
                <Fragment>
                  {renderPreview(status)}
                  {renderDetails(status)}
                </Fragment>
              )}
            </Fragment>
          )}
        </Transition>
      </div>
    </Section>
  );
};

export default ProjectSummary;
