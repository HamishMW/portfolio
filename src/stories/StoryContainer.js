import styled, { css } from 'styled-components/macro';

export const StoryContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${props => props.fullWidth ? '100%' : 'max-content'};
  align-items: flex-start;
  justify-items: flex-start;

  ${props => props.padding && css`
    padding: ${props.padding}px;
  `}

  ${props => props.gutter && css`
    grid-gap: ${props.gutter}px;
  `}
`;
