const fs = require('fs');
const path = require('path');

const src = 'node_modules/three/examples/jsm/libs/draco/gltf';
const output = 'public/draco';

// Create output directory if it doesn't exist
if (!fs.existsSync(output)) {
  fs.mkdirSync(output, { recursive: true });
}

// Copy draco decoder from three.js into the public directory
try {
  fs.copyFileSync(
    path.join(src, 'draco_decoder.wasm'),
    path.join(output, 'draco_decoder.wasm')
  );
  console.log('✓ Copied draco_decoder.wasm');
} catch (err) {
  console.error('Error copying draco_decoder.wasm:', err);
}

try {
  fs.copyFileSync(
    path.join(src, 'draco_wasm_wrapper.js'),
    path.join(output, 'draco_wasm_wrapper.js')
  );
  console.log('✓ Copied draco_wasm_wrapper.js');
} catch (err) {
  console.error('Error copying draco_wasm_wrapper.js:', err);
}
