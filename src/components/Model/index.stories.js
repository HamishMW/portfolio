import React from 'react';
import Model from 'components/Model';
import { StoryContainer } from '../../../.storybook/StoryContainer';
import deviceModels from './deviceModels';
import phoneTexturePlaceholder from 'assets/gamestack-login-placeholder.png';
import phoneTexture from 'assets/gamestack-login.png';
import phoneTextureLarge from 'assets/gamestack-login-large.png';
import phoneTexture2Placeholder from 'assets/gamestack-list-placeholder.png';
import phoneTexture2 from 'assets/gamestack-list.png';
import phoneTexture2Large from 'assets/gamestack-list-large.png';
import laptopTexturePlaceholder from 'assets/spr-builder-large.png';
import laptopTexture from 'assets/spr-builder-large.png';
import laptopTextureLarge from 'assets/spr-builder-large.png';

export default {
  title: 'Model',
};

const modelStyle = { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 };

export const phone = () => (
  <StoryContainer fullWidth padding={32}>
    <Model
      style={modelStyle}
      cameraPosition={[0, 0, 10]}
      alt="Phone models"
      models={[
        {
          ...deviceModels.phone,
          position: { x: -0.6, y: 0.8, z: -0.2 },
          texture: {
            src: phoneTexture,
            srcSet: `${phoneTexture} 800w, ${phoneTextureLarge} 1440w`,
            placeholder: phoneTexturePlaceholder,
          },
        },
        {
          ...deviceModels.phone,
          position: { x: 0.6, y: -0.8, z: 0.2 },
          texture: {
            src: phoneTexture2,
            srcSet: `${phoneTexture2} 800w, ${phoneTexture2Large} 1440w`,
            placeholder: phoneTexture2Placeholder,
          },
        },
      ]}
    />
  </StoryContainer>
);

export const laptop = () => (
  <StoryContainer fullWidth padding={32}>
    <Model
      style={modelStyle}
      cameraPosition={[0, 0, 8]}
      alt="Laptop model"
      models={[
        {
          ...deviceModels.laptop,
          texture: {
            src: laptopTexture,
            srcSet: `${laptopTexture} 800w, ${laptopTextureLarge} 1440w`,
            placeholder: laptopTexturePlaceholder,
          },
        },
      ]}
    />
  </StoryContainer>
);
