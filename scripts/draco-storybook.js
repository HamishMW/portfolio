const fs = require('fs-extra');

// Copy draco decoder from three.js into the storybook build directory
fs.copy(
  'node_modules/three/examples/js/libs/draco/gltf/',
  'build-storybook/draco',
  err => {
    if (err) return console.error(err);
  }
);
