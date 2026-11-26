import { useEffect, useRef } from "react";

// Satelit mengorbit bumi. Taruh di DALAM pembungkus gambar bumi (yang `absolute`),
// karena ukuran dan posisinya dihitung dari lebar pembungkus itu.
const CX = 737; // pusat bumi (satuan: 1000 = lebar pembungkus)
const CY = 1095;
const RX = 559;
const RY = 412;
const TILT = -25; // derajat
const START = 235; // sudut awal satelit (derajat)
const SPEED = 7; // derajat per detik

const OrbitSatellite = () => {
  const satRef = useRef(null);
  const beamRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const place = (deg) => {
      const a = (deg * Math.PI) / 180;
      const x = RX * Math.cos(a);
      const y = RY * Math.sin(a);
      satRef.current?.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      const toEarth = (Math.atan2(-y, -x) * 180) / Math.PI; // arah sinar menuju bumi
      beamRef.current?.setAttribute("transform", `rotate(${toEarth.toFixed(1)})`);
    };

    place(START);
    if (reduce) return;

    const t0 = performance.now();
    const loop = (now) => {
      place(START + ((now - t0) / 1000) * SPEED);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      viewBox="0 0 1000 1000"
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 hidden h-auto w-full overflow-visible md:block"
    >
      <defs>
        <linearGradient id="orbitBeam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9ec5ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#9ec5ff" stopOpacity="0" />
        </linearGradient>
        <filter id="orbitGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g transform={`translate(${CX} ${CY}) rotate(${TILT})`}>
        <ellipse
          rx={RX}
          ry={RY}
          fill="none"
          stroke="#fff"
          strokeOpacity="0.28"
          strokeWidth="1.3"
          strokeDasharray="3 9"
          vectorEffect="non-scaling-stroke"
        />

        <g ref={satRef}>
          <g ref={beamRef}>
            <path d="M0,0 L130,-32 L130,46 Z" fill="url(#orbitBeam)" opacity="0.5" />
          </g>
          <g filter="url(#orbitGlow)" transform={`rotate(${-TILT - 12}) scale(0.75)`}>
            <rect x="-26" y="-4.5" width="19" height="9" rx="1.2" fill="#d9dde3" stroke="#8a9099" strokeWidth="0.8" />
            <rect x="7" y="-4.5" width="19" height="9" rx="1.2" fill="#d9dde3" stroke="#8a9099" strokeWidth="0.8" />
            <rect x="-7" y="-7" width="14" height="14" rx="2.5" fill="#f4f4f5" stroke="#9aa0a8" strokeWidth="0.9" />
            <circle cx="0" cy="0" r="2.3" fill="#3b82f6" />
            <line x1="0" y1="-7" x2="0" y2="-13" stroke="#cfd3d9" strokeWidth="1.1" />
            <circle cx="0" cy="-14" r="1.5" fill="#fff" />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default OrbitSatellite;