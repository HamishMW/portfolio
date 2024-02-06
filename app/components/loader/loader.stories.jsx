import { Loader } from '~/components/loader';
import { StoryContainer } from '../../../.storybook/story-container';

export default {
  title: 'Loader',
};

export const Default = () => (
  <StoryContainer>
    <Loader size={48} />
  </StoryContainer>
);
