import { useEffect, useRef } from "react";

/**
 * RAF-based custom cursor — no Framer Motion, no re-renders.
 * Dot: instant. Ring: smooth lerp at 0.12.
 * Hidden automatically on touch devices.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let isHovering = false;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      isHovering = !!(e.target as HTMLElement).closest("a, button, [data-interactive]");
    };

    const loop = () => {
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(${isHovering ? 0 : 1})`;

      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      const size = isHovering ? 40 : 28;
      ring.style.transform = `translate(${ringX - size / 2}px, ${ringY - size / 2}px)`;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.borderColor = isHovering ? "rgba(59,130,246,0.6)" : "rgba(100,116,139,0.5)";

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <>
      {/* Dot — no mix-blend-difference: adapts to both themes */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] will-change-transform dark:bg-white bg-gray-700"
        style={{ transition: "transform 0.04s linear" }}
        data-testid="cursor-dot"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border will-change-transform"
        style={{ transition: "border-color 0.2s, width 0.15s, height 0.15s" }}
        data-testid="cursor-ring"
      />
    </>
  );
}
