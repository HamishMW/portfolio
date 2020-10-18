/**
 * Uses the browser's image loading to get the correct image src from a srcSet
 */
export async function getImageFromSrcSet({ src, srcSet, sizes }) {
  return new Promise((resolve, reject) => {
    try {
      if (!src && !srcSet) {
        throw new Error('No image src or srcSet provided');
      }

      const tempImage = new Image();

      if (src) {
        tempImage.src = src;
      }

      if (srcSet) {
        tempImage.srcset = srcSet;
      }

      if (sizes) {
        tempImage.sizes = sizes;
      }

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

/**
 * Generates a transparent png of a given width and height
 */
export function generateImage(width = 1, height = 1) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, width, height);
  const image = canvas.toDataURL('image/png', '');
  canvas.remove();
  return image;
}

/**
 * Use native image srcSet resolution for video sources
 */
export async function resolveVideoSrcFromSrcSet(srcSet) {
  const sources = srcSet.split(', ').map(srcString => {
    const [src, width] = srcString.split(' ');
    const image = generateImage(Number(width.replace('w', '')));
    return { src, image, width };
  });

  const fakeSrcSet = sources.map(({ image, width }) => `${image} ${width}`).join(', ');
  const fakeSrc = await getImageFromSrcSet({ srcSet: fakeSrcSet });

  const videoSrc = sources.find(src => src.image === fakeSrc);
  return videoSrc.src;
}
