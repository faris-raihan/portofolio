import {
  SiReact, SiTailwindcss, SiJavascript, SiFigma, SiHtml5, SiPython,
  SiQgis, SiGooglemaps, SiGoogleearthengine,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import {
  LuSatellite, LuLeaf, LuBuilding2, LuTrees, LuMonitorSmartphone,
  LuSmartphone, LuMap, LuChartColumn, LuCode,
} from "react-icons/lu";

// nama alat (huruf kecil) -> [ikon, warna]
const ICONS = {
  "react js": [SiReact, "#61DAFB"],
  "tailwind css": [SiTailwindcss, "#06B6D4"],
  javascript: [SiJavascript, "#D4B106"],
  figma: [SiFigma, "#F24E1E"],
  html: [SiHtml5, "#E34F26"],
  css: [FaCss3Alt, "#1572B6"],
  "responsive design": [LuMonitorSmartphone, "#404040"],
  "real device": [LuSmartphone, "#404040"],
  "google maps api": [SiGooglemaps, "#4285F4"],
  qgis: [SiQgis, "#589632"],
  "qgis molusce": [SiQgis, "#589632"],
  "google earth engine": [SiGoogleearthengine, "#4285F4"],
  "landsat 8": [LuSatellite, "#404040"],
  ndvi: [LuLeaf, "#2E7D32"],
  ndbi: [LuBuilding2, "#6B7280"],
  "random forest": [LuTrees, "#2E7D32"],
  python: [SiPython, "#3776AB"],
  "map design": [LuMap, "#404040"],
  "data visualization": [LuChartColumn, "#404040"],
};

// "React JS • Tailwind CSS" -> ["React JS", "Tailwind CSS"]
export const splitTools = (s) =>
  s.split("•").map((t) => t.trim()).filter(Boolean);

export const ToolChips = ({ tools }) => (
  <div className="flex w-full flex-wrap justify-center gap-2.5">
    {splitTools(tools).map((name) => {
      const [Icon, color] = ICONS[name.toLowerCase()] ?? [LuCode, "#404040"];
      return (
        <span
          key={name}
          className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2.5 text-base font-medium text-black"
        >
          <Icon size={22} color={color} aria-hidden="true" />
          {name}
        </span>
      );
    })}
  </div>
);