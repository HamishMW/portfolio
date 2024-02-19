import { Image } from '~/components/image';
import { StoryContainer } from '../../../.storybook/story-container';

export default {
  title: 'Image',
};

const imageData = {
  alt: 'An abstract purple and pink neon thing',
  src: '/static/modern-styling-in-react-banner.jpg',
  width: 960,
  height: 540,
  placeholder: '/static/modern-styling-in-react-banner-placeholder.jpg',
};

const Story = args => (
  <StoryContainer>
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0px, 960px)' }}>
      <Image alt="An abstract purple and pink neon thing" {...imageData} {...args} />
    </div>
  </StoryContainer>
);

export const Default = Story.bind({});

Default.args = {
  ...imageData,
};

export const Reveal = Story.bind({});

Reveal.args = {
  ...imageData,
  reveal: true,
};
