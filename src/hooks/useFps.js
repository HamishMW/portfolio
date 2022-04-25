import { useCallback, useEffect, useRef } from 'react';

const HISTORY_LENGTH = 9;

export function useFps(running = true) {
  const fps = useRef(0);
  const prevTime = useRef(0);
  const frames = useRef(0);
  const frameHistory = useRef([]);
  const isLowFps = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    prevTime.current = performance.now();
    frames.current = 0;
    frameHistory.current = [];
  }, [running]);

  const measureFps = useCallback(() => {
    const currentTime = performance.now();
    frames.current = frames.current + 1;

    // Measure fps every 100ms
    if (currentTime >= prevTime.current + 100) {
      fps.current = ((frames.current * 100) / (currentTime - prevTime.current)) * 10;
      frameHistory.current.push(fps.current);
      prevTime.current = currentTime;
      frames.current = 0;
    }

    if (frameHistory.current.length <= HISTORY_LENGTH) return;
    frameHistory.current = frameHistory.current.slice(-HISTORY_LENGTH);

    // Below 60 is considered low fps
    if (frameHistory.current.every(item => item < 60)) {
      isLowFps.current = true;
    }

    if (frameHistory.current.every(item => item > 70)) {
      isLowFps.current = false;
    }
  }, []);

  return { measureFps, fps, isLowFps };
}
