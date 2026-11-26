import { useEffect, useRef } from "react";

const COLORS = ["#ffffff", "#ffffff", "#ffffff", "#cfe3ff", "#fff4cc"];
const DENSITY = 1 / 9000;
const EARTH = { cx: 0.737, cyBelow: 0.0949, r: 0.356 };

const Starfield = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const host = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, stars = [], shot = null, nextShot = 0, raf = 0, visible = true;

    const earthDisc = () => {
      const ww = w >= 768 ? w * 0.72 : w;
      return { x: w - ww + EARTH.cx * ww, y: h + EARTH.cyBelow * ww, r: EARTH.r * ww + 14 };
    };
    const build = () => {
      const e = earthDisc();
      const n = Math.round(w * h * DENSITY);
      stars = [];
      let guard = 0;
      while (stars.length < n && guard++ < n * 6) {
        const x = Math.random() * w, y = Math.random() * h;
        if (Math.hypot(x - e.x, y - e.y) < e.r) continue;
        const big = Math.random() < 0.1;
        stars.push({
          x, y,
          r: big ? 1.5 + Math.random() * 0.8 : 0.5 + Math.random() * 0.8,
          base: 0.25 + Math.random() * 0.6,
          speed: 0.5 + Math.random() * 1.5,
          phase: Math.random() * Math.PI * 2,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          big,
        });
      }
    };
    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (reduce) draw(0);
    };
    const spawnShot = (now) => {
      shot = {
        x: w * (0.62 + Math.random() * 0.3), y: h * (0.28 + Math.random() * 0.22),
        born: now, life: 650, speed: 1000, tail: 190,
      };
    };
    const DIR = { x: Math.cos((150 * Math.PI) / 180), y: Math.sin((150 * Math.PI) / 180) };
    const draw = (now) => {
      ctx.clearRect(0, 0, w, h);
      const t = now / 1000;
      for (const s of stars) {
        const twinkle = reduce ? 1 : 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
        ctx.globalAlpha = s.base * twinkle;
        ctx.fillStyle = s.color; ctx.shadowColor = s.color; ctx.shadowBlur = s.big ? 6 : 0;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.shadowBlur = 0;
      if (shot) {
        const age = now - shot.born;
        if (age > shot.life) shot = null;
        else {
          const d = (shot.speed * age) / 1000;
          const hx = shot.x + DIR.x * d, hy = shot.y + DIR.y * d;
          const tail = shot.tail * Math.min(1, age / 150);
          const tx = hx - DIR.x * tail, ty = hy - DIR.y * tail;
          const fade = Math.pow(1 - age / shot.life, 0.6);
          const g = ctx.createLinearGradient(tx, ty, hx, hy);
          g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(255,255,255,0.95)");
          ctx.globalAlpha = fade; ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.lineCap = "round";
          ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ctx.stroke();
          ctx.fillStyle = "#fff"; ctx.shadowColor = "#fff"; ctx.shadowBlur = 10;
          ctx.beginPath(); ctx.arc(hx, hy, 2.2, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      ctx.globalAlpha = 1;
    };
    const loop = (now) => {
      if (!visible) { raf = 0; return; }
      if (!shot && now >= nextShot) { spawnShot(now); nextShot = now + 6000 + Math.random() * 5000; }
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(host);
    if (!reduce) { nextShot = performance.now() + 2500; raf = requestAnimationFrame(loop); }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" />;
};
export default Starfield;