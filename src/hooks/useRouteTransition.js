import { TransitionContext } from 'pages/_app.page';
import { useContext } from 'react';

export function useRouteTransition() {
  return useContext(TransitionContext);
}
