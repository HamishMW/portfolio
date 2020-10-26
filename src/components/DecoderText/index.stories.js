import DecoderText from 'components/DecoderText';
import { StoryContainer } from '../../../.storybook/StoryContainer';
import Heading from 'components/Heading';

export default {
  title: 'Decoder text',
  args: {
    text: 'Slick cyberpunk text',
  },
};

export const text = ({ text }) => (
  <StoryContainer padding={32}>
    <Heading level={3}>
      <DecoderText delay={0} text={text} />
    </Heading>
  </StoryContainer>
);
