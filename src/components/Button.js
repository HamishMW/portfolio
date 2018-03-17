import React from 'react';
import styled from 'styled-components';
import Icon from '../utils/Icon';
import Theme, { ColorTint } from '../utils/Theme';

const Button = ({ children, iconRight }) => (
  <ButtonContainer>
    <ButtonText>{ children }</ButtonText>
    {iconRight && <ButtonIcon icon={iconRight} color={Theme.colorBackground(1)} />}
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
  clip-path: ${props => props.theme.clipPath(16)};

  &:hover,
  &:focus {
    outline: none;
    background: ${props => ColorTint(props.theme.colorPrimary(1), 0.2)};
    transform: perspective(600px) translateZ(20px);
  }
`;

const ButtonText = styled.span`
  color: ${props => props.theme.colorBackground(1)};
  font-size: 18px;
  font-weight: 600;
  position: relative;
`;

const ButtonIcon = styled(Icon)`
  margin-left: 10px;
  transition: all 0.3s ${props => props.theme.curveFastoutSlowin};

  ${ButtonContainer}:hover &,
  ${ButtonContainer}:focus & {
    ${props => props.icon === 'arrowRight' &&`
      transform: translate3d(3px, 0, 0);
    `}
  }
`;

export default Button;
