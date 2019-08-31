import React from 'react';
import styled, { css } from 'styled-components/macro';
import Icon from './Icon';
import { Button } from 'components/Button';
import { media } from 'utils/styleUtils';

const NavToggle = ({ onClick, menuOpen, ...rest }) => (
  <NavToggleButton
    iconOnly
    aria-label="Menu"
    aria-expanded={menuOpen}
    onClick={onClick}
    {...rest}
  >
    <NavToggleInner>
      <NavToggleIcon open={menuOpen} icon="menu" size={32} color="white" />
      <NavToggleIcon open={menuOpen} icon="close" size={32} color="white" />
    </NavToggleInner>
  </NavToggleButton>
);

const NavToggleButton = styled(Button)`
  position: fixed;
  top: ${props => props.theme.spacingOuter.mobile};
  right: ${props => props.theme.spacingOuter.mobile};
  width: 48px;
  height: 48px;
  z-index: 1024;
  display: none;

  @media (max-width: ${media.mobile}), (max-height: ${media.mobile}) {
    display: flex;
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
