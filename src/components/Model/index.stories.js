import React from 'react';
import Model from 'components/Model';
import { StoryContainer } from '../../../.storybook/StoryContainer';
import deviceModels from './deviceModels';
import phoneTexture from 'assets/gamestack-login-large.png';
import phoneTexture2 from 'assets/gamestack-list-large.png';
import laptopTexture from 'assets/spr-builder-large.png';

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
          texture: phoneTexture,
        },
        {
          ...deviceModels.phone,
          position: { x: 0.6, y: -0.8, z: 0.2 },
          texture: phoneTexture2,
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
          texture: laptopTexture,
        },
      ]}
    />
  </StoryContainer>
);
