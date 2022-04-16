import ArrowDown from 'assets/arrow-down.svg';
import { Code } from 'components/Code';
import { Divider } from 'components/Divider';
import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { tokens } from 'components/ThemeProvider/theme';
import { useWindowSize } from 'hooks';
import RouterLink from 'next/link';
import { Children, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { cssProps, msToNum, numToMs } from 'utils/style';
import { media } from 'utils/style';
import { reflow } from 'utils/transition';
import styles from './Post.module.css';

export const Post = ({
  children,
  title,
  date,
  description,
  banner,
  bannerPlaceholder,
  bannerAlt,
  readTime,
}) => {
  const windowSize = useWindowSize();
  const contentRef = useRef();

  const handleScrollIndicatorClick = event => {
    event.preventDefault();

    window.scrollTo({
      top: contentRef.current.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <article className={styles.post}>
      <Meta title={title} prefix="Articles" description={description} />
      <header className={styles.header}>
        <div className={styles.headerText}>
          <Transition appear in timeout={msToNum(tokens.base.durationM)} onEnter={reflow}>
            {status => (
              <div className={styles.date}>
                <Divider
                  notchWidth={windowSize.width > media.mobile ? '90px' : '60px'}
                  notchHeight={windowSize.width > media.mobile ? '10px' : '8px'}
                  collapsed={status !== 'entered'}
                />
                <span className={styles.dateText} data-status={status}>
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
          <div className={styles.bannerReadTime}>{readTime}</div>
        </div>
        <div className={styles.banner}>
          <Image
            reveal
            delay={600}
            className={styles.bannerImage}
            src={banner ? banner : undefined}
            placeholder={{ src: bannerPlaceholder }}
            alt={bannerAlt}
          />
        </div>
      </header>
      <Section className={styles.contentWrapper} id="postContent" ref={contentRef}>
        <div className={styles.content}>{children}</div>
      </Section>
      <Footer />
    </article>
  );
};

const PostH1 = ({ children, ...rest }) => (
  <Heading className={styles.h1} level={2} as="h1" {...rest}>
    {children}
  </Heading>
);

const PostH2 = ({ children, ...rest }) => (
  <Heading className={styles.h2} level={3} as="h2" {...rest}>
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

const PostLink = ({ ...props }) => <Link {...props} />;

export const postComponents = {
  h1: PostH1,
  h2: PostH2,
  p: PostParagraph,
  img: PostImage,
  a: PostLink,
  pre: Code,
  inlineCode: PostCode,
};
