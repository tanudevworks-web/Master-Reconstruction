import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { StarField } from "./StarField";
import { HeroOrb } from "./HeroOrb";
import { FloatingObjects } from "./FloatingObjects";
import { ShootingStars } from "./ShootingStars";
import { Suspense } from "react";

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const target = useRef(new THREE.Vector3());
  const lerpPos = useRef(new THREE.Vector3(0, 0, 5));

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      scroll.current = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((_, delta) => {
    const s = scroll.current;
    target.current.set(
      mouse.current.x * 1.2,
      -mouse.current.y * 0.8 + s * -3,
      5 - s * 18,
    );
    lerpPos.current.lerp(target.current, delta * 1.8);
    camera.position.copy(lerpPos.current);
    camera.lookAt(
      mouse.current.x * 0.3,
      -mouse.current.y * 0.2 + s * -1,
      -s * 10,
    );
  });

  return null;
}

function CosmicLights() {
  const l1 = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (l1.current) {
      l1.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 4;
      l1.current.position.y = Math.cos(state.clock.elapsedTime * 0.2) * 3;
    }
  });
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight ref={l1} color="#4488ff" intensity={8} distance={20} />
      <pointLight position={[5, 3, 2]} color="#8833ff" intensity={5} distance={18} />
      <pointLight position={[-4, -2, 3]} color="#00ccff" intensity={4} distance={15} />
    </>
  );
}

export function WebGLScene() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 300 }}
      dpr={[1, Math.min(2, window.devicePixelRatio)]}
      style={{ background: "transparent", width: "100%", height: "100%" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Suspense fallback={null}>
        <CameraRig />
        <CosmicLights />
        <StarField />
        <HeroOrb />
        <FloatingObjects />
        <ShootingStars />
      </Suspense>
    </Canvas>
  );
}
