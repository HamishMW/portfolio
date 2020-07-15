/**
 * Clean up a scene's materials and geometry
 */
export const clean = scene => {
  scene.traverse(object => {
    if (!object.isMesh) return;

    object.geometry.dispose();

    if (object.material.isMaterial) {
      cleanMaterial(object.material);
    } else {
      for (const material of object.material) cleanMaterial(material);
    }
  });
};

/**
 * Clean up and dispose of a material
 */
export const cleanMaterial = material => {
  material.dispose();

  for (const key of Object.keys(material)) {
    const value = material[key];
    if (value && typeof value === 'object' && 'minFilter' in value) {
      value.dispose();
    }
  }
};

/**
 * Returns a promise wrapping three's `TextureLoader` or `GLTFLoader`
 */
export async function loader(loader, url) {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      map => {
        resolve(map);
      },
      () => {
        reject(new Error('Could not load asset'));
      }
    );
  });
}
