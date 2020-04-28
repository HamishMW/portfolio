import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Carousel from 'components/Carousel';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Displacement carousel',
  decorators: [withKnobs],
};

const placeholderImg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAICAgICAQICAgIDAgIDAwYEAwMDAwcFBQQGCAcJCAgHCAgJCg0LCQoMCggICw8LDA0ODg8OCQsQERAOEQ0ODg7/2wBDAQIDAwMDAwcEBAcOCQgJDg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg7/wgARCAASACADAREAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAABAUHBgn/xAAZAQEAAwEBAAAAAAAAAAAAAAAFAwQGAgj/2gAMAwEAAhADEAAAAOanpHEuRHdAjSk8GcqnLA1RdO5nscBYolLViNGLY7CLKMf/xAAjEAABBAEDBAMAAAAAAAAAAAABAAIDBAUSFFETJTIzNILB/9oACAEBAAE/AIYbMngCVRZJXnDpAsndbNhXNPCezuTtPKw23ZS1PaFfmjfaIjCyU5Zj3KkepkTq5VX4CPvKynoKxwG6+w/V/8QAGxEAAwADAQEAAAAAAAAAAAAAAAECAwQRMhL/2gAIAQIBAT8AzpRBirtDxfSJxSmbGwrniNaX0u5xwVtLpJgNryyvR//EABwRAAMAAwEBAQAAAAAAAAAAAAABAgMEESEyE//aAAgBAwEBPwDXzu74U0kXsJTwzW6fhp6lRXWZ/nwvFdMxaN0Sl+Y/sSRrpcP/2Q==';

export const images = () => (
  <StoryContainer fullWidth padding={30}>
    <Carousel
      style={{ maxWidth: 800, width: '100%' }}
      placeholder={placeholderImg}
      images={[
        {
          src: 'https://source.unsplash.com/EYmhcdGuYmI/1280x720',
          alt: 'Tokyo at night',
        },
        {
          src: 'https://source.unsplash.com/fs9hGJUevXY/1280x720',
          alt: 'A cool cyberpunk cityscape'
        },
        {
          src: 'https://source.unsplash.com/ANJHXftvvJ8/1280x720',
          alt: 'A neon sign with kanji'
        }
      ]}
      width={1920}
      height={1080}
    />
  </StoryContainer>
);
