const Media = {
  numDesktop: 1440,
  numTablet: 1024,
  numMobile: 600,
  get desktop() { return `${this.numDesktop}px` },
  get tablet() { return `${this.numTablet}px` },
  get mobile() { return `${this.numMobile}px` },
}

export { Media };
