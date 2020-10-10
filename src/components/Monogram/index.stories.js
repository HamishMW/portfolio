import React from 'react';
import Monogram from 'components/Monogram';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Monogram',
};

export const monogram = () => (
  <StoryContainer padding={32}>
    <Monogram highlight />
  </StoryContainer>
);
