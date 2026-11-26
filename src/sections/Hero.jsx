import { profile, images } from "../data";
import StarTrail from "../components/StarTrail";
import Starfield from "../components/Starfield";
import OrbitSatellite from "../components/OrbitSatellite";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[720px] overflow-hidden bg-black text-white md:min-h-[820px]">
      {/* Bumi + satelit yang mengorbit. Satu wadah supaya skalanya selalu sama. */}
      <div className="pointer-events-none absolute bottom-0 right-0 w-full md:w-[72%]">
        <img
          src={images.earth}
          alt=""
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="block w-full"
        />
        <OrbitSatellite />
      </div>

      {/* Bintang latar yang berkelip + bintang jatuh */}
      <Starfield />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

      {/* Bintang yang mengikuti kursor */}
      <StarTrail />

      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[1440px] flex-col justify-center px-6 pt-32 pb-16 md:min-h-[820px] md:px-20">
        <div className="animate__animated animate__fadeInUp">
          <p className="text-2xl text-zinc-300 md:text-4xl">Hi, I'm</p>
          <h1
            className="mt-1 font-display leading-[1.1]"
            style={{ fontSize: "clamp(36px, 5.6vw, 84px)" }}
          >
            {profile.name}
          </h1>

          {/* Peran: garis tipis di kiri + dua baris rapi */}
          <div className="mt-8 border-l border-white/40 pl-5">
            <p className="text-xl font-medium uppercase tracking-[0.12em] text-white md:text-2xl">
              {profile.roles[0]}
            </p>
            <p className="mt-1 text-base uppercase tracking-[0.12em] text-zinc-400 md:text-lg">
              {profile.roles[1]}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-3 text-lg md:mt-auto md:pt-40 md:text-xl">
          <a href="#about" className="bg-white px-8 py-4 font-medium text-black hover:bg-zinc-200">
            About Me
          </a>
          <a href="#project" className="border border-white bg-black px-8 py-4 font-medium text-white hover:bg-white hover:text-black">
            See Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;