import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Loader from '/components/Loader';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Loader',
  decorators: [withKnobs],
};

export const loader = () => (
  <StoryContainer padding={32}>
    <Loader size={48} />
  </StoryContainer>
);
