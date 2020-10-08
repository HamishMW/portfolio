import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import Footer from 'components/Footer';
import Divider from 'components/Divider';
import { numToMs, msToNum } from 'utils/style';
import { useWindowSize, useScrollRestore } from 'hooks';
import Image from 'components/Image';
import GothamBold from 'assets/fonts/gotham-bold.woff2';
import { Helmet } from 'react-helmet-async';
import { MDXProvider } from '@mdx-js/react';
import Anchor from 'components/Anchor';
import Code from 'components/Code';
import { reflow } from 'utils/transition';
import prerender from 'utils/prerender';
import { media } from 'utils/style';
import { ReactComponent as ArrowDown } from 'assets/arrow-down.svg';
import { tokens } from 'app/theme';
import Section from 'components/Section';
import './index.css';
import Heading from 'components/Heading';
import Text from 'components/Text';

const PostWrapper = ({
  children,
  title,
  date,
  description,
  banner,
  bannerVideo,
  bannerPlaceholder,
  bannerAlt,
  readTime,
}) => {
  const windowSize = useWindowSize();
  const contentRef = useRef();
  useScrollRestore();

  const handleScrollIndicatorClick = event => {
    event.preventDefault();

    window.scrollTo({
      top: contentRef.current.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <article className="post">
      <Helmet>
        <title>{`Articles | ${title}`}</title>
        <meta name="description" content={description} />
        <link rel="preload" href={GothamBold} as="font" crossorigin="" />
        <style>
          {`
            @font-face {
              font-family: 'Gotham';
              font-weight: 700;
              src: url(${GothamBold}) format('woff2');
              font-display: swap;
            }
          `}
        </style>
      </Helmet>
      <header className="post__header">
        <div className="post__header-text">
          <Transition
            appear
            in={!prerender}
            timeout={msToNum(tokens.base.durationM)}
            onEnter={reflow}
          >
            {status => (
              <div className="post__date">
                <Divider
                  notchWidth={windowSize.width > media.mobile ? '90px' : '60px'}
                  notchHeight={windowSize.width > media.mobile ? '10px' : '8px'}
                  collapsed={status !== 'entered'}
                />
                <span
                  className={classNames('post__date-text', `post__date-text--${status}`)}
                >
                  {new Date(date).toLocaleDateString('default', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
            )}
          </Transition>
          <h1 className="post__title" aria-label={title}>
            {title.split(' ').map((word, index) => (
              <span className="post__title-word-wrapper" key={`${word}-${index}`}>
                <span
                  className="post__title-word"
                  style={{ '--delay': numToMs(index * 120 + 200) }}
                  index={index}
                >
                  {word}
                  {index !== title.split(' ').length - 1 ? '\u00a0' : ''}
                </span>
              </span>
            ))}
          </h1>
          <a
            className="post__banner-arrow"
            href="#postContent"
            aria-label="Scroll to post content"
            onClick={handleScrollIndicatorClick}
          >
            <ArrowDown aria-hidden />
          </a>
          <div className="post__banner-read-time">{readTime}</div>
        </div>
        <div className="post__banner">
          <Image
            reveal
            delay={600}
            className="post__banner-image"
            src={banner ? require(`posts/assets/${banner}`) : undefined}
            placeholder={require(`posts/assets/${bannerPlaceholder}`)}
            alt={bannerAlt}
          />
        </div>
      </header>
      <Section className="post__content-wrapper" id="postContent" ref={contentRef}>
        <div className="post__content">{children}</div>
      </Section>
      <Footer />
    </article>
  );
};

const PostHeadingTwo = ({ children, ...rest }) => (
  <Heading className="post__heading-two" level={2} {...rest}>
    {children}
  </Heading>
);

const PostParagraph = ({ children, ...rest }) => (
  <Text className="post__paragraph" size="l" {...rest}>
    {children}
  </Text>
);

const PostImage = ({ src, alt, ...rest }) => {
  const [size, setSize] = useState();
  const imgRef = useRef();
  const imgSrc = src.startsWith('http') ? src : require(`posts/assets/${src}`);

  useEffect(() => {
    const { width, height } = imgRef.current;

    if (width && height) {
      setSize({ width, height });
    }
  }, []);

  const handleLoad = event => {
    const { width, height } = event.target;
    setSize({ width, height });
  };

  return (
    <img
      className="post__image"
      ref={imgRef}
      src={imgSrc}
      onLoad={handleLoad}
      loading="lazy"
      decoding="async"
      alt={alt}
      width={size?.width}
      height={size?.height}
      {...rest}
    />
  );
};

const PostCode = ({ children, ...rest }) => (
  <code className="post__code" {...rest}>
    {children}
  </code>
);

const PostLink = ({ children, ...rest }) => (
  <Anchor target="_blank" {...rest}>
    {children}
  </Anchor>
);

const Post = ({ slug, content: PostContent, ...rest }) => {
  return (
    <MDXProvider
      components={{
        wrapper: PostWrapper,
        h2: PostHeadingTwo,
        p: PostParagraph,
        img: PostImage,
        a: PostLink,
        pre: Code,
        inlineCode: PostCode,
      }}
    >
      <PostContent slug={slug} {...rest} />
    </MDXProvider>
  );
};

export default Post;
