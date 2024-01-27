/**
 * Format a timecode intro a hours:minutes:seconds:centiseconds string
 */
export function formatTimecode(time) {
  const hours = time / 1000 / 60 / 60;

  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  const s = Math.floor(((hours - h) * 60 - m) * 60);
  const c = Math.floor(((((hours - h) * 60 - m) * 60 - s) * 1000) / 10);

  return `${zeroPrefix(h)}:${zeroPrefix(m)}:${zeroPrefix(s)}:${zeroPrefix(c)}`;
}

/**
 * Prefix a number with zero as a string if less than 10
 */
export function zeroPrefix(value) {
  return value < 10 ? `0${value}` : `${value}`;
}
