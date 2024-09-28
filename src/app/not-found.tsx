import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "MangaReader 404 error page",
};

export default function NotFound() {
  return (
    <div className="grid h-full place-items-center">
      <Image
        src="/assets/404cry.png"
        alt="404cry"
        height={320}
        width={320}
        className="w-[280px] flex-shrink-0"
      />
      <h1 className="text-5xl font-bold leading-[100px] text-[#9954BB]">404</h1>
      <h3 className="my-4 text-2xl font-extrabold">Page not found!</h3>
    </div>
  );
}
