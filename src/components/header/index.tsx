import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

import SidebarLoading from "./sidebarLoading";
import LanguagePickerLoading from "./languagePickerLoading";

import ClientAuth from "../buttons/clientAuth";
import { navLinks } from "@/data/navlinks";
import { SearchGlass } from "../icons";

// Dynamic Imports
const MenuToggler = dynamic(() => import("./menuToggler"), {
  ssr: false,
  loading: () => <SidebarLoading />,
});
const LanguagePicker = dynamic(() => import("./languagePicker"), {
  ssr: false,
  loading: () => <LanguagePickerLoading />,
});

const Header: React.FC = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white">
      <div
        id="nav"
        className="relative mx-auto w-full max-w-[1200px] md:mb-5 md:mt-2.5 md:h-[90px]"
      >
        <div
          id="top-nav"
          className="mt-[18px] h-10 md:mt-0 md:flex md:items-center md:justify-end md:gap-5 md:text-sm"
        >
          <MenuToggler />

          <ClientAuth profileContainerClasses="hidden size-[42px] flex-shrink-0 md:inline" />

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
              width={256}
              height={256}
              className="h-[27px] w-[131px]"
            />
          </Link>

          <LanguagePicker />
        </div>

        <div
          id="bottom-nav"
          className="mt-2.5 hidden h-[45px] items-center justify-between md:flex"
        >
          <Link href="/">
            <Image
              priority
              src="/MangaToon.svg"
              alt="mangatoon"
              width={256}
              height={256}
              className="h-10 md:w-[160px] lg:w-[194px]"
            />
          </Link>

          <nav className="hidden-scrollbar ml-5 hidden flex-1 gap-5 overflow-auto whitespace-nowrap font-bold text-[var(--app-navlink-color)] md:text-sm lg:flex lg:text-base">
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
              <SearchGlass className="h-5 w-5" strokeWidth={2.3} />
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
