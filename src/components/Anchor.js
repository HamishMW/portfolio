import styled from 'styled-components';

const Anchor = styled.a`
  color: ${props => props.theme.colorPrimary(1)};
  text-decoration: none;
  box-shadow:
    0 2px 0 ${props => props.theme.colorPrimary(0.3)},
    inset 0 -2px 0 ${props => props.theme.colorPrimary(0.3)};
  transition: all 0.3s ${props => props.theme.curveFastoutSlowin};

  &:hover,
  &:focus,
  &:active {
    outline: none;
    box-shadow:
      0 2px 0 ${props => props.theme.colorPrimary(0.3)},
      inset 0 calc(-1em - 4px) 0 ${props => props.theme.colorPrimary(0.3)};
  }
`;

export default Anchor;
