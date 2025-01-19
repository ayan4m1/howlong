import PropTypes from 'prop-types';
import { TextureLoader } from 'three';
import { useMemo, Fragment } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useThree, useFrame, useLoader } from '@react-three/fiber';

import vertexShader from './shaders/vertex.glsl';
import fireFragmentShader from './shaders/fragment-fire.glsl';
import texFragmentShader from './shaders/fragment.glsl';

export default function Flag({ timeLeft }) {
  const { clock } = useThree();
  const texture = useLoader(TextureLoader, './flag.png');
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture }
    }),
    [texture]
  );

  useFrame(() => {
    if (uniforms) {
      uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <Fragment>
      <ambientLight intensity={1} />
      <PerspectiveCamera fov={30} makeDefault position={[0, -0.2, 3]} />
      <mesh position={[-1.055, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 10, 64, 64]} />
        <meshPhysicalMaterial color="#b5c0c9" />
      </mesh>
      <mesh>
        <boxGeometry args={[1.9, 1, 0.01, 100, 100]} />
        <shaderMaterial
          fragmentShader={timeLeft ? texFragmentShader : fireFragmentShader}
          uniforms={uniforms}
          vertexShader={vertexShader}
        />
      </mesh>
    </Fragment>
  );
}

Flag.propTypes = {
  timeLeft: PropTypes.string
};
