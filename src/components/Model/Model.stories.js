import phoneTexture2Large from 'assets/gamestack-list-large.jpg';
import phoneTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
import phoneTexture2 from 'assets/gamestack-list.jpg';
import phoneTextureLarge from 'assets/gamestack-login-large.jpg';
import phoneTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
import phoneTexture from 'assets/gamestack-login.jpg';
import laptopTexture from 'assets/spr-lesson-builder-dark-large.jpg';
import laptopTextureLarge from 'assets/spr-lesson-builder-dark-large.jpg';
import laptopTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import { Model } from 'components/Model/Model';
import { StoryContainer } from '../../../.storybook/StoryContainer';
import { deviceModels } from './deviceModels';

export default {
  title: 'Model',
};

const modelStyle = { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 };

export const phone = () => (
  <StoryContainer padding={0}>
    <Model
      style={modelStyle}
      cameraPosition={{ x: 0, y: 0, z: 11.5 }}
      alt="Phone models"
      models={[
        {
          ...deviceModels.phone,
          position: { x: -0.6, y: 0.8, z: 0.1 },
          texture: {
            src: phoneTexture.src,
            srcSet: `${phoneTexture.src} 800w, ${phoneTextureLarge.src} 1440w`,
            placeholder: phoneTexturePlaceholder.src,
          },
        },
        {
          ...deviceModels.phone,
          position: { x: 0.6, y: -0.8, z: 0.4 },
          texture: {
            src: phoneTexture2.src,
            srcSet: `${phoneTexture2.src} 800w, ${phoneTexture2Large.src} 1440w`,
            placeholder: phoneTexture2Placeholder.src,
          },
        },
      ]}
    />
  </StoryContainer>
);

export const laptop = () => (
  <StoryContainer padding={0}>
    <Model
      style={modelStyle}
      cameraPosition={{ x: 0, y: 0, z: 8 }}
      alt="Laptop model"
      models={[
        {
          ...deviceModels.laptop,
          position: { x: 0, y: 0, z: 0 },
          texture: {
            src: laptopTexture.src,
            srcSet: `${laptopTexture.src} 800w, ${laptopTextureLarge.src} 1440w`,
            placeholder: laptopTexturePlaceholder.src,
          },
        },
      ]}
    />
  </StoryContainer>
);
