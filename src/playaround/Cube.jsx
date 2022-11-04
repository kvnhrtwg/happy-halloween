import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
export default function Cube(props) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  useFrame(() => {
    ref.current.position.z = THREE.MathUtils.lerp(
      ref.current.position.z,
      clicked ? 1 : 0,
      0.1
    );
  });

  return (
    <mesh
      ref={ref}
      position={props.position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? "red" : "orange"} />
    </mesh>
  );
}
