import { Image } from 'components/Image';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Image',
};

const imageData = {
  src: {
    src: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1317&q=80',
    width: 1317,
    height: 878,
  },
  placeholder: {
    src: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=439&q=2',
    width: 1317,
    height: 878,
  },
};

export const image = () => (
  <StoryContainer>
    <Image alt="An abstract purple and pink neon thing" {...imageData} />
  </StoryContainer>
);

export const reveal = () => (
  <StoryContainer>
    <Image reveal alt="An abstract purple and pink neon thing" {...imageData} />
  </StoryContainer>
);
