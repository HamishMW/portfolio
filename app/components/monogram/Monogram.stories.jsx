import { Monogram } from '~/components/monogram';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Monogram',
};

export const Default = () => (
  <StoryContainer>
    <Monogram highlight />
  </StoryContainer>
);
