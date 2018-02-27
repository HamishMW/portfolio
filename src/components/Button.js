import React from 'react';
import styled from 'styled-components';
import Icon from '../utils/Icon';
import Theme from '../utils/Theme';

const Button = ({ children, icon }) => (
  <ButtonContainer>
    <ButtonText>{ children }</ButtonText>
    {icon &&
      <ButtonIcon icon={icon} color={Theme.colorBackground(1)} />
    }
  </ButtonContainer>
);

const ButtonContainer = styled.button`
  background: ${props => props.theme.colorPrimary(1)};
  height: 56px;
  padding: 0 26px;
  border: 0;
  margin: 0;
  cursor: pointer;
  transition: all 0.3s ${props => props.theme.curveFastoutSlowin};
  display: flex;

  &:hover,
  &:focus {
    transform: scale(1.1);
    outline: none;
  }

  &:active {
    transform: scale(1);
  }
`;

const ButtonText = styled.span`
  color: ${props => props.theme.colorBackground(1)};
  font-size: 18px;
  font-weight: 600;
`;

const ButtonIcon = styled(Icon)`
  margin-left: 10px;
`;

export default Button;
