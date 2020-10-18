import React from 'react';
import Loader from 'components/Loader';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Loader',
};

export const loader = () => (
  <StoryContainer padding={32}>
    <Loader size={48} />
  </StoryContainer>
);
