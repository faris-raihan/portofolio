import { profile } from "../data";

const contacts = [
  { icon: "ri-mail-line", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    icon: "ri-phone-line",
    label: "Phone",
    value: `${profile.phone} (WA)`,
    href: `https://wa.me/${profile.phone.replace(/\D/g, "")}`,
  },
  { icon: "ri-map-pin-line", label: "Location", value: profile.location },
];

const Footer = () => {
  return (
    <footer id="contact" className="mx-auto mt-24 max-w-[1440px] overflow-hidden px-6 pb-20 md:px-20">
      <div className="grid gap-0 lg:grid-cols-[326px_1fr]">
        {/* Kartu hitam */}
        <div className="flex flex-col justify-between gap-12 bg-black p-10 text-white">
          <div>
            <p className="text-2xl font-bold tracking-[0.04em]">
              {profile.brand}
              <span className="text-leaf">.</span>
            </p>
            <p className="mt-12 font-display text-2xl font-bold capitalize leading-snug">
              {profile.tagline[0]}
              <br />
              {profile.tagline[1]}
            </p>
          </div>
          <div>
            <p className="mb-4 capitalize">Stay in touch</p>
            <div className="flex gap-3">
              {[
                { href: profile.linkedin, icon: "ri-linkedin-fill", label: "LinkedIn" },
                { href: profile.github, icon: "ri-github-fill", label: "GitHub" },
                { href: profile.instagram, icon: "ri-instagram-line", label: "Instagram" },
              ]
                .filter((s) => s.href)
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center rounded-lg border border-white/40 hover:bg-white hover:text-black"
                  >
                    <i className={`${s.icon} ri-lg`}></i>
                  </a>
                ))}
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex size-10 items-center justify-center rounded-lg bg-white text-black"
              >
                <i className="ri-mail-line ri-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Kartu putih */}
        <div className="bg-white p-10 shadow-[4px_4px_67px_rgba(0,0,0,0.05)] md:px-12 md:py-12">
          <h3 className="mb-10 text-2xl font-bold text-black">Contact Information</h3>

          <ul className="flex flex-col gap-8">
            {contacts.map((c) => (
              <li key={c.label} className="flex items-center gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl text-emerald-700">
                  <i className={c.icon}></i>
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-black">{c.label}</p>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="break-words text-black/65 hover:text-emerald-700"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-black/65">{c.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <hr className="mt-12 border-black/20" />
          <p className="mt-5 flex items-center gap-1.5 text-xs text-black/65">
            <i className="ri-copyright-line"></i>
            {new Date().getFullYear()} Faris Raihan Nur Rahmat. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;