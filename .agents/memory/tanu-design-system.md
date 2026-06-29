---
name: TanuDeveloper Works Design System
description: Color palette, CSS structure, and key architecture decisions for the Tanu portfolio redesign
---

## Palette (enforce strictly — NO purple)
- Background: `#050505`
- Primary accent: `#3b82f6` (blue-500)
- Secondary accent: `#06b6d4` (cyan-500)
- Text: `#ffffff`, `rgba(255,255,255,0.5)`, `rgba(255,255,255,0.3)`
- Glass surface: `rgba(255,255,255,0.03)` + `backdrop-blur(20px)` + border `rgba(255,255,255,0.06)`
- Gradient: `linear-gradient(135deg, #60a5fa, #06b6d4)` (blue→cyan, not blue→purple)

## CSS utilities (in index.css)
- `.glass-panel` — main card glass style
- `.section-label` — 0.65rem, tracking-[0.22em], uppercase, blue-400/70
- `.text-gradient-aurora` — blue→cyan gradient text
- `.bg-gradient-aurora` — blue→cyan gradient bg

## Both light and dark modes are dark
- `:root` vars use near-black values (0% 2%)
- `html:not(.dark)` is dark navy (220 15% 8%) not white
- `section { background: transparent !important }` — cosmos shows through all sections
- `body { background: #050505; color: #ffffff; }` always, regardless of theme

## Key functional details
- WhatsApp: `wa.me/918433553501`
- Firebase: project `tanu-devworks-leads`
- Admin password stored in Admin.tsx (not env var — keep as-is)
- CONTACT object exported from Footer.tsx (also imported by other components)
- `formHandler.ts` handles all Firebase form submissions

## Why
- User wants Apple Vision Pro / Linear / SpaceX aesthetic: cinematic deep black, no purple
- CosmicCanvas is always visible (CSS fallback + WebGL Three.js when available)
- THREE.Clock deprecation warning in console is harmless, ignore it
