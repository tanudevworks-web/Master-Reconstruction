import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const ORB_VS = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ORB_FS = `
  uniform float uTime;
  uniform vec3 uCam;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vec3 viewDir = normalize(uCam - vPosition);
    float fresnel = 1.0 - abs(dot(vNormal, viewDir));
    fresnel = pow(fresnel, 1.8);
    float t = uTime * 0.4;
    vec3 cA = vec3(0.1, 0.45, 1.0);
    vec3 cB = vec3(0.55, 0.05, 1.0);
    vec3 cC = vec3(0.05, 0.8, 0.9);
    vec3 col = mix(cA, cB, sin(t) * 0.5 + 0.5);
    col = mix(col, cC, sin(t * 0.7 + 1.5) * 0.3 + 0.3);
    float inner = pow(1.0 - fresnel, 4.0) * 0.25;
    float pulse = sin(uTime * 1.2) * 0.06 + 0.94;
    vec3 final = col * fresnel * pulse + vec3(0.3, 0.6, 1.0) * inner;
    gl_FragColor = vec4(final, fresnel * 0.85 + 0.08);
  }
`;

const RING_FS = `
  uniform float uTime;
  uniform vec3 uColor;
  void main() {
    float alpha = sin(uTime * 0.8) * 0.2 + 0.55;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const RING_VS = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function Ring({ radius, color, speed, tiltX, tiltZ }: {
  radius: number; color: number[]; speed: number; tiltX: number; tiltZ: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Vector3(...color) } },
        vertexShader: RING_VS,
        fragmentShader: RING_FS,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [color],
  );
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * speed;
      mat.uniforms.uTime.value += delta;
    }
  });
  return (
    <mesh ref={ref} rotation={[tiltX, 0, tiltZ]} material={mat}>
      <torusGeometry args={[radius, 0.012, 4, 120]} />
    </mesh>
  );
}

export function HeroOrb() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial | null>(null);

  const shaderMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uCam: { value: new THREE.Vector3(0, 0, 5) },
        },
        vertexShader: ORB_VS,
        fragmentShader: ORB_FS,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.FrontSide,
      }),
    [],
  );
  matRef.current = shaderMat;

  useFrame((state, delta) => {
    shaderMat.uniforms.uTime.value += delta;
    shaderMat.uniforms.uCam.value.copy(state.camera.position);
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.15;
      sphereRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef} position={[0, 0.2, 0]}>
        {/* Core orb */}
        <mesh ref={sphereRef} material={shaderMat}>
          <sphereGeometry args={[1.1, 64, 64]} />
        </mesh>
        {/* Inner glow layer */}
        <mesh material={shaderMat}>
          <sphereGeometry args={[0.85, 32, 32]} />
        </mesh>
        {/* Orbit rings */}
        <Ring radius={1.7} color={[0.1, 0.5, 1.0]} speed={0.4} tiltX={Math.PI / 6} tiltZ={0} />
        <Ring radius={2.1} color={[0.5, 0.1, 1.0]} speed={-0.25} tiltX={Math.PI / 3} tiltZ={Math.PI / 5} />
        <Ring radius={2.5} color={[0.1, 0.8, 0.9]} speed={0.18} tiltX={Math.PI / 2.5} tiltZ={Math.PI / 3} />
        <Ring radius={1.45} color={[0.9, 0.3, 0.8]} speed={-0.55} tiltX={Math.PI / 1.5} tiltZ={Math.PI / 4} />
      </group>
    </Float>
  );
}
