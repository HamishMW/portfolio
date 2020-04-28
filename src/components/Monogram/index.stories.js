import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Monogram from 'components/Monogram';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Monogram',
  decorators: [withKnobs],
};

export const monogram = () => (
  <StoryContainer padding={30}>
    <Monogram highlight />
  </StoryContainer>
);
