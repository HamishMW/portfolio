import { TransitionContext } from 'pages/_app';
import { useContext } from 'react';

export function useRouteTransition() {
  return useContext(TransitionContext);
}
