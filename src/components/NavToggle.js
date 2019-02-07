import React from 'react';
import styled, { css } from 'styled-components/macro';
import Icon from '../utils/Icon';
import { Media } from '../utils/StyleUtils';

const NavToggle = ({ onClick, menuOpen }) => (
  <NavToggleButton aria-label="Menu" onClick={onClick}>
    <NavToggleInner>
      <NavToggleIcon open={menuOpen} icon="menu" size={32} color="white" />
      <NavToggleIcon open={menuOpen} icon="close" size={32} color="white" />
    </NavToggleInner>
  </NavToggleButton>
);

const NavToggleButton = styled.button`
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  position: fixed;
  top: ${props => props.theme.spacingOuter.mobile};
  right: ${props => props.theme.spacingOuter.mobile};
  margin: 0;
  display: none;
  width: 48px;
  height: 48px;
  transition: all 0.4s ease;
  z-index: 1024;
  clip-path: ${props => props.theme.clipPath(8)};

  &:hover,
  &:focus,
  &:active {
    background: ${props => props.theme.colorBlack(0.2)};
    outline: none;
  }

  @media (max-width: ${Media.mobile}), (max-height: ${Media.mobile}) {
    display: block;
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
  transition: all 0.4s ${props => props.theme.curveFastoutSlowin};
  transition-delay: 0.1s;
  opacity: 1;
  transform: rotate(0deg);

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
