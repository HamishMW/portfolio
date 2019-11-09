import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components/macro';
import { Button } from 'components/Button';
import Input from 'components/Input';
import Anchor from 'components/Anchor';
import Monogram from 'components/Monogram';
import DisplacementSphere from 'components/DisplacementSphere';
import DisplacementSlider from 'components/DisplacementSlider';
import DecoderText from 'components/DecoderText';
import Loader from 'components/Loader';
import { useFormInput } from 'hooks';

const StoryContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${props => props.fullWidth ? '100%' : 'max-content'};
  align-items: flex-start;
  justify-items: flex-start;

  ${props => props.padding && `
    padding: ${props.padding}px;
  `}

  ${props => props.gutter && `
    grid-gap: ${props.gutter}px;
  `}
`;

const LoadableButton = props => {
  const [loading, setLoading] = useState(false);
  return (
    <Button loading={loading} onClick={() => setLoading(!loading)} {...props} />
  );
};

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('primary', () =>
    <StoryContainer padding={30} gutter={30}>
      <Button primary onClick={action('clicked')}>Text only</Button>
      <Button primary icon="send" onClick={action('clicked')}>Icon left</Button>
      <Button primary iconRight="arrowRight" onClick={action('clicked')}>Icon right</Button>
    </StoryContainer>
  )
  .add('secondary', () =>
    <StoryContainer padding={30} gutter={30}>
      <Button secondary onClick={action('clicked')}>Text only</Button>
      <Button secondary icon="arrowRight" onClick={action('clicked')}>Icon left</Button>
      <Button secondary iconRight="arrowRight" onClick={action('clicked')}>Icon right</Button>
    </StoryContainer>
  )
  .add('icon only', () =>
    <StoryContainer padding={30} gutter={20}>
      <Button iconOnly aria-label="Send" icon="send" onClick={action('clicked')}></Button>
      <Button iconOnly aria-label="Dribbble" icon="dribbble" onClick={action('clicked')}></Button>
      <Button iconOnly aria-label="Close" icon="close" onClick={action('clicked')}></Button>
    </StoryContainer>
  )
  .add('loader', () =>
    <StoryContainer padding={30}>
      <LoadableButton primary>Click to load</LoadableButton>
    </StoryContainer>
  );

storiesOf('Displacement sphere', module)
  .add('sphere', () =>
    <StoryContainer>
      <DisplacementSphere />
    </StoryContainer>
  );

const ExampleInput = props => {
  const exampleValue = useFormInput('');
  return (
    <div style={{ maxWidth: 400, width: '100%', padding: 30 }}>
      <Input {...exampleValue} {...props} />
    </div>
  );
};

storiesOf('Link', module)
  .add('anchor', () =>
    <StoryContainer padding={30} gutter={30} style={{ fontSize: 18 }}>
      <Anchor href="#" onClick={(e) => e.preventDefault()}>I'm an anchor link</Anchor>
      <Anchor secondary href="#" onClick={(e) => e.preventDefault()}>Secondary link</Anchor>
    </StoryContainer>
  );

storiesOf('Monogram', module)
  .add('monogram', () =>
    <StoryContainer padding={30}>
      <Monogram highlight />
    </StoryContainer>
  );

storiesOf('Text input', module)
  .add('text', () =>
    <ExampleInput label="Your name" type="text" />
  )
  .add('multiline', () =>
    <ExampleInput multiline label="Type a message" type="text" />
  );

storiesOf('Decoder text', module)
  .add('text', () =>
    <StoryContainer padding={30}>
      <h2 style={{ fontWeight: 500, margin: 0 }}>
        <DecoderText start text="Slick cyberpunk text" />
      </h2>
    </StoryContainer>
  );

storiesOf('Displacement slider', module)
  .add('images', () =>
    <StoryContainer fullWidth padding={30}>
      <DisplacementSlider
        style={{ maxWidth: 800, width: '100%' }}
        placeholder="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAICAgICAQICAgIDAgIDAwYEAwMDAwcFBQQGCAcJCAgHCAgJCg0LCQoMCggICw8LDA0ODg8OCQsQERAOEQ0ODg7/2wBDAQIDAwMDAwcEBAcOCQgJDg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg7/wgARCAASACADAREAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAABAUHBgn/xAAZAQEAAwEBAAAAAAAAAAAAAAAFAwQGAgj/2gAMAwEAAhADEAAAAOanpHEuRHdAjSk8GcqnLA1RdO5nscBYolLViNGLY7CLKMf/xAAjEAABBAEDBAMAAAAAAAAAAAABAAIDBAUSFFETJTIzNILB/9oACAEBAAE/AIYbMngCVRZJXnDpAsndbNhXNPCezuTtPKw23ZS1PaFfmjfaIjCyU5Zj3KkepkTq5VX4CPvKynoKxwG6+w/V/8QAGxEAAwADAQEAAAAAAAAAAAAAAAECAwQRMhL/2gAIAQIBAT8AzpRBirtDxfSJxSmbGwrniNaX0u5xwVtLpJgNryyvR//EABwRAAMAAwEBAQAAAAAAAAAAAAABAgMEESEyE//aAAgBAwEBPwDXzu74U0kXsJTwzW6fhp6lRXWZ/nwvFdMxaN0Sl+Y/sSRrpcP/2Q=="
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

storiesOf('Loader', module)
  .add('default', () =>
    <StoryContainer padding={30}>
      <Loader size={48} />
    </StoryContainer>
  );

