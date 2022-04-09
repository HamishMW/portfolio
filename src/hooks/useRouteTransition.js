import { TransitionContext } from 'app';
import { useContext } from 'react';

export function useRouteTransition() {
  return useContext(TransitionContext);
}
