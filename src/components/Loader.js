import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loader = ({ size, color, style, className }) => (
  <LoaderContainer size={size} style={style} className={className}>
    <LoaderSpan color={color} />
    <LoaderSpan color={color} />
    <LoaderSpan color={color} />
    <LoaderSpan color={color} />
  </LoaderContainer>
);

const LoaderContainer = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  display: flex;
  justify-content: center;
`;

const AnimGrow = keyframes`
  0%, 100% {
    transform: scaleY(0.4);
    opacity: 0.6;
  }

  50% {
    transform: scaleY(0.8);
    opacity: 1;
  }
`;

const LoaderSpan = styled.span`
  display: block;
  width: 4px;
  margin-left: 2px;
  height: 100%;
  background-color: ${props => props.color};

  &:nth-child(1) {
    animation: ${AnimGrow} 1s ease-in-out infinite;
    margin-left: 0;
  }

  &:nth-child(2) {
    animation: ${AnimGrow} 1s ease-in-out 0.15s infinite;
  }

  &:nth-child(3) {
    animation: ${AnimGrow} 1s ease-in-out 0.30s infinite;
  }

  &:nth-child(4) {
    animation: ${AnimGrow} 1s ease-in-out 0.45s infinite;
  }
`;

export default Loader;
