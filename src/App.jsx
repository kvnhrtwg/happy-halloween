import { Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

function Skull({ z }) {
  const ref = useRef();
  const { nodes, materials } = useGLTF("/skull-transformed.glb");
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);
  const [hovered, setHovered] = useState(false);
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame(() => {
    ref.current.position.set(data.x * width, (data.y += 0.005), z);
    ref.current.rotation.set(
      (data.rX += 0.0015),
      (data.rY += hovered ? 0.15 : 0.0015),
      (data.rZ += 0.0015)
    );
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  });
  return (
    <mesh
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      geometry={nodes.Object_2.geometry}
      material={materials.defaultMat}
      material-emissive={"black"}
    />
  );
}

export default function App({ count = 200, depth = 80 }) {
  return (
    <>
      <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 30 }}>
        <color attach="background" args={["#111"]} />
        {/* <ambientLight intensity={0.2} /> */}
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Suspense fallback={null}>
          {Array.from({ length: count }, (_, i) => (
            <Skull key={i} z={-(i / count) * depth - 10} />
          ))}
          <Environment preset="sunset" />
          <EffectComposer>
            <DepthOfField
              target={[0, 0, depth / 2]}
              focalLength={0.5}
              bokehScale={8}
              height={700}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <div className="overlay">
        <h1>Happy Halloween</h1>
      </div>
      <div className="fade-in" />
    </>
  );
}
