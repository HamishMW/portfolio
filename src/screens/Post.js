import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import styled, { keyframes } from 'styled-components/macro';
import Footer from '../components/Footer';
import Divider from '../components/Divider';
import Svg from '../components/Svg';
import { media, rgba, sectionPadding, AnimFade } from '../utils/styleUtils';
import { useWindowSize, useScrollToTop } from '../utils/hooks';
import ProgressiveImage from '../components/ProgressiveImage';
import GothamBold from '../fonts/gotham-bold.woff2';
import { Helmet } from 'react-helmet-async';
import { MDXProvider } from '@mdx-js/react';
import Anchor from '../components/Anchor';
import CodeBlock from '../components/CodeBlock';

const prerender = navigator.userAgent === 'ReactSnap';

function PostWrapper({
  children,
  title,
  date,
  description,
  banner,
  bannerVideo,
  bannerPlaceholder,
  bannerAlt,
  readTime,
  ...rest
}) {
  const windowSize = useWindowSize();
  useScrollToTop();
  const contentRef = useRef();

  const handleScrollIndicatorClick = (event) => {
    event.preventDefault();

    window.scrollTo({
      top: contentRef.current.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  console.log(rest);

  return (
    <PostArticle>
      <Helmet>
        <title>{`Blog | ${title}`}</title>
        <meta name="description" content={description} />
        <style>
          {`
            @font-face {
              font-family: 'Gotham';
              font-weight: 600;
              src: url(${GothamBold}) format('woff2');
              font-display: swap;
            }
          `}
        </style>
      </Helmet>
      <PostHeader>
        <PostHeaderText>
          <Transition
            appear
            in={!prerender}
            timeout={400}
            onEnter={node => node && node.offsetHeight}
          >
            {status => (
              <PostDate>
                <Divider
                  notchWidth={windowSize.width > media.numMobile ? '90px' : '60px'}
                  notchHeight={windowSize.width > media.numMobile ? '10px' : '8px'}
                  collapsed={status !== 'entered'}
                />
                <PostDateText status={status}>
                  {new Date(date).toLocaleDateString('default', { year: 'numeric', month: 'long' })}
                </PostDateText>
              </PostDate>
            )}
          </Transition>
          <PostTitle aria-label={title}>
            {title.split(' ').map((word, index) => (
              <PostTitleWordWrapper key={`${word}-${index}`}>
                <PostTitleWord index={index}>
                  {word}{index !== title.split(' ').length - 1 ? '\u00a0' : ''}
                </PostTitleWord>
              </PostTitleWordWrapper>
            ))}
          </PostTitle>
          <PostBannerArrow
            href="#postContent"
            aria-label="Scroll to post content"
            onClick={handleScrollIndicatorClick}
          >
            <Svg icon="arrowDown" />
          </PostBannerArrow>
          <PostBannerReadTime>{readTime}</PostBannerReadTime>
        </PostHeaderText>
        <PostBanner>
          <PostBannerImage
            reveal
            srcSet={banner ? require(`../posts/assets/${banner}`) : undefined}
            videoSrc={bannerVideo ? require(`../posts/assets/${bannerVideo}`) : undefined}
            placeholder={require(`../posts/assets/${bannerPlaceholder}`)}
            alt={bannerAlt}
          />
        </PostBanner>
      </PostHeader>
      <PostContentWrapper id="postContent" ref={contentRef}>
        <PostContent>{children}</PostContent>
      </PostContentWrapper>
      <Footer />
    </PostArticle>
  );
}

function imageFactory({ src, ...props }) {
  if (!src.startsWith('http')) {
    return (
      <Image {...props} src={require(`../posts/assets/${src}`)} />
    );
  }

  return <Image {...props} src={src} />;
};

function Post({ children }) {
  return (
    <MDXProvider components={{
      wrapper: PostWrapper,
      h2: HeadingTwo,
      p: Paragrapgh,
      img: imageFactory,
      a: (props) => <Anchor target="_blank" {...props} />,
      code: CodeBlock,
      inlineCode: InlineCode,
    }}>
      {children}
    </MDXProvider>
  );
}

export default Post;

const PostArticle = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const PostHeader = styled.header`
  padding-left: 300px;
  display: grid;
  grid-template-columns: calc(50% - 40px) 1fr;
  grid-gap: 80px;
  align-items: center;
  min-height: 80vh;

  @media (max-width: 1600px) {
    padding-left: 200px;
    grid-gap: 60px;
  }

  @media (max-width: ${media.laptop}) {
    padding-left: 180px;
    grid-gap: 40px;
    min-height: 70vh;
  }

  @media (max-width: ${media.tablet}) {
    padding-left: 160px;
    min-height: 40vh;
    grid-gap: 20px;
  }

  @media (max-height: 696px) {
    padding-left: 100px;
  }

  @media (max-width: ${media.mobile}), ${media.mobileLS} {
    grid-template-columns: 100%;
    grid-gap: 20px;
    height: auto;
    padding-right: 20px;
    padding-left: 20px;
  }
`;

const PostHeaderText = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-self: flex-end;
  justify-content: center;
  flex-direction: column;
  padding: 60px 0 80px;
  max-width: 800px;

  @media (max-width: ${media.mobile}), ${media.mobileLS} {
    padding: 100px 0 0;
  }
`;

const PostDate = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 60px;
  color: ${props => props.theme.colorPrimary};
  display: grid;
  grid-template-columns: 140px 1fr;
  grid-gap: 20px;
  align-items: center;

  @media (max-width: ${media.tablet}) {
    margin-bottom: 30px;
    grid-gap: 10px;
  }

  @media (max-width: ${media.mobile}) {
    grid-template-columns: 100px 1fr;
  }
`;

const PostDateText = styled.span`
  opacity: ${props => props.status === 'entered' ? 1 : 0};
  transform: ${props => props.status === 'entered' ? 'none' : 'translate3d(-5%, 0, 0)'};
  transition: opacity 0.8s ease, transform 0.8s ${props => props.theme.curveFastoutSlowin};
`;

const PostTitle = styled.h1`
  font-size: 94px;
  font-weight: 600;
  line-height: 1.1;
  margin: 0;
  color: ${props => props.theme.colorTitle};

  @media (max-width: 1600px) {
    font-size: 80px;
  }

  @media (max-width: ${media.laptop}) {
    font-size: 64px;
  }

  @media (max-width: ${media.tablet}) {
    font-size: 42px;
  }

  @media (max-width: ${media.mobile}) {
    font-size: 36px;
  }
`;

const AnimPostTitleWord = keyframes`
  from {
    transform: translate3d(0, 110%, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`;

const PostTitleWordWrapper = styled.span`
  overflow: hidden;
  position: relative;
  display: inline-flex;
`;

const PostTitleWord = styled.span`
  transform: translate3d(0, 110%, 0);
  animation-name: ${AnimPostTitleWord};
  animation-timing-function: ${props => props.theme.curveFastoutSlowin};
  animation-duration: 1.2s;
  animation-delay: ${props => props.index * 120}ms;
  animation-fill-mode: forwards;
  display: inline-flex;

  @media (prefers-reduced-motion: reduce) {
    transform: none;
  }
`;

const PostBanner = styled.div`
  justify-self: flex-end;
  width: 100%;
  height: 100%;

  @media (max-width: ${media.mobile}) {
    min-height: 40vh;
  }
`;

const PostBannerImage = styled(ProgressiveImage)`
  height: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 28px 100%, 0 calc(100% - 28px));

  img,
  video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const AnimMobileScrollIndicator = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const PostBannerArrow = styled.a`
  position: absolute;
  bottom: 0;
  left: -10px;
  padding: 20px;
  animation-name: ${AnimFade};
  animation-timing-function: ${props => props.theme.curveFastoutSlowin};
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  animation-delay: 1s;
  opacity: 0;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }

  svg {
    stroke: ${props => rgba(props.theme.colorText, 0.5)};
    animation-name: ${AnimMobileScrollIndicator};
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    transition-timing-function: cubic-bezier(.8,.1,.27,1);
  }

  @media (max-width: ${media.tablet}) {
    left: -20px;
  }

  @media (max-width: ${media.mobile}) {
    position: relative;
    margin-top: 20px;
    align-self: flex-start;
  }
`;

const PostBannerReadTime = styled.div`
  color: ${props => rgba(props.theme.colorText, 0.6)};
  font-size: 16px;
  position: absolute;
  bottom: 10px;
  right: 0;
  padding: 20px 0;
  display: grid;
  align-items: center;
  grid-template-columns: 60px 1fr;
  grid-gap: 10px;
  animation-name: ${AnimFade};
  animation-timing-function: ${props => props.theme.curveFastoutSlowin};
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  animation-delay: 1s;
  opacity: 0;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }

  &::before {
    content: '';
    height: 2px;
    background: ${props => rgba(props.theme.colorText, 0.4)};
    display: block;
  }
`;

const PostContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${sectionPadding}
`;

const PostContent = styled.div`
  max-width: 800px;
  width: 100%;
  align-self: center;
  margin-top: 120px;
  animation-name: ${AnimFade};
  animation-timing-function: ${props => props.theme.curveFastoutSlowin};
  animation-duration: 1.2s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  opacity: 0;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }

  @media (max-width: ${media.laptop}) {
    max-width: 680px;
    margin-top: 80px;
  }

  @media (max-width: ${media.tablet}) {
    margin-top: 70px;
  }

  @media (max-width: ${media.mobile}) {
    margin-top: 60px;
  }
`;

const HeadingTwo = styled.h2`
  color: ${props => props.theme.colorTitle};
  margin: 0;
  font-size: 42px;

  @media (max-width: ${media.laptop}) {
    font-size: 34px;
  }

  @media (max-width: ${media.tablet}) {
    font-size: 24px;
  }

  @media (max-width: ${media.mobile}) {
    font-size: 22px;
  }
`;

const Paragrapgh = styled.p`
  color: ${props => rgba(props.theme.colorText, 0.8)};
  margin: 0;
  font-size: 24px;
  line-height: 1.5;

  ${HeadingTwo} + & {
    margin-top: 34px;
  }

  & + & {
    margin-top: 26px;
  }

  @media (max-width: ${media.laptop}) {
    font-size: 20px;

    ${HeadingTwo} + & {
      margin-top: 24px;
    }

    & + & {
      margin-top: 20px;
    }
  }

  @media (max-width: ${media.tablet}) {
    ${HeadingTwo} + & {
      margin-top: 22px;
    }
  }

  @media (max-width: ${media.mobile}) {
    font-size: 18px;
    hyphens: auto;

    ${HeadingTwo} + & {
      margin-top: 22px;
    }

    & + & {
      margin-top: 18px;
    }
  }
`;

const Image = styled.img`
  display: block;
  margin: 60px 0;
  max-width: 100%;
  height: auto;
`;

const InlineCode = styled.code`
  color: ${props => rgba(props.theme.colorText, 0.6)};
  background: ${props => rgba(props.theme.colorText, 0.1)};
  padding: 0.1em 0.3em;
  font-family: ${props => props.theme.monoFontStack};
`;
