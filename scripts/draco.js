const fs = require('fs-extra');

// Copy draco decoder from three.js into the public directory
fs.copy('node_modules/three/examples/js/libs/draco/gltf/', 'public/draco', err => {
  if (err) return console.error(err);
});
