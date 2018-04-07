import React from 'react';
import styled, { keyframes } from 'styled-components';
import HeadTag from 'react-head';

// real-human-bean.mp4

const NotFound = ({ status }) => (
  <section>
    <HeadTag tag="title">404 Not Found</HeadTag>
    <HeadTag tag="meta" name="description" content="This page doesn't exist" />
    <h1>404</h1>
    <p>Page not found</p>
  </section>
);

export default NotFound;
