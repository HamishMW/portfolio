import { Button } from '~/components/button';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { StoryContainer } from '../../../.storybook/story-container';

export default {
  title: 'Button',
};

const LoadableButton = props => {
  const [loading, setLoading] = useState(false);
  return <Button loading={loading} onClick={() => setLoading(!loading)} {...props} />;
};

export const Primary = () => (
  <StoryContainer>
    <Button onClick={action('clicked')}>Text only</Button>
    <Button icon="send" onClick={action('clicked')}>
      Icon left
    </Button>
    <Button iconEnd="arrow-right" onClick={action('clicked')}>
      Icon right
    </Button>
  </StoryContainer>
);

export const Secondary = () => (
  <StoryContainer>
    <Button secondary onClick={action('clicked')}>
      Text only
    </Button>
    <Button secondary icon="arrow-right" onClick={action('clicked')}>
      Icon left
    </Button>
    <Button secondary iconEnd="arrow-right" onClick={action('clicked')}>
      Icon right
    </Button>
  </StoryContainer>
);

export const IconOnly = () => (
  <StoryContainer gutter={20}>
    <Button iconOnly aria-label="Send" icon="send" onClick={action('clicked')} />
    <Button iconOnly aria-label="Figma" icon="figma" onClick={action('clicked')} />
    <Button iconOnly aria-label="Close" icon="close" onClick={action('clicked')} />
  </StoryContainer>
);

export const Loader = () => (
  <StoryContainer>
    <LoadableButton>Click to load</LoadableButton>
    <LoadableButton icon="send">Click to load</LoadableButton>
  </StoryContainer>
);
