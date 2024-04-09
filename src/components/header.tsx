import Link from "next/link";
import Image from "next/image";

import { desktopNavLinks } from "@/data/navbarNavlinks";
import ChevronDown from "./icons/ChevronDown";
import SearchGlass from "./icons/SearchGlass";
import Bars3 from "./icons/Bars3";

const languages = [
  { name: "English", href: "/en", dataLink: "/en", dataLanguageCode: "en" },
  { name: "Indonesia", href: "/id", dataLink: "/id", dataLanguageCode: "id" },
  { name: "Español", href: "/es", dataLink: "/es", dataLanguageCode: "es" },
  { name: "Português", href: "/pt", dataLink: "/pt", dataLanguageCode: "pt" },
  { name: "ไทย", href: "/th", dataLink: "/th", dataLanguageCode: "th" },
];

const LanguagePicker = () => {
  return (
    <div className="absolute right-5 top-0.5 lg:relative">
      <label
        htmlFor="language-picker"
        className="flex cursor-pointer select-none items-center gap-[5px] text-sm text-[var(--app-text-color-dark-gray)]"
      >
        <span>English</span>
        <ChevronDown classNames="h-4 w-4" />
      </label>
      <input type="checkbox" hidden id="language-picker" />

      <div
        id="languages-list"
        className="absolute -right-5 top-[30px] z-10 hidden w-[120px] rounded-[10px] border border-[var(--app-border-color-gray)] bg-white py-2.5 text-sm lg:left-[50%] lg:w-40 lg:-translate-x-[50%]"
      >
        {languages.map((language) => (
          <Link
            key={language.name}
            href={language.href}
            data-link={language.dataLink}
            data-language-code={language.dataLanguageCode}
            className={`inline-block h-7 w-full px-4 py-1 ${language.name === "English" && "bg-red-200"}`}
          >
            <span className="ml-2.5 text-sm text-[var(--app-text-color-dark-gray)]">
              {language.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="fixed top-0 z-10 w-full bg-white">
      {/* Mobile Header */}
      <div className="relative w-full">
        <div className="mt-[18px] h-10">
          <Bars3 classNames="absolute left-5 top-0.5 h-[25px] w-[25px] cursor-pointer text-[var(--app-text-color-medium-gray)]" />

          <Link
            href="/"
            className="mx-[25%] flex h-[34px] w-1/2 items-center justify-center"
          >
            <Image
              src="/MangaToon.svg"
              alt="mangatoon"
              width={256}
              height={256}
              className="h-[27px] w-[131px]"
            />
          </Link>

          <LanguagePicker />
        </div>
      </div>

      {/* Large Screens Header */}
      <div className="mx-auto mb-5 mt-2.5 hidden h-[90px] max-w-[1200px] lg:block">
        <div className="flex h-10 items-center justify-end gap-5 text-sm">
          <Link href="/">Log In</Link>
          <Link href="/">History</Link>

          <LanguagePicker />
        </div>

        <div className="mt-2.5 flex h-[45px] items-center justify-between">
          <Link href="/">
            <Image
              src="/MangaToon.svg"
              alt="mangatoon"
              width={256}
              height={256}
              className="h-10 w-48"
            />
          </Link>
          <nav className="ml-5 flex flex-1 gap-5 font-bold text-[var(--app-navlink-color)]">
            {desktopNavLinks.map((navLink) => (
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
              href="/"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-red-500 text-red-500"
            >
              <SearchGlass classNames="h-6 w-6" />
            </Link>
            <Link
              href="/"
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
