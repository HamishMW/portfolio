import styled from 'styled-components';

const Anchor = styled.a`
  color: ${props => props.secondary
    ? props.theme.colorText(0.4)
    : props.theme.colorPrimary(1)};
  text-decoration: underline;
  text-decoration-color: ${props => props.secondary
    ? props.theme.colorText(0.2)
    : props.theme.colorPrimary(0.4)};
  transition: text-decoration-color 0.3s ${props => props.theme.curveFastoutSlowin};

  &:hover,
  &:focus,
  &:active {
    text-decoration-color: ${props => props.secondary
      ? props.theme.colorText(0.6)
      : props.theme.colorPrimary(1)};
  }
`;

export default Anchor;
