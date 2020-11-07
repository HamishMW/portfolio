import { useState } from 'react';
import { StoryContainer } from '../../../.storybook/StoryContainer';
import SegmentedControl, { SegmentedControlOption } from 'components/SegmentedControl';

export default {
  title: 'SegmentedControl',
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
};

function DemoSegmentedControl({ options, ...rest }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <SegmentedControl currentIndex={currentIndex} onChange={setCurrentIndex} {...rest}>
      {options?.map((option, index) => (
        <SegmentedControlOption key={`${option}-${index}`}>
          {option}
        </SegmentedControlOption>
      ))}
    </SegmentedControl>
  );
}

export const segmentedControl = ({ options }) => (
  <StoryContainer>
    <DemoSegmentedControl options={options} />
  </StoryContainer>
);
