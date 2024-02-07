import { Carousel } from '~/components/carousel';
import { StoryContainer } from '../../../.storybook/story-container';

export default {
  title: 'Carousel',
};

export const Images = () => (
  <StoryContainer>
    <Carousel
      style={{ maxWidth: 800, width: '100%' }}
      placeholder="/static/modern-styling-in-react-banner-placeholder.jpg"
      images={[
        {
          src: '/static/modern-styling-in-react-banner.jpg',
          alt: 'Neon pink and blue lights',
        },
        {
          src: '/static/hello-world-banner.jpg',
          alt: 'Geometric blue shapes',
        },
        {
          src: 'https://source.unsplash.com/lx9RWIg1Rdg/1280x720',
          alt: 'Cyberpunk dude',
        },
      ]}
      width={1920}
      height={1080}
    />
  </StoryContainer>
);
