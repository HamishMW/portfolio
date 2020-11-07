import Monogram from 'components/Monogram';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Monogram',
};

export const monogram = () => (
  <StoryContainer>
    <Monogram highlight />
  </StoryContainer>
);
