import { useContext } from 'react';
import { TransitionContext } from 'app';

function useRouteTransition() {
  return useContext(TransitionContext);
}

export default useRouteTransition;
