import styled from 'styled-components/macro';
import { rgba } from '../utils/styleUtils';

const Anchor = styled.a.attrs(({ target, rel }) => ({
  rel: rel || target === '_blank' ? 'noreferrer noopener' : null,
}))`
  position: relative;
  text-decoration: none;
  color: ${props => props.secondary
    ? 'inherit'
    : props.theme.colorPrimary};

  &:hover,
  &:focus,
  &:active {
    text-decoration-color: ${props => props.secondary
    ? rgba(props.theme.colorText, 0.6)
    : props.theme.colorPrimary};
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    right: 0;
    left: 0;
    height: 2px;
  }

  &::before {
    background-color: ${props => props.secondary
    ? rgba(props.theme.colorText, 0.2)
    : rgba(props.theme.colorPrimary, 0.4)};
  }

  &::after {
    background-color: ${props => props.secondary
    ? rgba(props.theme.colorText, 1)
    : rgba(props.theme.colorPrimary, 1)};
    transition: transform 0.4s ${props => props.theme.curveFastoutSlowin};
    transform: scale3d(0, 1, 1);
    transform-origin: center right;
  }

  &:hover::after {
    transform: scale3d(1, 1, 1);
    transform-origin: center left;
  }
`;

export default Anchor;
