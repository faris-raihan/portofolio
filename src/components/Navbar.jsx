import { useEffect, useRef, useState } from "react";
import { profile, navLinks } from "../data";

// Canvas kecil untuk mengubah warna CSS apa pun (rgb, oklch, dll.) jadi rgba
const ctx =
  typeof document !== "undefined"
    ? document.createElement("canvas").getContext("2d", { willReadFrequently: true })
    : null;

const toRGBA = (color) => {
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  return ctx.getImageData(0, 0, 1, 1).data; // [r, g, b, a]
};

// Cek apakah latar di bawah navbar gelap
const isDarkBehind = (header) => {
  const y = header.offsetHeight / 2;
  const els = document.elementsFromPoint(window.innerWidth / 2, y);
  for (const el of els) {
    if (header.contains(el)) continue;
    let node = el;
    while (node && node !== document.documentElement) {
      const [r, g, b, a] = toRGBA(getComputedStyle(node).backgroundColor);
      if (a > 128) return 0.299 * r + 0.587 * g + 0.114 * b < 128;
      node = node.parentElement;
    }
    break;
  }
  return false;
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const headerRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 40);
      if (headerRef.current) setDark(isDarkBehind(headerRef.current));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const text = dark ? "text-white" : "text-black";
  const link = dark ? "text-white/65 hover:text-white" : "text-black/60 hover:text-black";
  const bg = scrolled || open
    ? dark
      ? "bg-black/85 backdrop-blur"
      : "bg-paper/85 shadow-sm backdrop-blur"
    : "bg-transparent";

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${bg}`}
    >
      <nav
        className={`mx-auto flex max-w-[1440px] items-center justify-between px-6 transition-all duration-300 md:px-20 ${
          scrolled ? "py-4" : "py-8"
        }`}
      >
        <a href="#home" className={`text-2xl font-bold tracking-[0.06em] transition-colors ${text}`}>
          {profile.brand}
          <span className="text-leaf">.</span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-[17px] text-xl tracking-[0.06em] md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={`transition-colors ${link}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Buka menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden ${text}`}
        >
          <i className={`${open ? "ri-close-line" : "ri-menu-line"} ri-2x`}></i>
        </button>
      </nav>

      {open && (
        <ul className={`flex flex-col gap-4 px-6 pb-6 text-lg md:hidden ${text}`}>
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;