import React from 'react';
import Text from 'components/Text';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Text',
};

export const size = () => (
  <StoryContainer vertical padding={32} gutter={32}>
    <Text size="xl">XLarge</Text>
    <Text size="l">Large</Text>
    <Text size="m">Medium</Text>
    <Text size="s">Small</Text>
  </StoryContainer>
);

export const weight = () => (
  <StoryContainer vertical padding={32} gutter={32}>
    <Text weight="regular">Regular</Text>
    <Text weight="medium">Medium</Text>
    <Text weight="bold">Bold</Text>
  </StoryContainer>
);

export const align = () => (
  <StoryContainer vertical stretch padding={32} gutter={32}>
    <Text align="start">Start</Text>
    <Text align="center">Center</Text>
  </StoryContainer>
);
