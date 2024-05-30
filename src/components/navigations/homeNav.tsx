"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { homeNavLinks } from "@/data/navlinks";

const HomeNav: React.FC = () => {
  const pathName = usePathname();
  // /api/auth/login?callbackurl=/admin

  return (
    <nav className="flex h-[40px] w-full items-center justify-between overflow-auto border-y border-[var(--app-border-color-gray)] px-2.5 md:hidden">
      {homeNavLinks.map((navLink) => (
        <div key={navLink.key} className="relative mx-2.5 flex-shrink-0">
          <Link href={navLink.link}>
            <span className="text-sm font-normal leading-[37px] text-[var(--app-text-color-dark-slate)]">
              {navLink.label}
            </span>

            <div
              className={`${pathName === navLink.link ? "block" : "hidden"} absolute bottom-0 left-1/2 h-[5px] w-[25px] -translate-x-1/2 rounded-[200px] bg-[var(--app-text-color-crimson)]`}
            />
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default HomeNav;
