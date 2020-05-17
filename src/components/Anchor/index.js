import styled from 'styled-components/macro';

const lineColor = (opacity, props) =>
  props.secondary
    ? `rgb(var(--rgbText) / ${opacity})`
    : `rgb(var(--rgbPrimary) / ${opacity})`;

const Link = styled.a.attrs(({ target, rel }) => ({
  rel: rel || target === '_blank' ? 'noreferrer noopener' : null,
}))`
  --lineStrokeWidth: 2px;

  display: inline;
  text-decoration: none;
  color: ${props => (props.secondary ? 'inherit' : 'rgb(var(--rgbPrimary))')};

  /* prettier-ignore */
  background:
    linear-gradient(${props => lineColor(1, props)}, ${props =>
  lineColor(1, props)}) no-repeat 100% 100% / 0 var(--lineStrokeWidth),
    linear-gradient(${props => lineColor(0.3, props)}, ${props =>
  lineColor(0.3, props)}) no-repeat 0 100% / 100% var(--lineStrokeWidth);
  transition: background-size var(--durationM) var(--bezierFastoutSlowin);
  padding-bottom: var(--lineStrokeWidth);

  &:hover,
  &:focus {
    background:
      linear-gradient(${props => lineColor(1, props)}, ${props =>
  lineColor(1, props)}) no-repeat 0 100% / 100% var(--lineStrokeWidth),
      linear-gradient(${props => lineColor(0.3, props)}, ${props =>
  lineColor(0.3, props)}) no-repeat 0 100% / 100% var(--lineStrokeWidth);
  }
`;

export default Link;
