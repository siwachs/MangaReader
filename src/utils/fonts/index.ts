import { Comic_Neue } from "next/font/google";
import localFont from "next/font/local";

const nunito = localFont({
  src: [
    { path: "./Nunito-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./Nunito-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  preload: true,
});

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

export { nunito, comicNeue };
