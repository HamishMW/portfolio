import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Icon, { icons } from '/components/Icon';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Icon',
  decorators: [withKnobs],
};

export const Icons = () => {
  return (
    <StoryContainer padding={32} gutter={32}>
      {Object.keys(icons).map(key => (
        <Icon key={key} icon={key} />
      ))}
    </StoryContainer>
  );
};
