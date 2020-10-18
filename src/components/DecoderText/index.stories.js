import React from 'react';
import DecoderText from 'components/DecoderText';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Decoder text',
  args: {
    text: 'Slick cyberpunk text',
  },
};

export const text = ({ text }) => (
  <StoryContainer padding={32}>
    <h2 style={{ fontWeight: 500, margin: 0 }}>
      <DecoderText delay={0} text={text} />
    </h2>
  </StoryContainer>
);
