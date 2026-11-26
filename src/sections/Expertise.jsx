import { useRef, useState } from "react";
import { expertise } from "../data";
import { ToolChips } from "../lib/toolIcons";

const Expertise = () => {
  const listRef = useRef(null);
  const [pos, setPos] = useState({ y: 0, show: false });
  const [active, setActive] = useState(expertise[0]); // baris yang sedang disorot

  const handleMove = (e) => {
    const rect = listRef.current.getBoundingClientRect();
    setPos({ y: e.clientY - rect.top, show: true });
  };

  return (
    <section id="skills" className="mx-auto max-w-[1440px] px-6 py-24 md:px-20">
      <h2 className="mb-6 font-display text-5xl tracking-[0.06em] md:text-[64px]">Expertise</h2>

      <ul
        ref={listRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setPos((p) => ({ ...p, show: false }))}
        className="relative border-t border-black/30"
      >
        {expertise.map((e) => (
          <li
            key={e.id}
            onMouseEnter={() => setActive(e)}
            className="flex flex-col gap-1 border-b border-black/30 py-5 transition-colors hover:bg-black/[0.03] md:flex-row md:items-center md:justify-between"
          >
            <span className="text-xl uppercase md:text-2xl">{e.nama}</span>
            <span className="text-sm text-black/65 md:text-base">{e.tools}</span>
          </li>
        ))}

        {/* Kartu logo yang mengikuti kursor (hanya desktop) */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 z-10 hidden w-[400px] -translate-y-1/2 border border-black/10 bg-white p-6 shadow-xl transition-opacity duration-200 md:block ${
            pos.show ? "opacity-100" : "opacity-0"
          }`}
          style={{ top: pos.y }}
        >
          <ToolChips tools={active.tools} />
        </div>
      </ul>
    </section>
  );
};

export default Expertise;