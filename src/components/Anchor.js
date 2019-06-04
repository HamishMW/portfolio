import styled from 'styled-components/macro';
import { rgba } from '../utils/styleUtils';

const Anchor = styled.a.attrs(({ target, rel }) => ({
  rel: rel || target === '_blank' ? 'noreferrer noopener' : null,
}))`
  color: ${props => props.secondary
    ? rgba(props.theme.colorText, 0.5)
    : props.theme.colorPrimary
  };
  text-decoration: underline;
  text-decoration-color: ${props => props.secondary
    ? rgba(props.theme.colorText, 0.2)
    : rgba(props.theme.colorPrimary, 0.4)
  };
  transition: text-decoration-color 0.3s ${props => props.theme.curveFastoutSlowin};

  &:hover,
  &:focus,
  &:active {
    text-decoration-color: ${props => props.secondary
      ? rgba(props.theme.colorText, 0.6)
      : props.theme.colorPrimary
    };
  }
`;

export default Anchor;
