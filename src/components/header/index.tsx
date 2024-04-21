import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

import LanguagePicker from "./languagePicker";
import { navLinks } from "@/data/navlinks";
import { Bars3, SearchGlass } from "../icons";

// Dynamic Imports
const MenuToggler = dynamic(() => import("./menuToggler"), {
  ssr: false,
  loading: () => (
    <Bars3 className="absolute left-5 top-0.5 h-[25px] w-[25px] animate-pulse cursor-not-allowed text-[var(--app-text-color-medium-gray)] lg:hidden" />
  ),
});

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-white">
      <div
        id="nav"
        className="relative mx-auto w-full max-w-[1200px] lg:mb-5 lg:mt-2.5 lg:h-[90px]"
      >
        <div
          id="top-nav"
          className="mt-[18px] h-10 lg:mt-0 lg:flex lg:items-center lg:justify-end lg:gap-5 lg:text-sm"
        >
          <MenuToggler />

          <Link className="hidden lg:inline" href="/signin">
            Sign In
          </Link>
          <Link className="hidden lg:inline" href="/history">
            History
          </Link>

          <Link
            href="/"
            className="absolute left-1/2 top-0.5 -translate-x-1/2 lg:hidden"
          >
            <Image
              priority
              src="/MangaToon.svg"
              alt="mangatoon"
              width={256}
              height={256}
              className="h-[27px] w-[131px]"
            />
          </Link>

          <LanguagePicker />
        </div>

        <div
          id="bottom-nav"
          className="mt-2.5 hidden h-[45px] items-center justify-between lg:flex"
        >
          <Link href="/">
            <Image
              priority
              src="/MangaToon.svg"
              alt="mangatoon"
              width={256}
              height={256}
              className="h-10 w-[194px]"
            />
          </Link>

          <nav className="ml-5 flex flex-1 flex-shrink-0 gap-5 overflow-auto whitespace-nowrap text-base font-bold text-[var(--app-navlink-color)]">
            {navLinks.map(
              (navLink) =>
                !navLink.sidebarOnly && (
                  <Link
                    key={navLink.key}
                    href={navLink.link}
                    className="hover:text-[var(--app-text-color-red)]"
                  >
                    {navLink.label}
                  </Link>
                ),
            )}
          </nav>

          <div className="flex gap-2.5">
            <Link
              href="/search"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-red-500 text-red-500"
            >
              <SearchGlass classNames="h-5 w-5" strokeWidth={2.3} />
            </Link>

            <Link
              href="/publish"
              className="inline-block h-10 rounded-[20px] bg-[var(--app-text-color-red)] px-6 text-sm leading-10 text-white hover:bg-red-500"
            >
              Publish
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
