import KatakanaProject from 'assets/katakana-project.svg';
import { Button } from 'components/Button';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { deviceModels } from 'components/Model/deviceModels';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { useTheme } from 'components/ThemeProvider';
import { useWindowSize } from 'hooks';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Transition } from 'react-transition-group';
import { cssProps, media } from 'utils/style';
import { isVisible, reflow } from 'utils/transition';
import styles from './ProjectSummary.module.css';

const Model = dynamic(() => import('components/Model').then(mod => mod.Model));

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
  const [focused, setFocused] = useState(false);
  const theme = useTheme();
  const { width } = useWindowSize();
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;
  const svgOpacity = theme.themeId === 'light' ? 0.7 : 1;
  const indexText = index < 10 ? `0${index}` : index;
  const phoneSizes = `(max-width: ${media.tablet}px) 30vw, 20vw`;
  const laptopSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`;

  const renderDetails = status => (
    <div className={styles.details}>
      <div aria-hidden className={styles.index}>
        <Divider
          notchWidth="64px"
          notchHeight="8px"
          collapsed={status !== 'entered'}
          collapseDelay={1000}
        />
        <span className={styles.indexNumber} data-status={status}>
          {indexText}
        </span>
      </div>
      <Heading
        level={3}
        as="h2"
        className={styles.title}
        data-status={status}
        id={titleId}
      >
        {title}
      </Heading>
      <Text className={styles.description} data-status={status}>
        {description}
      </Text>
      <div className={styles.button} data-status={status}>
        <Button iconHoverShift href={buttonLink} iconEnd="arrowRight">
          {buttonText}
        </Button>
      </div>
    </div>
  );

  const renderPreview = status => (
    <div className={styles.preview}>
      {model.type === 'laptop' && (
        <>
          <KatakanaProject
            className={styles.svg}
            style={cssProps({ opacity: svgOpacity })}
            data-device="laptop"
            data-status={status}
            data-light={theme.themeId === 'light'}
          />
          <Model
            className={styles.model}
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
            className={styles.svg}
            data-device="phone"
          />
          <Model
            className={styles.model}
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
      className={styles.summary}
      data-alternate={alternate}
      data-first={index === 1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        <Transition in={visible || focused} timeout={0} onEnter={reflow}>
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
