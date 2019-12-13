import React from 'react';
import DisplacementSphere from 'components/DisplacementSphere';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryContainer } from './StoryContainer';

export default {
  title: 'Displacement sphere',
  decorators: [withKnobs],
};

export const sphere = () => (
  <StoryContainer>
    <DisplacementSphere />
  </StoryContainer>
);
