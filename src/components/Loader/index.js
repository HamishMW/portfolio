import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components/macro';
import { usePrefersReducedMotion } from 'hooks';

const Loader = ({ size = 32, color = '#fff', text = 'Loading...', ...rest }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const renderScreenReaderTextPortal = () =>
    ReactDOM.createPortal(
      <LoaderAnnouncement aria-live="assertive">{text}</LoaderAnnouncement>,
      document.body
    );

  if (prefersReducedMotion) {
    return (
      <LoaderText color={color} {...rest}>
        {text}
        {renderScreenReaderTextPortal()}
      </LoaderText>
    );
  }

  const gapSize = Math.round((size / 3) * 0.2);
  const spanSize = Math.round(size / 3 - gapSize * 2 - 1);

  return (
    <LoaderContainer aria-label={text} size={size} {...rest}>
      <LoaderSpanWrapper gapSize={gapSize} spanSize={spanSize}>
        <LoaderSpan spanColor={color} />
        <LoaderSpan spanColor={color} />
        <LoaderSpan spanColor={color} />
      </LoaderSpanWrapper>
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
  font-size: var(--fontSizeBodyS);
  font-weight: var(--fontWeightMedium);
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

const LoaderSpanWrapper = styled.span`
  display: grid;
  grid-template-columns: repeat(3, ${props => props.spanSize}px);
  grid-gap: ${props => props.gapSize}px;
  align-items: center;
  justify-content: center;
  transform: skewX(22deg);
`;

const AnimSpan = keyframes`
  0% {
    transform: scaleY(0);
    opacity: 0.5;
    transform-origin: top;
  }
  40% {
    transform: scaleY(1);
    opacity: 1;
    transform-origin: top;
  }
  60% {
    transform: scaleY(1);
    opacity: 1;
    transform-origin: bottom;
  }
  100% {
    transform: scaleY(0);
    opacity: 0.5;
    transform-origin: bottom;
  }
`;

const LoaderSpan = styled.span`
  height: 60%;
  background: ${props => props.spanColor};
  animation: ${AnimSpan} 1s var(--bezierFastoutSlowin) infinite;
  transform: scaleY(0);
  transform-origin: top left;

  &:nth-child(2) {
    animation-delay: 0.1s;
  }

  &:nth-child(3) {
    animation-delay: 0.2s;
  }
`;

export default Loader;
