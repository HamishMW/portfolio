/**
 * Blur clickable element on mouseup to hide focus states from
 * users with pointer devices
 */
export function blurOnMouseUp(event) {
  event.currentTarget.blur();
}
