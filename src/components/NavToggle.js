import React from 'react';
import styled, { css } from 'styled-components/macro';
import Icon from './Icon';
import { Button } from 'components/Button';

const NavToggle = ({ menuOpen, ...rest }) => (
  <NavToggleButton
    iconOnly
    aria-label="Menu"
    aria-expanded={menuOpen}
    {...rest}
  >
    <NavToggleInner>
      <NavToggleIcon open={menuOpen} icon="menu" />
      <NavToggleIcon open={menuOpen} icon="close" />
    </NavToggleInner>
  </NavToggleButton>
);

const NavToggleButton = styled(Button)`
  /* && specificity hack for styled-components beta */
  && {
    position: fixed;
    top: ${props => props.theme.spacingOuter.mobile}px;
    right: ${props => props.theme.spacingOuter.mobile}px;
    width: 48px;
    height: 48px;
    z-index: 1024;
    display: none;

    @media (max-width: ${props => props.theme.mobile}px), (max-height: ${props => props.theme.mobile}px) {
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
  position: absolute;
  transition-property: opacity, transform, fill;
  transition-duration: 0.4s;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-delay: 0.1s;
  opacity: 1;
  transform: rotate(0deg);
  fill: ${props => props.theme.colorText};
  width: 32px;
  height: 32px;

  ${props => props.icon === 'close' && css`
    transition-delay: 0s;
    transform: rotate(-45deg);
    opacity: 0;
  `}

  ${props => props.open && props.icon === 'close' && css`
    transition-delay: 0.1s;
    transform: rotate(0deg);
    opacity: 1;
  `}

  ${props => props.open && props.icon === 'menu' && css`
    transition-delay: 0s;
    transform: rotate(45deg);
    opacity: 0;
  `}
`;

export default NavToggle;
