import Input from 'components/Input';
import { useFormInput } from 'hooks';

export default {
  title: 'Input',
};

const ExampleInput = props => {
  const exampleValue = useFormInput('');
  return (
    <div style={{ maxWidth: 400, width: '100%', padding: 30 }}>
      <Input {...exampleValue} {...props} />
    </div>
  );
};

export const text = () => <ExampleInput label="Your name" type="text" />;

export const multiline = () => (
  <ExampleInput multiline label="Type a message" type="text" />
);
