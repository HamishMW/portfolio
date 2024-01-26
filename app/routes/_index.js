import { Button } from '~/components/Button';
import { Heading } from '~/components/Heading';

export const meta = () => {
  return [
    { title: 'Hamish Williams | Portfolio' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div>
      <Heading level={0} weight="bold">
        Uhh
      </Heading>
      <h1>Hello</h1>
      <Button>Ayy</Button>
      <ul>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/blog" rel="noreferrer">
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/jokes" rel="noreferrer">
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
