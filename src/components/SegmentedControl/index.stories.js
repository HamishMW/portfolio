import React, { useState } from 'react';
import { StoryContainer } from '../../../.storybook/StoryContainer';
import SegmentedControl, { SegmentedControlOption } from 'components/SegmentedControl';

export default {
  title: 'SegmentedControl',
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
};

function DemoSegmentedControl({ options }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <SegmentedControl currentIndex={currentIndex} onChange={setCurrentIndex}>
      {options?.map((option, index) => (
        <SegmentedControlOption key={`${option}-${index}`}>
          {option}
        </SegmentedControlOption>
      ))}
    </SegmentedControl>
  );
}

export const segmentedControl = ({ options }) => (
  <StoryContainer padding={32} gutter={32}>
    <DemoSegmentedControl options={options} />
  </StoryContainer>
);
