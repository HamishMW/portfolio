import React from 'react';
import Icon, { icons } from 'components/Icon';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Icon',
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
