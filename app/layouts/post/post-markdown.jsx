import { Code } from '~/components/code';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Link } from '~/components/link';
import { List, ListItem } from '~/components/list';
import { Text } from '~/components/text';
import { Children } from 'react';
import styles from './post-markdown.module.css';
import { Link as RouterLink } from '@remix-run/react';

const PostHeadingLink = ({ id }) => {
  return (
    <RouterLink className={styles.headingLink} to={`#${id}`} aria-label="Link to heading">
      <Icon icon="link" />
    </RouterLink>
  );
};

const PostH1 = ({ children, id, ...rest }) => (
  <Heading className={styles.heading} id={id} level={2} as="h1" {...rest}>
    <PostHeadingLink id={id} />
    {children}
  </Heading>
);

const PostH2 = ({ children, id, ...rest }) => (
  <Heading className={styles.heading} id={id} level={3} as="h2" {...rest}>
    <PostHeadingLink id={id} />
    {children}
  </Heading>
);

const PostH3 = ({ children, id, ...rest }) => (
  <Heading className={styles.heading} id={id} level={4} as="h3" {...rest}>
    <PostHeadingLink id={id} />
    {children}
  </Heading>
);

const PostH4 = ({ children, id, ...rest }) => (
  <Heading className={styles.heading} id={id} level={5} as="h4" {...rest}>
    <PostHeadingLink id={id} />
    {children}
  </Heading>
);

const PostParagraph = ({ children, ...rest }) => {
  const hasSingleChild = Children.count(children) === 1;
  const firstChild = Children.toArray(children)[0];

  // Prevent `img` being wrapped in `p`
  if (hasSingleChild && firstChild.type === PostImage) {
    return children;
  }

  return (
    <Text className={styles.paragraph} size="l" as="p" {...rest}>
      {children}
    </Text>
  );
};

const PostLink = ({ ...props }) => <Link {...props} />;

const PostUl = props => {
  return <List className={styles.list} {...props} />;
};

const PostOl = props => {
  return <List className={styles.list} ordered {...props} />;
};

const PostLi = ({ children, ...props }) => {
  return <ListItem {...props}>{children}</ListItem>;
};

const PostCode = ({ children, ...rest }) => (
  <code className={styles.code} {...rest}>
    {children}
  </code>
);

const PostPre = props => {
  return (
    <div className={styles.pre}>
      <Code {...props} />
    </div>
  );
};

const PostBlockquote = props => {
  return <blockquote className={styles.blockquote} {...props} />;
};

const PostHr = props => {
  return <hr className={styles.hr} {...props} />;
};

const PostStrong = props => {
  return <strong className={styles.strong} {...props} />;
};

const PostImage = ({ src, alt, width, height, ...rest }) => {
  return (
    <img
      className={styles.image}
      src={src}
      loading="lazy"
      alt={alt}
      width={width}
      height={height}
      {...rest}
    />
  );
};

const Embed = ({ src }) => {
  return (
    <div className={styles.embed}>
      <iframe src={src} loading="lazy" title="Embed" />
    </div>
  );
};

export const postMarkdown = {
  h1: PostH1,
  h2: PostH2,
  h3: PostH3,
  h4: PostH4,
  p: PostParagraph,
  a: PostLink,
  ul: PostUl,
  ol: PostOl,
  li: PostLi,
  pre: PostPre,
  code: PostCode,
  blockquote: PostBlockquote,
  hr: PostHr,
  img: PostImage,
  strong: PostStrong,
  Embed,
};
