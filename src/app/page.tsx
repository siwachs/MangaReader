import { homeNavLinks } from "@/data/navlinks";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex h-[40px] w-full items-center justify-between overflow-auto border-y border-[var(--app-border-color-gray)] px-2.5 lg:hidden">
        {homeNavLinks.map((navLink) => (
          <div key={navLink.key} className="relative mx-2.5 flex-shrink-0">
            <Link href={navLink.link}>
              <span className="text-sm font-normal text-[var(--app-text-color-dark-slate)]">
                {navLink.label}
              </span>

              <div className="absolute" />
            </Link>
          </div>
        ))}
      </div>
      <div className="text-xl">Banner</div>
    </>
  );
}
