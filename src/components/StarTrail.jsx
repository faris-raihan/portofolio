import { useEffect, useRef } from "react";

// Bintang kecil muncul dan memudar mengikuti gerakan kursor.
// Taruh <StarTrail /> sebagai anak pertama dari elemen induk yang `relative`.
const COLORS = ["#ffffff", "#ffffff", "#ffffff", "#fde68a", "#bfdbfe"];
const MAX_STARS = 140;
const STEP = 16; // jarak kursor (px) sebelum bintang baru muncul

const StarTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas.parentElement;

    // Hanya untuk perangkat dengan mouse, dan hormati pengaturan "kurangi gerakan"
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    let stars = [];
    let raf = 0;
    let dpr = 1;
    let w = 0;
    let h = 0;
    let last = { x: -999, y: -999 };

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (x, y) => {
      if (stars.length >= MAX_STARS) stars.shift();
      stars.push({
        x: x + (Math.random() - 0.5) * 14,
        y: y + (Math.random() - 0.5) * 14,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7 + 0.18,
        size: 4 + Math.random() * 7,
        rot: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.05,
        born: performance.now(),
        life: 700 + Math.random() * 800,
        seed: Math.random() * 10,
        color: COLORS[(Math.random() * COLORS.length) | 0],
      });
    };

    const drawStar = (s, r) => {
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const rad = i % 2 === 0 ? r : r * 0.28;
        const a = s.rot + (i * Math.PI) / 4;
        const px = s.x + Math.cos(a) * rad;
        const py = s.y + Math.sin(a) * rad;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    };

    const loop = (now) => {
      ctx.clearRect(0, 0, w, h);
      stars = stars.filter((s) => now - s.born < s.life);
      for (const s of stars) {
        const age = now - s.born;
        const t = age / s.life;
        s.x += s.vx;
        s.y += s.vy;
        s.rot += s.spin;
        const twinkle = 0.7 + 0.3 * Math.sin(age * 0.02 + s.seed);
        ctx.globalAlpha = Math.max(0, (1 - t) * twinkle);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        drawStar(s, s.size * (1 - t * 0.5));
      }
      ctx.globalAlpha = 1;
      raf = stars.length ? requestAnimationFrame(loop) : 0; // berhenti saat tidak ada bintang
    };

    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (Math.hypot(x - last.x, y - last.y) < STEP) return;
      last = { x, y };
      spawn(x, y);
      if (Math.random() < 0.5) spawn(x, y);
      if (!raf) raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    host.addEventListener("pointermove", onMove);

    return () => {
      host.removeEventListener("pointermove", onMove);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] size-full"
    />
  );
};

export default StarTrail;