import React, { Suspense, Fragment, useContext } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components/macro';
import { MDXProvider } from '@mdx-js/react';
import { Helmet } from 'react-helmet-async';
import ProgressiveImage from '../components/ProgressiveImage';
import Footer from '../components/Footer';
import Divider from '../components/Divider';
import Anchor from '../components/Anchor';
import Svg from '../components/Svg';
import CodeBlock from '../components/CodeBlock';
import { media, rgba, sectionPadding } from '../utils/styleUtils';
import { useScrollToTop } from '../utils/hooks';
import posts from '../posts';
import { AppContext } from '../app/App';

const rootPath = '/blog';

function Post({
  children,
  title,
  date,
  description,
  banner,
  bannerVideo,
  bannerPlaceholder,
  bannerAlt,
  ...rest
}) {
  const { status } = useContext(AppContext);
  useScrollToTop(status);

  return (
    <PostArticle>
      <Helmet>
        <title>{`Blog | ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      <PostHeader>
        <PostHeaderText>
          <PostDate>
            <Divider />
            <span>{new Date(date).toLocaleDateString('default', { year: 'numeric', month: 'long' })}</span>
          </PostDate>
          <PostTitle>{title}</PostTitle>
          <PostBannerArrow href="#postContent" aria-label="Scroll to post content">
            <Svg icon="arrowDown" />
          </PostBannerArrow>
        </PostHeaderText>
        <PostBanner>
          <PostBannerImage
            reveal
            srcSet={banner}
            videoSrc={bannerVideo}
            placeholder={bannerPlaceholder}
            alt={bannerAlt}
          />
        </PostBanner>
      </PostHeader>
      <PostContentWrapper id="postContent">
        <PostContent>{children}</PostContent>
      </PostContentWrapper>
      <Footer />
    </PostArticle>
  );
}

function PostList() {
  const { status } = useContext(AppContext);
  useScrollToTop(status);

  return (
    <div>
      <Helmet>
        <title>{`Blog | Hamish Williams Designer`}</title>
        <meta name="description" content="A collection of technical design and development ramblings." />
      </Helmet>
      {posts.map(({ path, title, description }) => (
        <Link key={path} to={`${rootPath}${path}`}>
          <h2>{title}</h2>
          <p>{description}</p>
        </Link>
      ))}
    </div>
  );
}

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
    ${HeadingTwo} + & {
      margin-top: 22px;
    }

    & + & {
      margin-top: 18px;
    }
  }
`;

const components = {
  wrapper: Post,
  h2: HeadingTwo,
  p: Paragrapgh,
  a: Anchor,
  code: CodeBlock,
};

function Blog() {
  return (
    <MDXProvider components={components}>
      <Suspense fallback={Fragment}>
        <Switch>
          {posts.map(({ content: PostContent, path, ...rest }) => (
            <Route
              key={path}
              path={`${rootPath}${path}`}
              render={() => <PostContent {...rest} />}
            />
          ))}
          <Route component={PostList} />
        </Switch>
      </Suspense>
    </MDXProvider>
  );
}

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
  height: 80vh;

  @media (max-width: ${media.laptop}) {
    padding-left: 180px;
    grid-gap: 40px;
  }

  @media (max-width: ${media.tablet}) {
    padding-left: 160px;
    height: 40vh;
    grid-gap: 20px;
  }
`;

const PostHeaderText = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  justify-self: center;
  justify-content: center;
  flex-direction: column;
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
  }
`;

const PostTitle = styled.h1`
  font-size: 94px;
  font-weight: 600;
  line-height: 1;
  margin: 0;
  color: ${props => props.theme.colorTitle};

  @media (max-width: ${media.laptop}) {
    font-size: 64px;
  }

  @media (max-width: ${media.tablet}) {
    font-size: 48px;
  }
`;

const PostBanner = styled.div`
  justify-self: flex-end;
  width: 100%;
  height: 100%;
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
  left: 10px;
  animation-name: ${AnimMobileScrollIndicator};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  transition-timing-function: cubic-bezier(.8,.1,.27,1);

  svg {
    stroke: ${props => rgba(props.theme.colorText, 0.5)};
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

  @media (max-width: ${media.laptop}) {
    max-width: 680px;
  }
`;

export default Blog;
