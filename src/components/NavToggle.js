import React from 'react';
import styled from 'styled-components';
import Icon from '../utils/Icon';
import { Media } from '../utils/StyleUtils';

const NavToggle = ({onClick}) => (
  <NavToggleButton onClick={onClick}>
    <NavToggleInner>
      <Icon icon="menu" color="white" />
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
  margin: 5px 5px 0 0;
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  transition: all 0.4s ease;
  z-index: 1024;

  &:hover,
  &:focus,
  &:active {
    background: ${props => props.theme.colorWhite(0.2)};
    outline: none;
  }

  @media (max-width: ${Media.mobile}) {
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

export default NavToggle;
