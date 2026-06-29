import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

export function StarField() {
  const driftRef = useRef<THREE.Points>(null);

  // Custom nebula / dust particles
  const { positions, colors } = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      [0.2, 0.4, 1.0],   // blue
      [0.5, 0.1, 0.9],   // purple
      [0.1, 0.7, 0.9],   // cyan
      [0.8, 0.2, 0.6],   // pink
      [1.0, 0.6, 0.1],   // amber
    ];
    for (let i = 0; i < count; i++) {
      const r = 20 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (driftRef.current) {
      driftRef.current.rotation.y += delta * 0.01;
      driftRef.current.rotation.x += delta * 0.004;
    }
  });

  return (
    <>
      {/* Main starfield */}
      <Stars
        radius={120}
        depth={60}
        count={8000}
        factor={4}
        saturation={0.4}
        fade
        speed={0.4}
      />
      {/* Colored nebula dust */}
      <points ref={driftRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          vertexColors
          transparent
          opacity={0.55}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
