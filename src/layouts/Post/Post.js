import ArrowDown from 'assets/arrow-down.svg';
import { Code } from 'components/Code';
import { Divider } from 'components/Divider';
import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Icon } from 'components/Icon';
import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { tokens } from 'components/ThemeProvider/theme';
import { Transition } from 'components/Transition';
import { useScrollToHash, useWindowSize } from 'hooks';
import RouterLink from 'next/link';
import { Children } from 'react';
import { classes, cssProps, msToNum, numToMs } from 'utils/style';
import { media } from 'utils/style';
import styles from './Post.module.css';

export const Post = ({
  children,
  title,
  date,
  description,
  banner,
  bannerPlaceholder,
  bannerAlt,
  timecode,
}) => {
  const windowSize = useWindowSize();
  const scrollToHash = useScrollToHash();

  const handleScrollIndicatorClick = event => {
    event.preventDefault();
    scrollToHash(event.currentTarget.href);
  };

  return (
    <article className={styles.post}>
      <Meta title={title} prefix="" description={description} />
      <header className={styles.header}>
        <div className={styles.headerText}>
          <Transition in timeout={msToNum(tokens.base.durationM)}>
            {visible => (
              <div className={styles.date}>
                <Divider
                  notchWidth={windowSize.width > media.mobile ? '90px' : '60px'}
                  notchHeight={windowSize.width > media.mobile ? '10px' : '8px'}
                  collapsed={!visible}
                />
                <span className={styles.dateText} data-visible={visible}>
                  {new Date(date).toLocaleDateString('default', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
            )}
          </Transition>
          <Heading level={1} weight="bold" className={styles.title} aria-label={title}>
            {title.split(' ').map((word, index) => (
              <span className={styles.titleWordWrapper} key={`${word}-${index}`}>
                <span
                  className={styles.titleWord}
                  style={cssProps({ delay: numToMs(index * 120 + 200) })}
                  index={index}
                >
                  {word}
                  {index !== title.split(' ').length - 1 ? '\u00a0' : ''}
                </span>
              </span>
            ))}
          </Heading>
          <RouterLink href="#postContent">
            <a
              className={styles.bannerArrow}
              aria-label="Scroll to post content"
              onClick={handleScrollIndicatorClick}
            >
              <ArrowDown aria-hidden />
            </a>
          </RouterLink>
          <div className={styles.bannerReadTime}>{timecode}</div>
        </div>
        {banner && (
          <div className={styles.banner}>
            <Image
              reveal
              delay={600}
              className={styles.bannerImage}
              src={{ src: banner }}
              placeholder={{ src: bannerPlaceholder }}
              alt={bannerAlt}
            />
          </div>
        )}
      </header>
      <Section className={styles.contentWrapper} id="postContent" tabIndex={-1}>
        <div className={styles.content}>{children}</div>
      </Section>
      <Footer />
    </article>
  );
};

const PostHeading = ({ id, children, className, label }) => {
  return (
    <span className={classes(styles.heading, className)}>
      <a
        className={styles.headingLink}
        href={`#${id}`}
        aria-label={`Link to heading: ${label}`}
      >
        <Icon icon="link" />
      </a>
      {children}
    </span>
  );
};

const PostH1 = ({ children, id, ...rest }) => (
  <PostHeading className={styles.h1} id={id} label={children}>
    <Heading className={styles.headingElement} id={id} level={2} as="h1" {...rest}>
      {children}
    </Heading>
  </PostHeading>
);

const PostH2 = ({ children, id, ...rest }) => (
  <PostHeading className={styles.h2} id={id} label={children}>
    <Heading className={styles.headingElement} id={id} level={3} as="h2" {...rest}>
      {children}
    </Heading>
  </PostHeading>
);

const PostH3 = ({ children, id, ...rest }) => (
  <PostHeading className={styles.h2} id={id} label={children}>
    <Heading
      className={styles.headingElement}
      id={id}
      level={4}
      as="h3"
      weight="regular"
      {...rest}
    >
      {children}
    </Heading>
  </PostHeading>
);

const PostParagraph = ({ children, ...rest }) => {
  const hasSingleChild = Children.count(children) === 1;
  const firstChild = Children.toArray(children)[0];

  // Prevent `img` being wrapped in `p`
  if (hasSingleChild && firstChild.type === PostImage) {
    return children;
  }

  return (
    <Text className={styles.paragraph} size="l" {...rest}>
      {children}
    </Text>
  );
};

const PostImage = ({ src, alt, width, height, ...rest }) => {
  return (
    <img
      className={styles.image}
      src={src}
      decoding="async"
      loading="lazy"
      alt={alt}
      width={width}
      height={height}
      {...rest}
    />
  );
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

const PostLink = ({ ...props }) => <Link {...props} />;

export const postComponents = {
  h1: PostH1,
  h2: PostH2,
  h3: PostH3,
  p: PostParagraph,
  img: PostImage,
  a: PostLink,
  pre: PostPre,
  code: PostCode,
};
