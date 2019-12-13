import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Loader from 'components/Loader';
import { StoryContainer } from './StoryContainer';

export default {
  title: 'Loader',
  decorators: [withKnobs],
};

export const loader = () => (
  <StoryContainer padding={30}>
    <Loader size={48} />
  </StoryContainer>
);
