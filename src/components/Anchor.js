import styled from 'styled-components/macro';
import { rgba } from 'utils/styleUtils';

const lineColor = (opacity, props) => props.secondary
  ? rgba(props.theme.colorText, opacity)
  : rgba(props.theme.colorPrimary, opacity);

const Anchor = styled.a.attrs(({ target, rel }) => ({
  rel: rel || target === '_blank' ? 'noreferrer noopener' : null,
}))`
  display: inline;
  text-decoration: none;
  color: ${props => props.secondary
    ? 'inherit'
    : props.theme.colorPrimary};

  background:
    linear-gradient(${props => lineColor(1, props)}, ${props => lineColor(1, props)}) no-repeat 100% 100% / 0 2px,
    linear-gradient(${props => lineColor(0.3, props)}, ${props => lineColor(0.3, props)}) no-repeat 0 100% / 100% 2px;
  transition: background-size 0.4s ${props => props.theme.curveFastoutSlowin};
  padding-bottom: 2px;

  &:hover,
  &:focus {
    background:
      linear-gradient(${props => lineColor(1, props)}, ${props => lineColor(1, props)}) no-repeat 0 100% / 100% 2px,
      linear-gradient(${props => lineColor(0.3, props)}, ${props => lineColor(0.3, props)}) no-repeat 0 100% / 100% 2px;
  }
`;

export default Anchor;
