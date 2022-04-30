import { SegmentedControl, SegmentedControlOption } from 'components/SegmentedControl';
import { useState } from 'react';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'SegmentedControl',
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
};

function Story({ options, ...args }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <StoryContainer>
      <SegmentedControl currentIndex={currentIndex} onChange={setCurrentIndex} {...args}>
        {options?.map((option, index) => (
          <SegmentedControlOption key={`${option}-${index}`}>
            {option}
          </SegmentedControlOption>
        ))}
      </SegmentedControl>
    </StoryContainer>
  );
}

export const Default = Story.bind({});
