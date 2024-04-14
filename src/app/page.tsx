import Link from "next/link";

import { homeNavLinks } from "@/data/navlinks";

export default function Home() {
  return (
    <>
      <div className="flex h-[40px] w-full items-center justify-between overflow-auto border-y border-[var(--app-border-color-gray)] px-2.5 lg:hidden">
        {homeNavLinks.map((navLink) => (
          <div key={navLink.key} className="relative mx-2.5 flex-shrink-0">
            <Link href={navLink.link}>
              <span className="text-sm font-normal leading-[37px] text-[var(--app-text-color-dark-slate)]">
                {navLink.label}
              </span>

              {navLink.link === "/" && (
                <div className="absolute bottom-0 left-1/2 h-[5px] w-[25px] -translate-x-1/2 rounded-[200px] bg-[var(--app-text-color-crimson)]" />
              )}
            </Link>
          </div>
        ))}
      </div>
      <div className="text-xl">Banner</div>
    </>
  );
}
