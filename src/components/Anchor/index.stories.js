import React from 'react';
import Anchor from 'components/Anchor';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Link',
};

export const anchor = () => (
  <StoryContainer padding={32} gutter={32} style={{ fontSize: 18 }}>
    <Anchor href="#" onClick={e => e.preventDefault()}>
      I'm an anchor link
    </Anchor>
    <Anchor secondary href="#" onClick={e => e.preventDefault()}>
      Secondary link
    </Anchor>
  </StoryContainer>
);
