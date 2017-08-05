export default `
varying vec2 v_uv;
varying vec3 v_line_color;
varying float z;

#define M_PI 3.1415926535897932384626433832795

void main() {
  vec4 temp;
  float alpha = sin(v_uv.y * M_PI) / 4.;
  temp = vec4(v_line_color, alpha);
  gl_FragColor = temp;
}
`;
