import { useRef, useEffect, useState, Suspense, lazy } from "react";

/* ─── WebGL detection ────────────────────────────────────── */
function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/* ─── CSS Cosmic background (fallback + Replit preview) ─── */
function CssCosmicBg() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 20% 50%, rgba(59,30,110,0.35) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(15,60,130,0.30) 0%, transparent 55%), radial-gradient(ellipse at 60% 80%, rgba(10,100,120,0.25) 0%, transparent 50%), #050810",
      }}
    >
      {/* Animated star layers */}
      <div className="cosmic-stars cosmic-stars-1" />
      <div className="cosmic-stars cosmic-stars-2" />
      <div className="cosmic-stars cosmic-stars-3" />
      {/* Nebula colour blobs */}
      <div className="cosmic-nebula cosmic-nebula-a" />
      <div className="cosmic-nebula cosmic-nebula-b" />
      <div className="cosmic-nebula cosmic-nebula-c" />
      {/* Hero glow orb */}
      <div className="cosmic-orb" />
    </div>
  );
}

/* ─── Lazy 3D scene (only if WebGL available) ─────────────── */
const WebGLScene = lazy(() =>
  import("./WebGLScene").then((m) => ({ default: m.WebGLScene })),
);

/* ─── Entry ──────────────────────────────────────────────── */
export function CosmicCanvas() {
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    const gl = hasWebGL();
    setWebgl(gl);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CssCosmicBg />
      {webgl && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <Suspense fallback={null}>
            <WebGLScene />
          </Suspense>
        </div>
      )}
    </>
  );
}
