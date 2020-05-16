import styled from 'styled-components/macro';

const lineColor = (opacity, props) =>
  props.secondary
    ? `rgb(var(--rgbText) / ${opacity})`
    : `rgb(var(--rgbPrimary) / ${opacity})`;

const Link = styled.a.attrs(({ target, rel }) => ({
  rel: rel || target === '_blank' ? 'noreferrer noopener' : null,
}))`
  display: inline;
  text-decoration: none;
  color: ${props => (props.secondary ? 'inherit' : 'rgb(var(--rgbPrimary))')};

  /* prettier-ignore */
  background:
    linear-gradient(${props => lineColor(1, props)}, ${props =>
  lineColor(1, props)}) no-repeat 100% 100% / 0 2px,
    linear-gradient(${props => lineColor(0.3, props)}, ${props =>
  lineColor(0.3, props)}) no-repeat 0 100% / 100% 2px;
  transition: background-size 0.4s var(--curveFastoutSlowin);
  padding-bottom: 2px;

  &:hover,
  &:focus {
    background:
      linear-gradient(${props => lineColor(1, props)}, ${props =>
  lineColor(1, props)}) no-repeat 0 100% / 100% 2px,
      linear-gradient(${props => lineColor(0.3, props)}, ${props =>
  lineColor(0.3, props)}) no-repeat 0 100% / 100% 2px;
  }
`;

export default Link;
