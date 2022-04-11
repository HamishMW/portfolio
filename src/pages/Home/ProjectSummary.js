import './ProjectSummary.css';

import { ReactComponent as KatakanaProject } from 'assets/katakana-project.svg';
import { Button } from 'components/Button';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Model } from 'components/Model/Model';
import { deviceModels } from 'components/Model/deviceModels';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { useTheme } from 'components/ThemeProvider';
import { useWindowSize } from 'hooks';
import { Transition } from 'react-transition-group';
import { cssProps, media } from 'utils/style';
import { isVisible, reflow } from 'utils/transition';

export const ProjectSummary = ({
  id,
  visible,
  sectionRef,
  index,
  title,
  description,
  model,
  buttonText,
  buttonLink,
  alternate,
  ...rest
}) => {
  const theme = useTheme();
  const { width } = useWindowSize();
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;
  const svgOpacity = theme.themeId === 'light' ? 0.7 : 1;
  const indexText = index < 10 ? `0${index}` : index;
  const phoneSizes = `(max-width: ${media.tablet}px) 30vw, 20vw`;
  const laptopSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`;

  const renderDetails = status => (
    <div className="project-summary__details">
      <div aria-hidden className="project-summary__index">
        <Divider
          notchWidth="64px"
          notchHeight="8px"
          collapsed={status !== 'entered'}
          collapseDelay={1000}
        />
        <span className="project-summary__index-number" data-status={status}>
          {indexText}
        </span>
      </div>
      <Heading
        level={3}
        as="h2"
        className="project-summary__title"
        data-status={status}
        id={titleId}
      >
        {title}
      </Heading>
      <Text className="project-summary__description" data-status={status}>
        {description}
      </Text>
      <div className="project-summary__button" data-status={status}>
        <Button iconHoverShift href={buttonLink} iconEnd="arrowRight">
          {buttonText}
        </Button>
      </div>
    </div>
  );

  const renderPreview = status => (
    <div className="project-summary__preview">
      {model.type === 'laptop' && (
        <>
          <KatakanaProject
            className="project-summary__svg"
            style={cssProps({ opacity: svgOpacity })}
            data-device="laptop"
            data-status={status}
            data-light={theme.themeId === 'light'}
          />
          <Model
            className="project-summary__model"
            data-device="laptop"
            alt={model.alt}
            cameraPosition={{ x: 0, y: 0, z: 8 }}
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
        </>
      )}
      {model.type === 'phone' && (
        <>
          <KatakanaProject
            data-status={status}
            data-light={theme.themeId === 'light'}
            style={cssProps({ opacity: svgOpacity })}
            className="project-summary__svg"
            data-device="phone"
          />
          <Model
            className="project-summary__model"
            data-device="phone"
            alt={model.alt}
            cameraPosition={{ x: 0, y: 0, z: 11.5 }}
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
        </>
      )}
    </div>
  );

  return (
    <Section
      className="project-summary"
      data-alternate={alternate}
      data-first={index === '01'}
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
            <>
              {!alternate && !isMobile && (
                <>
                  {renderDetails(status)}
                  {renderPreview(status)}
                </>
              )}
              {(alternate || isMobile) && (
                <>
                  {renderPreview(status)}
                  {renderDetails(status)}
                </>
              )}
            </>
          )}
        </Transition>
      </div>
    </Section>
  );
};
