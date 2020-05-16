import React from 'react';
import styled, { css } from 'styled-components/macro';
import Icon from 'components/Icon';
import { Button } from 'components/Button';
import { media } from 'utils/style';

const NavToggle = ({ menuOpen, ...rest }) => (
  <NavToggleButton iconOnly aria-label="Menu" aria-expanded={menuOpen} {...rest}>
    <NavToggleInner>
      <NavToggleIcon open={menuOpen} icon="menu" />
      <NavToggleIcon open={menuOpen} icon="close" />
    </NavToggleInner>
  </NavToggleButton>
);

const NavToggleButton = styled(Button)`
  --buttonSize: var(--space2XL);

  /* && specificity hack for styled-components beta */
  && {
    position: fixed;
    top: var(--spaceOuter);
    right: var(--spaceOuter);
    width: var(--buttonSize);
    height: var(--buttonSize);
    z-index: 1024;
    display: none;

    @media (max-width: ${media.mobile}px), (max-height: ${media.mobile}px) {
      display: flex;
    }
  }
`;

const NavToggleInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const NavToggleIcon = styled(Icon)`
  --iconSize: var(--spaceXL);

  position: absolute;
  transition-property: opacity, transform, fill;
  transition-duration: 0.4s;
  transition-timing-function: var(--curveFastoutSlowin);
  transition-delay: 0.1s;
  opacity: 1;
  transform: rotate(0deg);
  fill: var(--colorTextBody);
  width: var(--iconSize);
  height: var(--iconSize);

  ${props =>
    props.icon === 'close' &&
    css`
      transition-delay: 0s;
      transform: rotate(-45deg);
      opacity: 0;
    `}

  ${props =>
    props.open &&
    props.icon === 'close' &&
    css`
      transition-delay: 0.1s;
      transform: rotate(0deg);
      opacity: 1;
    `}

  ${props =>
    props.open &&
    props.icon === 'menu' &&
    css`
      transition-delay: 0s;
      transform: rotate(45deg);
      opacity: 0;
    `}
`;

export default NavToggle;
