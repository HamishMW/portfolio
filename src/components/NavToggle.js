import React from 'react';
import styled from 'styled-components';
import Icon from '../utils/Icon';
import { Media } from '../utils/StyleUtils';

const NavToggle = ({onClick}) => (
  <NavToggleButton onClick={onClick}>
    <Icon icon="menu" color="white" />
  </NavToggleButton>
);

const NavToggleButton = styled.button`
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  position: absolute;
  top: ${props => props.theme.spacingOuter.mobile};
  right: ${props => props.theme.spacingOuter.mobile};
  margin: 15px 15px 0 0;
  display: none;

  @media (max-width: ${Media.mobile}) {
    display: block;
  }
`;

export default NavToggle;
