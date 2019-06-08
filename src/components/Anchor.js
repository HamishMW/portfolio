import styled from 'styled-components/macro';
import { rgba } from '../utils/styleUtils';

const getColor = (props) => props.secondary
  ? rgba(props.theme.colorText, 0.2)
  : rgba(props.theme.colorPrimary, 0.4);

const getHoverColor = (props) => props.secondary
  ? rgba(props.theme.colorText, 1)
  : rgba(props.theme.colorPrimary, 1);

const Anchor = styled.a.attrs(({ target, rel }) => ({
  rel: rel || target === '_blank' ? 'noreferrer noopener' : null,
}))`
  display: inline;
  text-decoration: none;
  color: ${props => props.secondary
    ? 'inherit'
    : props.theme.colorPrimary};

  background:
    linear-gradient(${getHoverColor}, ${getHoverColor}) no-repeat 100% 100% / 0 2px,
    linear-gradient(${getColor}, ${getColor}) no-repeat 0 100% / 100% 2px;
  transition: background-size 0.4s ${props => props.theme.curveFastoutSlowin};
  padding-bottom: 2px;

  &:hover,
  &:focus {
    background:
      linear-gradient(${getHoverColor}, ${getHoverColor}) no-repeat 0 100% / 100% 2px,
      linear-gradient(${getColor}, ${getColor}) no-repeat 0 100% / 100% 2px;
  }
`;

export default Anchor;
