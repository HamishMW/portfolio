/**
 * Returns true if being prerendered by react-snap. Useful for stuff
 * that needs to only run client-side and not during prerendering
 */
const prerender = navigator.userAgent === 'ReactSnap';
export default prerender;
