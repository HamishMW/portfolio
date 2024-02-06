import { List } from '~/components/list';
import { StoryContainer } from '../../../.storybook/story-container';
import { ListItem } from './list';

export default {
  title: 'List',
};

const Story = args => {
  return (
    <StoryContainer>
      <List {...args}>
        <ListItem>List item 1</ListItem>
        <ListItem>List item 2</ListItem>
        <ListItem>List item 3</ListItem>
      </List>
    </StoryContainer>
  );
};

export const Unordered = Story.bind({});

Unordered.args = {
  ordered: false,
};

export const Ordered = Story.bind({});

Ordered.args = {
  ordered: true,
};
