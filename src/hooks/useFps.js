import { useCallback, useEffect, useRef } from 'react';

export function useFps() {
  const fps = useRef(0);
  const prevTime = useRef(0);
  const frames = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    prevTime.current = performance.now();
  }, []);

  const measureFps = useCallback(() => {
    const currentTime = performance.now();
    frames.current = frames.current + 1;

    if (currentTime >= prevTime.current + 1000) {
      fps.current = (frames.current * 1000) / (currentTime - prevTime.current);
      prevTime.current = currentTime;
      frames.current = 0;
    }
  }, []);

  return { measureFps, fps };
}
