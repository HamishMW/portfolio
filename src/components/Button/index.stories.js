import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { Button } from 'components/Button';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Button',
  decorators: [withKnobs],
};

const LoadableButton = props => {
  const [loading, setLoading] = useState(false);
  return <Button loading={loading} onClick={() => setLoading(!loading)} {...props} />;
};

export const primary = () => (
  <StoryContainer padding={32} gutter={32}>
    <Button primary onClick={action('clicked')}>
      Text only
    </Button>
    <Button primary icon="send" onClick={action('clicked')}>
      Icon left
    </Button>
    <Button primary iconRight="arrowRight" onClick={action('clicked')}>
      Icon right
    </Button>
  </StoryContainer>
);

export const secondary = () => (
  <StoryContainer padding={32} gutter={32}>
    <Button secondary onClick={action('clicked')}>
      Text only
    </Button>
    <Button secondary icon="arrowRight" onClick={action('clicked')}>
      Icon left
    </Button>
    <Button secondary iconRight="arrowRight" onClick={action('clicked')}>
      Icon right
    </Button>
  </StoryContainer>
);

export const iconOnly = () => (
  <StoryContainer padding={32} gutter={20}>
    <Button iconOnly aria-label="Send" icon="send" onClick={action('clicked')}></Button>
    <Button
      iconOnly
      aria-label="Dribbble"
      icon="dribbble"
      onClick={action('clicked')}
    ></Button>
    <Button iconOnly aria-label="Close" icon="close" onClick={action('clicked')}></Button>
  </StoryContainer>
);

export const loader = () => (
  <StoryContainer padding={32}>
    <LoadableButton primary>Click to load</LoadableButton>
  </StoryContainer>
);
