import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Star {
  pos: THREE.Vector3;
  dir: THREE.Vector3;
  speed: number;
  life: number;
  maxLife: number;
  active: boolean;
}

const COUNT = 12;

export function ShootingStars() {
  const ref = useRef<THREE.Points>(null);
  const stars = useRef<Star[]>([]);
  const positions = useMemo(() => new Float32Array(COUNT * 3), []);
  const alphas = useMemo(() => new Float32Array(COUNT), []);

  useEffect(() => {
    stars.current = Array.from({ length: COUNT }, () => ({
      pos: new THREE.Vector3(),
      dir: new THREE.Vector3(),
      speed: 0,
      life: 0,
      maxLife: 0,
      active: false,
    }));
  }, []);

  const spawn = (s: Star) => {
    const angle = Math.random() * Math.PI * 2;
    const r = 30 + Math.random() * 40;
    s.pos.set(
      Math.cos(angle) * r,
      (Math.random() - 0.5) * 30,
      -10 - Math.random() * 30,
    );
    s.dir.set(
      (Math.random() - 0.5) * 0.3,
      -0.6 - Math.random() * 0.4,
      0.1,
    ).normalize();
    s.speed = 6 + Math.random() * 10;
    s.maxLife = 0.4 + Math.random() * 0.6;
    s.life = 0;
    s.active = true;
  };

  const timer = useRef(0);

  useFrame((_, delta) => {
    timer.current += delta;
    if (timer.current > 1.2 + Math.random() * 1.5) {
      timer.current = 0;
      const inactive = stars.current.find((s) => !s.active);
      if (inactive) spawn(inactive);
    }

    stars.current.forEach((s, i) => {
      if (!s.active) {
        positions[i * 3] = 999;
        positions[i * 3 + 1] = 999;
        positions[i * 3 + 2] = 999;
        alphas[i] = 0;
        return;
      }
      s.life += delta;
      if (s.life >= s.maxLife) { s.active = false; return; }
      s.pos.addScaledVector(s.dir, s.speed * delta);
      positions[i * 3] = s.pos.x;
      positions[i * 3 + 1] = s.pos.y;
      positions[i * 3 + 2] = s.pos.z;
      const t = s.life / s.maxLife;
      alphas[i] = Math.sin(t * Math.PI) * 0.9;
    });

    if (ref.current) {
      (ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (ref.current.geometry.attributes.alpha as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-alpha" args={[alphas, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.35}
        color={new THREE.Color(0.8, 0.9, 1.0)}
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
