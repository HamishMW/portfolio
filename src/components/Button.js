import React from 'react';
import styled from 'styled-components';
import Icon from '../utils/Icon';
import { ColorTint } from '../utils/Theme';

const ButtonContent = ({ iconRight, icon, children, secondary }) => (
  <React.Fragment>
    {icon && <ButtonIcon left icon={icon} secondary={secondary}/>}
    <ButtonText secondary={secondary}>{ children }</ButtonText>
    {iconRight && <ButtonIcon icon={iconRight} secondary={secondary}/>}
  </React.Fragment>
);

const Button = ({ ...props, className, style, secondary }) => (
  <ButtonContainer
    className={className}
    style={style}
    secondary={secondary}
  >
    <ButtonContent {...props} />
  </ButtonContainer>
);

const LinkButton = ({ ...props, className, style, secondary, href, target }) => (
  <LinkButtonContainer
    className={className}
    style={style}
    secondary={secondary}
    href={href}
    target={target}
  >
    <ButtonContent {...props} />
  </LinkButtonContainer>
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
  clip-path: ${props => props.theme.clipPath(8)};
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colorBackground(1)};
  text-decoration: none;
  font-family: inherit;

  &:hover,
  &:focus {
    outline: none;
    background: ${props => ColorTint(props.theme.colorPrimary(1), 0.2)};
    transform: scale(1.05);
  }

  ${props => props.secondary &&`
    background: none;
    color: ${props.theme.colorPrimary(1)};
    padding: 0;

    &:hover {
      transform: none;
      background: transparent;
    }
  `}
`;

const LinkButtonContainer = ButtonContainer.withComponent('a');

const ButtonText = styled.span`
  font-size: 18px;
  font-weight: 500;
  position: relative;

  ${props => props.secondary ?`
    color: ${props.theme.colorPrimary(1)};
  `:`
    color: ${props.theme.colorBackground(1)};
  `}
`;

const ButtonIcon = styled(Icon)`
  margin-left: ${props => props.left ? '0' : '10px'};
  margin-right: ${props => props.left ? '10px' : '0'};
  transition: all 0.3s ${props => props.theme.curveFastoutSlowin};
  fill: ${props => props.theme.colorBackground(1)};

  ${props => props.secondary &&`
    fill: ${props.theme.colorPrimary(1)};
  `}

  ${ButtonContainer}:hover &,
  ${ButtonContainer}:focus &,
  ${LinkButtonContainer}:hover &,
  ${LinkButtonContainer}:focus & {
    ${props => props.icon === 'arrowRight' &&`
      transform: translate3d(3px, 0, 0);
    `}
  }
`;

export default Button;
export { LinkButton };
