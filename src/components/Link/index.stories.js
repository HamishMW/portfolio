import Link from 'components/Link';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Link',
};

export const Default = () => (
  <StoryContainer style={{ fontSize: 18 }}>
    <Link href="#" onClick={e => e.preventDefault()}>
      Primary link
    </Link>
    <Link secondary href="#" onClick={e => e.preventDefault()}>
      Secondary link
    </Link>
  </StoryContainer>
);
