import Link from "next/link";
import Image from "next/image";

import { desktopNavLinks } from "@/data/navbarNavlinks";
import ChevronDown from "./icons/ChevronDown";
import SearchGlass from "./icons/SearchGlass";

const languages = [
  { name: "English", href: "/en", dataLink: "/en", dataLanguageCode: "en" },
  { name: "Indonesia", href: "/id", dataLink: "/id", dataLanguageCode: "id" },
  { name: "Español", href: "/es", dataLink: "/es", dataLanguageCode: "es" },
  { name: "Português", href: "/pt", dataLink: "/pt", dataLanguageCode: "pt" },
  { name: "ไทย", href: "/th", dataLink: "/th", dataLanguageCode: "th" },
];

const Header = () => {
  return (
    <header className="fixed top-0 hidden w-full bg-white lg:block">
      <div className="mx-auto mb-5 mt-2.5 h-[90px] max-w-[1200px]">
        <div className="flex h-10 items-center justify-end gap-5 text-sm">
          <Link href="/">Log In</Link>
          <Link href="/">History</Link>
          <div className="relative">
            <label
              htmlFor="language-picker"
              className="flex cursor-pointer select-none items-center gap-1 text-[var(--app-text-color-dark-gray)]"
            >
              <span>English</span>
              <ChevronDown />
            </label>
            <input type="checkbox" hidden id="language-picker" />
            <div
              id="languages-list"
              className="absolute left-[50%] top-8 z-10 hidden w-40 -translate-x-[50%] rounded-[10px] border border-[var(--app-border-color-gray)] bg-white py-2.5"
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
