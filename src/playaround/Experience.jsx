import { extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Cube from "./Cube";
extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <ambientLight />

      <Cube position={[0, 0, 0]} />
      <Cube position={[1.5, 0, 0]} />
      <Cube position={[1.5, 1.5, 0]} />
      <Cube position={[0, 1.5, 0]} />
      <Cube position={[-1.5, 0, 0]} />
      <Cube position={[-1.5, -1.5, 0]} />
      <Cube position={[0, -1.5, 0]} />
      <Cube position={[1.5, -1.5, 0]} />
      <Cube position={[-1.5, 1.5, 0]} />
    </>
  );
}
