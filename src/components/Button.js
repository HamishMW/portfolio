import React, { useContext } from 'react';
import styled, { css } from 'styled-components/macro';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Icon from '../utils/Icon';
import { tint } from '../utils/StyleUtils';
import { AppContext } from '../app/App';

const ButtonContent = React.memo(props => {
  const { currentTheme } = useContext(AppContext);
  const { iconRight, icon, children, secondary, loading } = props;

  return (
    <React.Fragment>
      {icon && <ButtonIcon loading={loading} left icon={icon} secondary={secondary} />}
      <ButtonText loading={loading} secondary={secondary}>
        {children}
      </ButtonText>
      {iconRight && <ButtonIcon loading={loading} icon={iconRight} secondary={secondary} />}
      {loading && <ButtonLoader size="24" color={currentTheme.colorBackground()} />}
    </React.Fragment>
  );
});

const Button = React.memo(props => {
  const { className, style, ...restProps } = props;

  return (
    <ButtonContainer className={className} style={style} {...restProps}>
      <ButtonContent {...restProps} />
    </ButtonContainer>
  );
});

const LinkButton = React.memo(props => {
  const { className, style, href, rel, target, secondary } = props;

  return (
    <ButtonContainer
      as="a"
      className={className}
      style={style}
      href={href}
      rel={rel}
      target={target}
      secondary={secondary}
    >
      <ButtonContent {...props} />
    </ButtonContainer>
  );
});

const RouterButton = React.memo(props => {
  const { className, style, to, secondary } = props;

  return (
    <ButtonContainer as={Link} className={className} style={style} to={to} secondary={secondary ? 1 : 0}>
      <ButtonContent {...props} />
    </ButtonContainer>
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
  color: ${props => props.theme.colorBackground()};
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
      background: ${props.theme.colorPrimary()};
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
      background: ${tint(props.theme.colorPrimary(), 0.2)};
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
    color: ${props.theme.colorPrimary()};
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

const ButtonText = styled.span`
  font-size: 18px;
  font-weight: 500;
  position: relative;
  line-height: 1;

  ${props => props.loading && css`
    visibility: hidden;
  `}

  ${props => props.secondary
    ? `color: ${props.theme.colorPrimary()};`
    : `color: ${props.theme.colorBackground()};
  `}
`;

const ButtonIcon = styled(Icon)`
  margin-left: ${props => (props.left ? '0' : '6px')};
  margin-right: ${props => (props.left ? '6px' : '0')};
  transition: all 0.3s ${props => props.theme.curveFastoutSlowin};
  fill: ${props => props.theme.colorBackground()};

  ${props => props.secondary && css`
    fill: ${props.theme.colorPrimary()};
  `}

  ${ButtonContainer}:hover &,
  ${ButtonContainer}:focus & {
    ${props => props.icon === 'arrowRight' && css`
      transform: translate3d(3px, 0, 0);
    `}
  }

  ${props => props.loading && css`
    opacity: 0;
  `}
`;

export default Button;
export { LinkButton, RouterButton };
