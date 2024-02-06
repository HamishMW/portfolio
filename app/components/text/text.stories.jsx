import { Text } from '~/components/text';
import { StoryContainer } from '../../../.storybook/story-container';

export default {
  title: 'Text',
};

export const size = () => (
  <StoryContainer vertical>
    <Text size="xl">XLarge</Text>
    <Text size="l">Large</Text>
    <Text size="m">Medium</Text>
    <Text size="s">Small</Text>
  </StoryContainer>
);

export const weight = () => (
  <StoryContainer vertical>
    <Text weight="regular">Regular</Text>
    <Text weight="medium">Medium</Text>
    <Text weight="bold">Bold</Text>
  </StoryContainer>
);

export const align = () => (
  <StoryContainer vertical stretch>
    <Text align="start">Start</Text>
    <Text align="center">Center</Text>
  </StoryContainer>
);
