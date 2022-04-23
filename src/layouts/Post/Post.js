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
import { useParallax, useScrollToHash } from 'hooks';
import RouterLink from 'next/link';
import { Children, useRef } from 'react';
import { formateDate } from 'utils/date';
import { classes, cssProps, msToNum, numToMs } from 'utils/style';
import styles from './Post.module.css';

export const Post = ({
  children,
  title,
  date,
  abstract,
  banner,
  bannerPlaceholder,
  bannerAlt,
  timecode,
}) => {
  const scrollToHash = useScrollToHash();
  const imageRef = useRef();

  useParallax(0.08, value => {
    if (!imageRef.current) return;
    imageRef.current.style = `--blur: ${value}px`;
  });

  const handleScrollIndicatorClick = event => {
    event.preventDefault();
    scrollToHash(event.currentTarget.href);
  };

  return (
    <article className={styles.post}>
      <Meta title={title} prefix="" description={abstract} />
      <Section>
        {banner && (
          <div className={styles.banner} ref={imageRef}>
            <Image
              className={styles.bannerImage}
              src={{ src: banner }}
              placeholder={{ src: bannerPlaceholder }}
              alt={bannerAlt}
            />
          </div>
        )}
        <header className={styles.header}>
          <div className={styles.headerText}>
            <Transition in timeout={msToNum(tokens.base.durationM)}>
              {visible => (
                <div className={styles.date}>
                  <Divider notchWidth="64px" notchHeight="8px" collapsed={!visible} />
                  <Text className={styles.dateText} data-visible={visible}>
                    {formateDate(date)}
                  </Text>
                </div>
              )}
            </Transition>
            <Heading level={2} as="h1" className={styles.title} aria-label={title}>
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
            <div className={styles.headerFooter}>
              <RouterLink href="#postContent">
                <a
                  className={styles.headerArrow}
                  aria-label="Scroll to post content"
                  onClick={handleScrollIndicatorClick}
                >
                  <ArrowDown aria-hidden />
                </a>
              </RouterLink>
              <div className={styles.headerReadTime}>{timecode}</div>
            </div>
          </div>
        </header>
      </Section>
      <Section className={styles.contentWrapper} id="postContent" tabIndex={-1}>
        <div className={styles.content}>{children}</div>
      </Section>
      <Footer />
    </article>
  );
};

const PostHeading = ({ id, children, className }) => {
  return (
    <span className={classes(styles.heading, className)}>
      <a
        className={styles.headingLink}
        href={`#${id}`}
        aria-label="Link to heading"
        aria-describedby={id}
      >
        <Icon icon="link" />
      </a>
      {children}
    </span>
  );
};

const PostH1 = ({ children, id, ...rest }) => (
  <PostHeading className={styles.h1} id={id}>
    <Heading className={styles.headingElement} id={id} level={2} as="h1" {...rest}>
      {children}
    </Heading>
  </PostHeading>
);

const PostH2 = ({ children, id, ...rest }) => (
  <PostHeading className={styles.h2} id={id}>
    <Heading className={styles.headingElement} id={id} level={3} as="h2" {...rest}>
      {children}
    </Heading>
  </PostHeading>
);

const PostH3 = ({ children, id, ...rest }) => (
  <PostHeading className={styles.h2} id={id}>
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
    <Text className={styles.paragraph} size="l" {...rest} as="p">
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
