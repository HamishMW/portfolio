export const clean = scene => {
  scene.traverse(object => {
    if (!object.isMesh) return;

    object.geometry.dispose();

    if (object.material.isMaterial) {
      cleanMaterial(object.material);
    } else {
      // an array of materials
      // eslint-disable-next-line no-restricted-syntax
      for (const material of object.material) cleanMaterial(material);
    }
  });
};

const cleanMaterial = material => {
  material.dispose();

  // dispose textures
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(material)) {
    const value = material[key];
    if (value && typeof value === 'object' && 'minFilter' in value) {
      value.dispose();
    }
  }
};
