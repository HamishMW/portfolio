import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Heading from 'components/Heading';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Heading',
  decorators: [withKnobs],
};

export const level = () => (
  <StoryContainer vertical padding={32} gutter={32}>
    <Heading level={1}>Heading 1</Heading>
    <Heading level={2}>Heading 2</Heading>
    <Heading level={3}>Heading 3</Heading>
  </StoryContainer>
);

export const weight = () => (
  <StoryContainer vertical padding={32} gutter={32}>
    <Heading level={2} weight="regular">
      Regular
    </Heading>
    <Heading level={2} weight="medium">
      Medium
    </Heading>
    <Heading level={2} weight="bold">
      Bold
    </Heading>
  </StoryContainer>
);

export const align = () => (
  <StoryContainer vertical stretch padding={32} gutter={32}>
    <Heading level={2} align="start">
      Start
    </Heading>
    <Heading level={2} align="center">
      Center
    </Heading>
  </StoryContainer>
);
