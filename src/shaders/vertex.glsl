varying vec3 vPosition;
varying vec2 vUv;

uniform float uTime;

void main() {
  vec3 newPos = position;
  newPos.z = sin(position.x * 2. + uTime ) * cos(position.y * 3. + uTime) * uv.x * .2;
  vPosition = newPos;
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPos, 1.0);
}