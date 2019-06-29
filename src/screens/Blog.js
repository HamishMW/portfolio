import React, { Suspense, Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useScrollToTop } from '../utils/hooks';
import { sectionPadding, media } from '../utils/styleUtils';
import posts from '../posts';
import Post from '../screens/Post';

function PostList() {
  useScrollToTop();

  return (
    <PostListWrapper>
      <Helmet>
        <title>{`Blog | Hamish Williams Designer`}</title>
        <meta name="description" content="A collection of technical design and development articles." />
      </Helmet>
      <PostListContent>
        {posts.map(({ path, title, description }) => (
          <Link key={path} to={`/blog${path}`}>
            <h2>{title}</h2>
            <p>{description}</p>
          </Link>
        ))}
      </PostListContent>
    </PostListWrapper>
  );
}

function Blog() {
  return (
    <Post>
      <Suspense fallback={Fragment}>
        <Switch>
          {posts.map(({ content: PostComp, path, ...rest }) => (
            <Route
              key={path}
              path={`/blog${path}`}
              render={() => <PostComp {...rest} />}
            />
          ))}
          <Route component={PostList} />
        </Switch>
      </Suspense>
    </Post>
  );
}

export default Blog;

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${sectionPadding}
`;

const PostListContent = styled.div`
  max-width: ${props => props.theme.maxWidthDesktop}px;
  width: 100%;

  @media (max-width: ${media.laptop}) {
    max-width: ${props => props.theme.maxWidthLaptop}px;
  }
`;
