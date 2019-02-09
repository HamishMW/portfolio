import React from 'react';
import styled, { withTheme, css } from 'styled-components/macro';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Icon from '../utils/Icon';
import { ColorTint } from '../utils/StyleUtils';

const ButtonContent = withTheme((props) => {
  const { iconRight, icon, children, secondary, loading, theme } = props;

  return (
    <React.Fragment>
      {icon && <ButtonIcon loading={loading} left icon={icon} secondary={secondary} />}
      <ButtonText loading={loading} secondary={secondary}>{children}</ButtonText>
      {iconRight && <ButtonIcon loading={loading} icon={iconRight} secondary={secondary} />}
      {loading && <ButtonLoader size="24" color={theme.colorBackground(1)} />}
    </React.Fragment>
  );
});

const Button = React.memo((props) => {
  const { className, style, ...restProps } = props;
  return (
    <ButtonContainer
      className={className}
      style={style}
      {...restProps}
    >
      <ButtonContent {...restProps} />
    </ButtonContainer>
  );
});

const LinkButton = React.memo((props) => {
  const { className, style, href, rel, target, secondary } = props;
  return (
    <LinkButtonContainer
      className={className}
      style={style}
      href={href}
      rel={rel}
      target={target}
      secondary={secondary}
    >
      <ButtonContent {...props} />
    </LinkButtonContainer>
  );
});

const RouterButton = React.memo((props) => {
  const { className, style, to, secondary } = props;

  return (
    <RouterButtonContainer
      className={className}
      style={style}
      to={to}
      secondary={secondary ? 1 : 0}
    >
      <ButtonContent {...props} />
    </RouterButtonContainer>
  );
});

const ButtonLoader = styled(Loader)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const ButtonContainer = styled.button`
  background: none;
  height: 56px;
  padding: 0 26px;
  border: 0;
  margin: 0;
  cursor: pointer;
  transition: all 0.3s ${props => props.theme.curveFastoutSlowin};
  display: flex;
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colorBackground(1)};
  text-decoration: none;
  font-family: inherit;
  position: relative;

  ${props => !props.secondary && css`
    &:before {
      content: '';
      transition: all 0.4s ${props.theme.curveFastoutSlowin};
      background: ${props.theme.colorPrimary(0.4)};
      clip-path: ${props.theme.clipPath(10)};
      position: absolute;
      top: -5px;
      right: -5px;
      bottom: -5px;
      left: -5px;
      z-index: -1;
      opacity: 0;
    }

    &:after {
      content: '';
      transition: all 0.4s ${props.theme.curveFastoutSlowin};
      background: ${props.theme.colorPrimary(1)};
      clip-path: ${props.theme.clipPath(8)};
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
    }
  `}

  ${props => !props.disabled && !props.secondary && css`
    &:hover,
    &:focus {
      outline: none;
      transform: scale(1.05);
    }

    &:hover:after,
    &:focus:after {
      background: ${ColorTint(props.theme.colorPrimary(1), 0.2)};
    }

    &:focus:before {
      opacity: 1;
    }
  `}

  &:active {
    transform: scale(1);
    transition-duration: 0.1s;
  }

  ${props => props.secondary && css`
    background: none;
    color: ${props.theme.colorPrimary(1)};
    padding: 0 10px;
    position: relative;
    left: -10px;

    &:after {
      content: '';
      height: 30px;
      position: absolute;
      top: 50%;
      right: 0;
      bottom: 0;
      left: 0;
      background: ${props.theme.colorPrimary(0.2)};
      transform: scale3d(0, 1, 1) translateY(-50%);
      transform-origin: right;
      transition: transform 0.4s ${props.theme.curveFastoutSlowin};
    }

    &:hover,
    &:focus,
    &:active {
      outline: none;
      transform: none;
      background: transparent;
    }

    &:hover:after,
    &:focus:after,
    &:active:after {
      transform: scale3d(1, 1, 1) translateY(-50%);
      transform-origin: left;
    }
  `}

  ${props => props.icon && css`
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

  ${props => props.loading && css`
    visibility: hidden;
  `}

  ${props => props.secondary ? `
    color: ${props.theme.colorPrimary(1)};
  `: `
    color: ${props.theme.colorBackground(1)};
  `}
`;

const ButtonIcon = styled(Icon)`
  margin-left: ${props => props.left ? '0' : '6px'};
  margin-right: ${props => props.left ? '6px' : '0'};
  transition: all 0.3s ${props => props.theme.curveFastoutSlowin};
  fill: ${props => props.theme.colorBackground(1)};

  ${props => props.secondary && css`
    fill: ${props.theme.colorPrimary(1)};
  `}

  ${ButtonContainer}:hover &,
  ${ButtonContainer}:focus &,
  ${LinkButtonContainer}:hover &,
  ${LinkButtonContainer}:focus &,
  ${RouterButtonContainer}:hover &,
  ${RouterButtonContainer}:focus & {
    ${props => props.icon === 'arrowRight' && css`
      transform: translate3d(3px, 0, 0);
    `}
  }

  ${props => props.loading && css`
    visibility: hidden;
  `}
`;

export default Button;
export { LinkButton, RouterButton };
