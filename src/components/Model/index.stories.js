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

export const phone = () => (
  <StoryContainer fullWidth padding={32}>
    <Model
      enableControls
      cameraPosition={[0, 0, 8]}
      models={[
        {
          ...deviceModels.phone,
          position: { x: -0.6, y: 0.8, z: -0.2 },
          texture: {
            large: phoneTextureLarge,
            medium: phoneTexture,
            placeholder: phoneTexturePlaceholder,
          },
        },
        {
          ...deviceModels.phone,
          position: { x: 0.6, y: -0.8, z: 0.2 },
          texture: {
            large: phoneTexture2Large,
            medium: phoneTexture2,
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
      enableControls
      cameraPosition={[0, 0, 6]}
      models={[
        {
          ...deviceModels.laptop,
          texture: {
            large: laptopTextureLarge,
            medium: laptopTexture,
            placeholder: laptopTexturePlaceholder,
          },
        },
      ]}
    />
  </StoryContainer>
);
