import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css, keyframes } from 'styled-components/macro';
import { usePrefersReducedMotion } from '../utils/hooks';

const Loader = ({ size = 32, color = '#fff', text = 'Loading...', ...rest }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const renderScreenReaderTextPortal = () => ReactDOM.createPortal(
    <LoaderAnnouncement aria-live="assertive">{text}</LoaderAnnouncement>
  , document.body);

  if (prefersReducedMotion) {
    return (
      <LoaderText color={color} {...rest}>
        {text}
        {renderScreenReaderTextPortal()}
      </LoaderText>
    );
  }

  return (
    <LoaderContainer size={size} {...rest}>
      <LoaderSpan color={color} />
      <LoaderSpan color={color} />
      <LoaderSpan color={color} />
      <LoaderSpan color={color} />
      {renderScreenReaderTextPortal()}
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  display: flex;
  justify-content: center;
`;

const LoaderText = styled.div`
  color: ${props => props.color};
  font-size: 16px;
  font-weight: 500;
`;

const LoaderAnnouncement = styled.div`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
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
  transform: scaleY(0.4);
  opacity: 0.6;

  &:nth-child(1) {
    animation: ${css`${AnimGrow}`} 1s ease-in-out infinite;
    margin-left: 0;
  }

  &:nth-child(2) {
    animation: ${css`${AnimGrow}`} 1s ease-in-out 0.15s infinite;
  }

  &:nth-child(3) {
    animation: ${css`${AnimGrow}`} 1s ease-in-out 0.30s infinite;
  }

  &:nth-child(4) {
    animation: ${css`${AnimGrow}`} 1s ease-in-out 0.45s infinite;
  }
`;

export default Loader;
