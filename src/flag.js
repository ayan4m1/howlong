import { TextureLoader } from 'three';
import { useRef, useMemo, Fragment } from 'react';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useThree, useFrame, useLoader } from '@react-three/fiber';

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export default function Flag() {
  const meshRef = useRef();
  const cameraRef = useRef();
  const { clock } = useThree();
  const texture = useLoader(TextureLoader, './flag.png');
  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uTexture: { value: texture }
    };
  }, [texture]);

  useFrame(() => {
    if (meshRef.current) {
      uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <Fragment>
      <ambientLight intensity={1} />
      <PerspectiveCamera
        fov={30}
        makeDefault
        position={[0, 0, 3]}
        ref={cameraRef}
      />
      <OrbitControls camera={cameraRef.current} />
      <mesh position={[-1.055, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 10, 64, 64]} />
        <meshPhysicalMaterial color="#b5c0c9" />
      </mesh>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.9, 1, 0.01, 100, 100]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          vertexShader={vertexShader}
        />
      </mesh>
    </Fragment>
  );
}
