import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const WIRE_FS = `
  uniform float uTime;
  uniform vec3 uColor;
  void main() {
    float pulse = sin(uTime * 1.1) * 0.15 + 0.75;
    gl_FragColor = vec4(uColor * pulse, 0.7);
  }
`;
const WIRE_VS = `void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

interface FloatObjProps {
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "tetrahedron" | "torus" | "box";
  color: [number, number, number];
  scale: number;
  rotSpeed: [number, number, number];
  floatSpeed?: number;
}

function FloatObj({ position, geometry, color, scale, rotSpeed, floatSpeed = 1 }: FloatObjProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Vector3(...color) } },
        vertexShader: WIRE_VS,
        fragmentShader: WIRE_FS,
        wireframe: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [color],
  );

  useFrame((_, delta) => {
    mat.uniforms.uTime.value += delta;
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotSpeed[0];
      meshRef.current.rotation.y += delta * rotSpeed[1];
      meshRef.current.rotation.z += delta * rotSpeed[2];
    }
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "icosahedron": return <icosahedronGeometry args={[1, 1]} />;
      case "octahedron":  return <octahedronGeometry args={[1]} />;
      case "tetrahedron": return <tetrahedronGeometry args={[1]} />;
      case "torus":       return <torusGeometry args={[0.8, 0.3, 8, 24]} />;
      case "box":         return <boxGeometry args={[1, 1, 1]} />;
    }
  }, [geometry]);

  return (
    <Float speed={floatSpeed} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale} material={mat}>
        {geo}
      </mesh>
    </Float>
  );
}

const OBJECTS: FloatObjProps[] = [
  { position: [-8, 3, -5],   geometry: "icosahedron", color: [0.2, 0.5, 1.0], scale: 0.9, rotSpeed: [0.2, 0.3, 0.1], floatSpeed: 0.8 },
  { position: [9, -2, -8],   geometry: "octahedron",  color: [0.6, 0.1, 1.0], scale: 1.1, rotSpeed: [0.1, 0.4, 0.2], floatSpeed: 1.1 },
  { position: [6, 5, -12],   geometry: "tetrahedron", color: [0.1, 0.8, 0.9], scale: 0.8, rotSpeed: [0.3, 0.1, 0.4], floatSpeed: 0.9 },
  { position: [-10, -4, -10],geometry: "torus",       color: [0.9, 0.3, 0.7], scale: 0.7, rotSpeed: [0.4, 0.2, 0.1], floatSpeed: 1.3 },
  { position: [3, -6, -7],   geometry: "icosahedron", color: [0.3, 0.9, 0.5], scale: 0.6, rotSpeed: [0.2, 0.5, 0.3], floatSpeed: 1.0 },
  { position: [-5, 7, -14],  geometry: "box",         color: [1.0, 0.5, 0.1], scale: 0.65, rotSpeed: [0.15, 0.35, 0.2], floatSpeed: 0.7 },
  { position: [11, 1, -6],   geometry: "octahedron",  color: [0.2, 0.6, 1.0], scale: 0.75, rotSpeed: [0.25, 0.15, 0.4], floatSpeed: 1.2 },
  { position: [-3, -8, -9],  geometry: "tetrahedron", color: [0.8, 0.1, 0.9], scale: 0.9, rotSpeed: [0.3, 0.2, 0.15], floatSpeed: 0.85 },
  { position: [7, -5, -15],  geometry: "torus",       color: [0.0, 0.9, 0.8], scale: 0.55, rotSpeed: [0.5, 0.1, 0.3], floatSpeed: 1.4 },
  { position: [-12, 1, -12], geometry: "icosahedron", color: [1.0, 0.4, 0.2], scale: 0.8, rotSpeed: [0.1, 0.6, 0.2], floatSpeed: 0.6 },
];

export function FloatingObjects() {
  return (
    <>
      {OBJECTS.map((o, i) => (
        <FloatObj key={i} {...o} />
      ))}
    </>
  );
}
