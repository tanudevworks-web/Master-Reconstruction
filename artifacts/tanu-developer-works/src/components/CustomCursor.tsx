import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rx = 0, ry = 0, mx = 0, my = 0, raf = 0;

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      dot.style.transform  = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };

    const show = () => { dot.style.opacity = "1"; ring.style.opacity = "1"; };
    const hide = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };
    const onDown = () => { ring.style.width = "28px"; ring.style.height = "28px"; };
    const onUp   = () => { ring.style.width = "38px"; ring.style.height = "38px"; };

    window.addEventListener("mousemove",   move);
    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);
    window.addEventListener("mousedown",   onDown);
    window.addEventListener("mouseup",     onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove",   move);
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("mousedown",   onDown);
      window.removeEventListener("mouseup",     onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position:"fixed",top:0,left:0,zIndex:9999,
        width:"5px",height:"5px",borderRadius:"50%",
        background:"#60a5fa",pointerEvents:"none",
        willChange:"transform",transition:"opacity 0.2s",
      }}/>
      <div ref={ringRef} style={{
        position:"fixed",top:0,left:0,zIndex:9998,
        width:"38px",height:"38px",borderRadius:"50%",
        border:"1px solid rgba(96,165,250,0.28)",
        pointerEvents:"none",willChange:"transform",
        transition:"width 0.2s,height 0.2s,opacity 0.2s",
      }}/>
    </>
  );
}
