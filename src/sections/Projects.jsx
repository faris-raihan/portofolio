import { useEffect, useState } from "react";
import { projects, profile } from "../data";

/**
 * Gambar kartu proyek.
 * - Landscape: memenuhi area gambar (object-cover).
 * - Potret: tampil utuh dengan latar blur di kiri-kanannya.
 * - Panel sempit di desktop: tetap dipotong sebagai pratinjau.
 * `posisi` (opsional, dari data.js) mengatur bagian gambar yang ditampilkan.
 */
const ProjectImage = ({ src, alt, isActive, posisi }) => {
  const [portrait, setPortrait] = useState(false);

  const fit = portrait
    ? isActive
      ? "object-contain"
      : "max-md:object-contain md:object-cover"
    : "object-cover";

  return (
    <div className="relative min-h-[200px] flex-1 overflow-hidden bg-zinc-900">
      {portrait && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 size-full scale-110 object-cover opacity-50 blur-2xl ${
            isActive ? "" : "md:hidden"
          }`}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={(e) =>
          setPortrait(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth)
        }
        style={{ objectPosition: posisi ?? "center top" }}
        className={`absolute inset-0 size-full ${fit}`}
      />
    </div>
  );
};

const Projects = () => {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null); // proyek yang dibuka di pop-up
  const [zoom, setZoom] = useState(null); // foto yang diperbesar

  // Esc menutup foto besar dulu, lalu pop-up. Halaman di belakang tidak ikut bergulir.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (zoom) setZoom(null);
      else setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selected, zoom]);

  const close = () => {
    setZoom(null);
    setSelected(null);
  };

  const d = selected?.detail;
  const shots = d?.gallery ?? [];

  return (
    <section id="project" className="mx-auto max-w-[1440px] px-6 py-16 md:px-20">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-[198px]">
        <h2 className="font-display text-5xl tracking-[0.06em] md:text-[64px]">Featured Projects</h2>
        <p className="max-w-[624px] text-lg tracking-[0.06em] md:text-right md:text-2xl">
          Here's a selection of what I've been working on. More code and experiments on{" "}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-emerald-700 underline underline-offset-4 transition-colors hover:text-emerald-500"
          >
            GitHub
          </a>
          .
        </p>
      </div>

      {/* Desktop: panel yang melebar saat di-hover / diklik. Mobile: ditumpuk. */}
      <div className="flex flex-col gap-4 md:h-[640px] md:flex-row md:gap-[23px]">
        {projects.map((p, i) => {
          const isActive = i === active;
          return (
            <article
              key={p.id}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              tabIndex={0}
              className={`group relative flex min-h-[420px] cursor-pointer flex-col overflow-hidden bg-zinc-950 outline-none transition-[flex-grow] duration-500 md:min-h-0 ${
                isActive ? "md:flex-[3_1_0%]" : "md:flex-[1_1_0%]"
              }`}
            >
              {/* Gambar: mengisi semua ruang di atas blok teks */}
              <ProjectImage
                src={p.gambar}
                alt={p.nama}
                isActive={isActive}
                posisi={p.posisi}
              />

              {/* Teks: blok sendiri di bawah gambar. Di desktop hanya tampil di panel aktif. */}
              <div
                className={`bg-zinc-950 p-6 text-white transition-opacity duration-300 ${
                  isActive
                    ? "relative"
                    : "relative md:pointer-events-none md:absolute md:inset-x-0 md:bottom-0 md:opacity-0"
                }`}
              >
                <h3 className="font-display text-2xl md:text-3xl">{p.nama}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">{p.desk}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tools.map((t) => (
                    <span key={t} className="border border-white/30 px-2.5 py-0.5 text-xs text-white/80">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {p.link && p.link !== "#" && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
                    >
                      {p.linkLabel ?? "Lihat Website"} <i className="ri-arrow-right-up-line"></i>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(p);
                    }}
                    className="inline-flex items-center gap-2 border border-white px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
                  >
                    Lihat Detail <i className="ri-eye-line"></i>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Pop-up detail */}
      {selected && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selected.nama}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-[860px] overflow-y-auto bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Tutup"
              className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center bg-black/80 text-xl text-white hover:bg-black"
            >
              <i className="ri-close-line"></i>
            </button>

            <div className="p-6 md:p-10">
              {/* Judul + tools */}
              <h3 className="pr-12 font-display text-3xl text-black md:text-5xl">{selected.nama}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {selected.tools.map((t) => (
                  <span key={t} className="border border-black/25 px-2.5 py-1 text-sm text-black/75">
                    {t}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="mt-8 border-t border-black/10 pt-6">
                <p className="mb-2 text-xl font-bold text-black">Overview</p>
                <p className="leading-relaxed text-black/75">{d?.overview ?? selected.desk}</p>
              </div>

              {/* Peran + yang dikerjakan (opsional) */}
              {d?.peran && (
                <div className="mt-6">
                  <p className="mb-1 font-bold text-black">My Role</p>
                  <p className="text-black/75">{d.peran}</p>
                </div>
              )}
              {d?.fitur?.length > 0 && (
                <div className="mt-6">
                  <p className="mb-2 font-bold text-black">What I Did</p>
                  <ul className="list-disc space-y-1.5 pl-5 text-black/75">
                    {d.fitur.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tautan: bebas jumlahnya. Tambahkan color: "green" untuk tombol hijau (mis. dokumentasi Drive). */}
              {(d?.links?.length > 0 || (selected.link && selected.link !== "#")) && (
                <div className="mt-8 flex flex-wrap gap-3 border-t border-black/10 pt-6">
                  {(d?.links ?? [{ label: selected.linkLabel ?? "Lihat Website", href: selected.link }]).map(
                    (l) => {
                      const green = l.color === "green";
                      return (
                        <a
                          key={l.label}
                          href={l.href ?? l.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-2 px-5 py-3 font-medium text-white ${
                            green ? "bg-emerald-600 hover:bg-emerald-500" : "bg-black hover:bg-zinc-800"
                          }`}
                        >
                          {green && <i className="ri-folder-open-line"></i>}
                          {l.label} <i className="ri-arrow-right-up-line"></i>
                        </a>
                      );
                    }
                  )}
                </div>
              )}

              {/* Behind the Scenes: foto proses / magang / skripsi */}
              {shots.length > 0 && (
                <div className="mt-8 border-t border-black/10 pt-6">
                  <p className="mb-4 text-xl font-bold text-black">Behind the Scenes ({shots.length})</p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {shots.map((s) => (
                      <figure key={s.src} className="overflow-hidden border border-black/10">
                        <button
                          type="button"
                          onClick={() => setZoom(s)}
                          className="block w-full cursor-zoom-in"
                          aria-label="Perbesar foto"
                        >
                          <img
                            src={s.src}
                            alt={s.caption ?? selected.nama}
                            loading="lazy"
                            className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </button>
                        {s.caption && (
                          <figcaption className="p-3 text-sm italic leading-relaxed text-black/65">
                            {s.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Foto diperbesar */}
      {zoom && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setZoom(null)}
        >
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={zoom.src} alt={zoom.caption ?? ""} className="max-h-[80vh] w-auto object-contain" />
            {zoom.caption && (
              <figcaption className="mt-3 text-center text-sm text-white/80">{zoom.caption}</figcaption>
            )}
          </figure>
          <button
            type="button"
            onClick={() => setZoom(null)}
            aria-label="Tutup foto"
            className="absolute right-4 top-4 flex size-10 items-center justify-center bg-white/15 text-xl text-white hover:bg-white/30"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;