export const isVisible = status => status === 'entering' || status === 'entered';

export const reflow = node => node && node.offsetHeight;
