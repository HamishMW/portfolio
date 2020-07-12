import React, { Fragment, memo } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import { Link } from 'components/Link';
import Section from 'components/Section';
import { Button } from 'components/Button';
import Image from 'components/Image';
import Divider from 'components/Divider';
import { useWindowSize, useAppContext } from 'hooks';
import phone from 'assets/phone.png';
import phoneLarge from 'assets/phone-large.png';
import phonePlaceholder from 'assets/phone-placeholder.png';
import { reflow } from 'utils/transition';
import { media } from 'utils/style';
import { ReactComponent as KatakanaProject } from 'assets/katakana-project.svg';
import './ProjectItem.css';

const ProjectItem = ({
  id,
  visible,
  sectionRef,
  index,
  title,
  description,
  imageSrc,
  imageAlt,
  imageType,
  imagePlaceholder,
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
          {index}
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
      {imageType === 'laptop' && (
        <div className="project-item__preview-content-laptop">
          <Image
            className={classNames(
              'project-item__image-laptop',
              `project-item__image-laptop--${status}`
            )}
            srcSet={imageSrc[0]}
            alt={imageAlt[0]}
            placeholder={imagePlaceholder[0]}
            sizes={`(max-width: ${media.mobile}px) 300px, (max-width: ${media.tablet}px) 420px, (max-width: ${media.desktop}px) 860px, 900px`}
          />
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
        </div>
      )}
      {imageType === 'phone' && (
        <div className="project-item__preview-content-phone">
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
          {imageSrc &&
            imageSrc.map((src, index) => (
              <div
                className={classNames(
                  'project-item__phone',
                  `project-item__phone--${status}`,
                  { 'project-item__phone--first': index === 0 }
                )}
                key={`img_${index}`}
              >
                <div className="project-item__phone-frame">
                  <Image
                    srcSet={`${phone} 414w, ${phoneLarge} 828w`}
                    sizes={`(max-width: ${media.tablet}px) 248px, 414px`}
                    alt=""
                    role="presentation"
                    placeholder={phonePlaceholder}
                  />
                </div>
                <div className="project-item__phone-image">
                  <Image
                    srcSet={imageSrc[index]}
                    alt={imageAlt[index]}
                    placeholder={imagePlaceholder[index]}
                    sizes={`(max-width: ${media.tablet}px) 152px, 254px`}
                  />
                </div>
              </div>
            ))}
        </div>
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
