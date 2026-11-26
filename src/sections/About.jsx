import { profile, asset } from "../data";

const About = () => {
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`;

  return (
    <section id="about" className="mx-auto max-w-[1440px] px-6 py-24 md:px-20">
      {/* Perkenalan: foto kiri, teks kanan */}
      <div className="relative overflow-hidden">
        {/* Lingkaran dekorasi di tepi kanan */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 top-1/2 hidden size-32 -translate-y-1/2 rounded-full bg-black md:block"
        />

        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,420px)_1fr] md:gap-20">
          <img
            src={asset("/assets/faris-about.png")}
            alt={profile.fullName}
            loading="lazy"
            className="mx-auto block h-auto w-full max-w-[360px] md:max-w-none"
          />

          <div className="md:pr-24">
            <p className="text-xl text-black/60 md:text-2xl">Hi, I'm</p>
            <h2 className="mt-1 font-display text-4xl leading-[1.1] text-black text-balance md:text-5xl lg:text-6xl">
              {profile.fullName}
            </h2>

            <div className="mt-6 max-w-[60ch] space-y-4 text-lg leading-relaxed text-black/65">
              {profile.about.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-base md:text-lg">
              <a
                href={gmailLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-black px-8 py-3.5 font-medium text-white hover:bg-zinc-800"
              >
                <i className="ri-mail-line ri-lg"></i> Contact
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 border border-black px-8 py-3.5 font-medium text-black hover:bg-black hover:text-white"
              >
                <i className="ri-download-2-line ri-lg"></i> Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;