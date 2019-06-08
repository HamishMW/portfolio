import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components/macro';
import { Button } from '../components/Button';
import Input from '../components/Input';
import Anchor from '../components/Anchor';
import Monogram from '../components/Monogram';
import DisplacementSphere from '../components/DisplacementSphere';
import DecoderText from '../components/DecoderText';
import { useFormInput } from '../utils/hooks';

const StoryContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
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
  .add('with text', () =>
    <StoryContainer padding={30} gutter={30}>
      <Button primary onClick={action('clicked')}>Primary</Button>
      <Button secondary onClick={action('clicked')}>Secondary</Button>
    </StoryContainer>
  )
  .add('with icon', () =>
    <StoryContainer padding={30} gutter={30}>
      <Button primary icon="send" onClick={action('clicked')}>Icon left</Button>
      <Button primary iconRight="arrowRight" onClick={action('clicked')}>Icon right</Button>
      <Button secondary icon="arrowRight" onClick={action('clicked')}>Secondary icon</Button>
      <Button secondary iconRight="arrowRight" onClick={action('clicked')}>Secondary icon right</Button>
    </StoryContainer>
  )
  .add('with loader', () =>
    <StoryContainer padding={30}>
      <LoadableButton primary>Click to load</LoadableButton>
    </StoryContainer>
  );

storiesOf('Displacement sphere', module)
  .add('sphere', () =>
    <DisplacementSphere />
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
      <Anchor href="#">I'm an anchor link</Anchor>
      <Anchor secondary href="#">Secondary link</Anchor>
    </StoryContainer>
  );

storiesOf('Monogram', module)
  .add('monogram', () =>
    <StoryContainer padding={30}>
      <Monogram />
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
