import React, { lazy, Suspense, Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { MDXProvider } from '@mdx-js/react';

const TestPost = lazy(() => import('../posts/test.mdx'));

const rootPath = '/blog';
const posts = [
  {
    content: TestPost,
    path: '/test',
  },
];

function Post({ children, metadata }) {
  const { banner, title } = metadata;

  return (
    <PostArticle>
      <PostHeader>
        <PostBanner>
          <img src={banner} alt="" role="presentation" />
        </PostBanner>
        <PostTitle>{title}</PostTitle>
      </PostHeader>
      <PostContent>
        {children}
      </PostContent>
    </PostArticle>
  );
}

function PostIndex() {
  return (
    <div>
      Ello

      <div>
        {posts.map(post => (
          <Link key={post} to={`${rootPath}${post.path}`}>{post.path}</Link>
        ))}
      </div>
    </div>
  );
}

const components = {
  wrapper: Post,
};

function Blog() {
  return (
    <MDXProvider components={components}>
      <Suspense fallback={Fragment}>
        <Switch>
          {posts.map(post => (
            <Route
              key={post.path}
              path={`${rootPath}${post.path}`}
              component={post.content}
            />
          ))}
          <Route component={PostIndex} />
        </Switch>
      </Suspense>
    </MDXProvider>
  );
}

const PostArticle = styled.article`
  position: relative;
`;

const PostHeader = styled.header``;

const PostTitle = styled.h1``;

const PostBanner = styled.div``;

const PostContent = styled.div``;

export default Blog;
