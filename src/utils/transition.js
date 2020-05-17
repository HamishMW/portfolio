const visibleStatus = ['entering', 'entered'];

/**
 * Is the given TransitionStatus visible?
 */
export const isVisible = status => visibleStatus.includes(status);

/**
 * Is the given TransitionStatus hidden?
 */
export const isHidden = status => !visibleStatus.includes(status);

/**
 * Forces a reflow to trigger transitions on enter
 */
export const reflow = node => node && node.offsetHeight;
