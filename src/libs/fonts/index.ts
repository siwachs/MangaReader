import { Roboto } from "next/font/google";
import localFont from "next/font/local";

export const nunito = localFont({
  src: [
    { path: "./Nunito-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./Nunito-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});
