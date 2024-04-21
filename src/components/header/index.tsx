import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

import { navLinks } from "@/data/navlinks";
import { Bars3, ChevronDown, SearchGlass } from "../icons";

// Dynamic Imports
const MenuToggler = dynamic(() => import("./menuToggler"), {
  ssr: false,
  loading: () => (
    <Bars3 className="absolute left-5 top-0.5 h-[25px] w-[25px] animate-pulse cursor-not-allowed text-[var(--app-text-color-medium-gray)] lg:hidden" />
  ),
});

const languages = [
  { name: "English", href: "/en", dataLink: "/en", dataLanguageCode: "en" },
  { name: "Indonesia", href: "/id", dataLink: "/id", dataLanguageCode: "id" },
  { name: "Español", href: "/es", dataLink: "/es", dataLanguageCode: "es" },
  { name: "Português", href: "/pt", dataLink: "/pt", dataLanguageCode: "pt" },
  { name: "ไทย", href: "/th", dataLink: "/th", dataLanguageCode: "th" },
];

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-white">
      <div
        id="nav"
        className="relative h-auto w-full lg:mx-auto lg:mb-5 lg:mt-2.5 lg:h-[90px] lg:max-w-[1200px]"
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

          {/* Language Picker */}
          <div className="absolute right-5 top-0.5 lg:relative lg:right-0 lg:top-0">
            <label
              aria-label="language-switcher"
              htmlFor="language-switcher"
              className="flex cursor-pointer select-none items-center gap-1 text-xs text-[var(--app-text-color-dark-gray)] lg:text-sm"
            >
              <span>English</span>
              <ChevronDown className="h-4 w-4 lg:h-5 lg:w-5" />
            </label>
            <input type="checkbox" hidden id="language-switcher" />

            <div
              id="languages-list"
              className="absolute -right-5 top-[30px] z-10 hidden w-[120px] rounded-xl border border-[var(--app-border-color-gray)] bg-white py-2.5 text-xs lg:left-1/2 lg:right-0 lg:w-[150px] lg:-translate-x-1/2 lg:rounded-[10px] lg:text-sm"
            >
              {languages.map((language) => (
                <Link
                  key={language.name}
                  href={language.href}
                  data-link={language.dataLink}
                  data-language-code={language.dataLanguageCode}
                  className={`inline-block h-7 w-full px-4 py-1 ${language.name === "English" && "bg-gray-100"}`}
                >
                  <span className="ml-2.5 text-sm text-[var(--app-text-color-dark-gray)]">
                    {language.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
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
              className="h-10 w-48"
            />
          </Link>

          <nav className="ml-5 flex flex-1 gap-5 overflow-auto whitespace-nowrap font-bold text-[var(--app-navlink-color)]">
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
