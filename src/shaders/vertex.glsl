varying vec2 vUv;

uniform float uTime;

void main() {
  vec3 newPos = position;
  newPos.z = sin(position.x * 2. + uTime ) * cos(position.y * 3. + uTime) * uv.x * .2;
  newPos.y = newPos.y - max(0., (sin(abs(position.x - 0.35)) * -0.2 * log(abs(position.x - 0.95))) + 0.2);
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPos, 1.0);
}