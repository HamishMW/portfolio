/**
 * Uses the browser's image loading to get the correct image from a srcSet
 */
export async function getImageFromSrcSet({ src, srcSet, sizes }) {
  return new Promise((resolve, reject) => {
    try {
      if (!src && !srcSet) {
        throw new Error('No image src or srcSet provided');
      }

      const tempImage = new Image();

      tempImage.src = src;
      tempImage.srcset = srcSet;
      tempImage.sizes = sizes;

      const onLoad = () => {
        tempImage.removeEventListener('load', onLoad);
        const source = tempImage.currentSrc;
        resolve(source);
      };

      tempImage.addEventListener('load', onLoad);
    } catch (error) {
      reject(`Error loading ${srcSet}: ${error}`);
    }
  });
}
