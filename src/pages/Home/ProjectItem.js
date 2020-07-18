import React, { Fragment, memo } from 'react';
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
import './ProjectItem.css';

const ProjectItem = ({
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
    <div className="project-item__details">
      <div aria-hidden className="project-item__index">
        <Divider
          notchWidth="64px"
          notchHeight="8px"
          collapsed={status !== 'entered'}
          collapseDelay={1000}
        />
        <span
          className={classNames(
            'project-item__index-number',
            `project-item__index-number--${status}`
          )}
        >
          {indexText}
        </span>
      </div>
      <h2
        className={classNames('project-item__title', `project-item__title--${status}`)}
        id={titleId}
      >
        {title}
      </h2>
      <p
        className={classNames(
          'project-item__description',
          `project-item__description--${status}`
        )}
      >
        {description}
      </p>
      <div
        className={classNames('project-item__button', `project-item__button--${status}`)}
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
    <div className="project-item__preview">
      {model.type === 'laptop' && visible && (
        <Fragment>
          <KatakanaProject
            style={{ '--opacity': svgOpacity }}
            className={classNames(
              'project-item__svg',
              'project-item__svg--laptop',
              `project-item__svg--${status}`,
              {
                'project-item__svg--light': theme.themeId === 'light',
              }
            )}
          />
          <Model
            className="project-item__preview-model-laptop"
            alt={model.alt}
            cameraPosition={[0, 0, 9]}
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
      {model.type === 'phone' && visible && (
        <Fragment>
          <KatakanaProject
            style={{ '--opacity': svgOpacity }}
            className={classNames(
              'project-item__svg',
              'project-item__svg--phone',
              `project-item__svg--${status}`,
              {
                'project-item__svg--light': theme.themeId === 'light',
              }
            )}
          />
          <Model
            className="project-item__preview-model-phone"
            alt={model.alt}
            cameraPosition={[0, 0, 11]}
            showDelay={500}
            show={isVisible(status)}
            models={[
              {
                ...deviceModels.phone,
                position: { x: -0.6, y: 1.3, z: -0.2 },
                texture: {
                  ...model.textures[0],
                  sizes: phoneSizes,
                },
              },
              {
                ...deviceModels.phone,
                position: { x: 0.6, y: -0.3, z: 0.2 },
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
      className={classNames('project-item', {
        'project-item--alternate': alternate,
        'project-item--first': index === '01',
      })}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className="project-item__content">
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

export default memo(ProjectItem);
