const fs = require('fs-extra');

fs.copy('../node_modules/three/examples/js/libs/draco/gltf/', 'public/draco', err => {
  if (err) return console.error(err);
  console.log('success!');
});
