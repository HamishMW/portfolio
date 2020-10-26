import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from 'components/Button';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Button',
};

const LoadableButton = props => {
  const [loading, setLoading] = useState(false);
  return <Button loading={loading} onClick={() => setLoading(!loading)} {...props} />;
};

export const primary = () => (
  <StoryContainer padding={32} gutter={32}>
    <Button onClick={action('clicked')}>Text only</Button>
    <Button icon="send" onClick={action('clicked')}>
      Icon left
    </Button>
    <Button iconEnd="arrowRight" onClick={action('clicked')}>
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
    <Button secondary iconEnd="arrowRight" onClick={action('clicked')}>
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
    <LoadableButton>Click to load</LoadableButton>
  </StoryContainer>
);
