import React from 'react';
import styled from 'styled-components/macro';

function Monogram({ highlight, ...props }) {

  return (
    <MonogramWrapper aria-hidden width="46" height="29" viewBox="0 0 46 29" {...props}>
      <defs>
        <clipPath id="monogram-clip">
          <path d="M16.525 28.462l7.18-18.35.003-.001 9.72 18.442a.838.838 0 001.524-.093l3.39-8.824a.846.846 0 00-.04-.686L30.307 3.605A6.698 6.698 0 0024.367 0h-4.6a.84.84 0 00-.74 1.23l3.63 6.887-3.655 9.15-7.12-13.662A6.698 6.698 0 005.942 0h-4.6a.842.842 0 00-.748 1.23L15 28.554a.839.839 0 001.524-.092zM42.392 8.806a.835.835 0 00.387-.446v.001l2.67-7.23a.838.838 0 00-.785-1.129h-6.578a.837.837 0 00-.736 1.238l3.907 7.226c.22.41.729.56 1.135.34z" />
        </clipPath>
      </defs>
      <rect clipPath="url(#monogram-clip)" width="100%" height="100%" />
      {highlight &&
        <g clipPath="url(#monogram-clip)">
          <MonogramHighlight className="monogram__highlight" width="100%" height="100%" />
        </g>
      }
    </MonogramWrapper>
  );
}

const MonogramWrapper = styled.svg`
  fill: ${props => props.theme.colorText};
`;

const MonogramHighlight = styled.rect`
  fill: ${props => props.theme.colorAccent};
  opacity: 0;
  transform: scale3d(1, 0, 1);
  transform-origin: top;
  transition:
    transform 0.4s ${props => props.theme.curveFastoutSlowin},
    opacity 0.1s ease 0.4s;

  a:focus &,
  a:hover &,
  ${/* sc-selector */MonogramWrapper}:hover & {
    opacity: 1;
    transform: scale3d(1, 1, 1);
    transform-origin: bottom;
    transition:
      transform 0.4s ${props => props.theme.curveFastoutSlowin},
      opacity 0.1s ease;
  }
`;

export default Monogram;
