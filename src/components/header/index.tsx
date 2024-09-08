import { Suspense } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

import LoadingSkeleton from "../utils/loadingSkeleton";
import ClientAuth from "@/components/buttons/clientAuth";
import { navLinks } from "./navlinks";

import { FaBars } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";

// Dynamic Imports
const MenuToggler = dynamic(() => import("./menuToggler"), {
  ssr: false,
  loading: () => (
    <FaBars
      role="status"
      aria-live="polite"
      aria-label="Loading menu toggler"
      className="absolute left-5 top-0.5 size-5 animate-pulse text-gray-500/70 lg:hidden"
    />
  ),
});
const LanguagePicker = dynamic(() => import("./languagePicker"), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading language picker"
      className="absolute right-5 top-0.5 flex animate-pulse items-center gap-1 text-xs md:relative md:right-0 md:top-0 md:text-sm"
    >
      <span className="sr-only">Loading Language Picker</span>
      <FaCaretDown className="size-[18px] text-gray-500/70" />
    </div>
  ),
});

const Header: React.FC = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-[var(--app-bg-color-primary)]">
      <div
        // Container
        className="relative mx-auto w-full max-w-[1200px] md:mb-5 md:mt-2.5 md:h-[90px]"
      >
        <div
          // Header Top
          className="mt-[18px] h-10 md:mt-0 md:flex md:items-center md:justify-end md:gap-5 md:text-sm"
        >
          <MenuToggler />

          <Suspense fallback={<LoadingSkeleton />}>
            <ClientAuth
              profileMenuPositionClasses="right-2.5 top-12"
              profileContainerClasses="hidden size-[42px] flex-shrink-0 md:inline"
              signInButtonClasses="hidden md:inline"
            />
          </Suspense>

          <Link className="hidden md:inline" href="/history">
            History
          </Link>

          <Link
            href="/"
            className="absolute left-1/2 top-0.5 -translate-x-1/2 md:hidden"
          >
            <Image
              priority
              src="/MangaToon.svg"
              alt="mangatoon"
              width={145}
              height={36}
              className="h-[27px] w-[131px]"
            />
          </Link>

          <LanguagePicker />
        </div>

        <div
          // Header Bottom
          className="mt-2.5 hidden h-[45px] md:flex md:items-center md:justify-between"
        >
          <Link href="/">
            <Image
              priority
              src="/MangaToon.svg"
              alt="mangatoon"
              width={206}
              height={46}
              className="h-10 md:w-[160px] lg:w-[194px]"
            />
          </Link>

          <nav className="hide-scrollbar ml-5 hidden flex-1 gap-5 overflow-auto whitespace-nowrap font-bold text-gray-600 lg:flex">
            {navLinks
              .filter((navlink) => !navlink.sidebarOnly)
              .map((navLink) => (
                <Link
                  key={navLink.key}
                  href={navLink.link}
                  className="hover:text-[var(--app-text-color-red)]"
                >
                  {navLink.label}
                </Link>
              ))}
          </nav>

          <div className="flex gap-2.5">
            <Link
              href="/search"
              className="flex size-[38px] items-center justify-center rounded-full border-[1.5px] border-red-500 text-red-500"
            >
              <BiSearchAlt className="size-5" />
            </Link>

            <Link
              href="/publish"
              className="h-10 rounded-[20px] bg-[var(--app-text-color-red)] px-6 text-sm leading-10 text-white hover:bg-red-500"
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
