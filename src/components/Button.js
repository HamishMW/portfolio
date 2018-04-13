import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Icon from '../utils/Icon';
import Theme from '../utils/Theme';
import { ColorTint } from '../utils/StyleUtils';

const ButtonContent = ({ iconRight, icon, children, secondary, loading }) => (
  <React.Fragment>
    {icon && <ButtonIcon loading={loading} left icon={icon} secondary={secondary}/>}
    <ButtonText loading={loading} secondary={secondary}>{ children }</ButtonText>
    {iconRight && <ButtonIcon loading={loading} icon={iconRight} secondary={secondary}/>}
    {loading &&
      <Loader
        style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}
        size="24"
        color={Theme.colorBackground(1)}
      />
    }
  </React.Fragment>
);

const Button = ({ ...props, className, style, secondary }) => (
  <ButtonContainer
    className={className}
    style={style}
    secondary={secondary}
    {...props}
  >
    <ButtonContent {...props} />
  </ButtonContainer>
);

const LinkButton = ({ ...props, className, style, secondary,
  href, rel, target }) => (
  <LinkButtonContainer
    className={className}
    style={style}
    secondary={secondary}
    href={href}
    rel={rel}
    target={target}
  >
    <ButtonContent {...props} />
  </LinkButtonContainer>
);

const RouterButton = ({ ...props, className, style, secondary, to }) => (
  <RouterButtonContainer
    className={className}
    style={style}
    to={to}
    secondary={secondary ? 1 : 0}
  >
    <ButtonContent {...props} />
  </RouterButtonContainer>
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

  ${props => !props.disabled &&`
    &:hover,
    &:focus {
      outline: none;
      background: ${props => ColorTint(props.theme.colorPrimary(1), 0.2)};
      transform: scale(1.05);
    }
  `}

  &:active {
    transform: scale(1);
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

  ${props => props.icon &&`
    padding-right: 32px;
  `}
`;

const LinkButtonContainer = ButtonContainer.withComponent('a');
const RouterButtonContainer = ButtonContainer.withComponent(Link);

const ButtonText = styled.span`
  font-size: 18px;
  font-weight: 500;
  position: relative;
  line-height: 1;

  ${props => props.loading && `
    visibility: hidden;
  `}

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
  ${LinkButtonContainer}:focus &,
  ${RouterButtonContainer}:hover &,
  ${RouterButtonContainer}:focus & {
    ${props => props.icon === 'arrowRight' &&`
      transform: translate3d(3px, 0, 0);
    `}
  }

  ${props => props.loading && `
    visibility: hidden;
  `}
`;

export default Button;
export { LinkButton, RouterButton };
