import Carousel from 'components/Carousel';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Carousel',
};

const placeholderImg =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAICAgICAQICAgIDAgIDAwYEAwMDAwcFBQQGCAcJCAgHCAgJCg0LCQoMCggICw8LDA0ODg8OCQsQERAOEQ0ODg7/2wBDAQIDAwMDAwcEBAcOCQgJDg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg7/wgARCAASACADAREAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAABAUHBgn/xAAZAQEAAwEBAAAAAAAAAAAAAAAFAwQGAgj/2gAMAwEAAhADEAAAAOanpHEuRHdAjSk8GcqnLA1RdO5nscBYolLViNGLY7CLKMf/xAAjEAABBAEDBAMAAAAAAAAAAAABAAIDBAUSFFETJTIzNILB/9oACAEBAAE/AIYbMngCVRZJXnDpAsndbNhXNPCezuTtPKw23ZS1PaFfmjfaIjCyU5Zj3KkepkTq5VX4CPvKynoKxwG6+w/V/8QAGxEAAwADAQEAAAAAAAAAAAAAAAECAwQRMhL/2gAIAQIBAT8AzpRBirtDxfSJxSmbGwrniNaX0u5xwVtLpJgNryyvR//EABwRAAMAAwEBAQAAAAAAAAAAAAABAgMEESEyE//aAAgBAwEBPwDXzu74U0kXsJTwzW6fhp6lRXWZ/nwvFdMxaN0Sl+Y/sSRrpcP/2Q==';

export const images = () => (
  <StoryContainer>
    <Carousel
      style={{ maxWidth: 800, width: '100%' }}
      placeholder={placeholderImg}
      images={[
        {
          src: 'https://source.unsplash.com/ANJHXftvvJ8/1280x720',
          alt: 'A neon sign with kanji',
        },
        {
          src: 'https://source.unsplash.com/qEWEz-U5p8Q/1280x720',
          alt: 'Tokyo at night',
        },
        {
          src: 'https://source.unsplash.com/lx9RWIg1Rdg/1280x720',
          alt: 'A rad cyberpunk dude',
        },
      ]}
      width={1920}
      height={1080}
    />
  </StoryContainer>
);
