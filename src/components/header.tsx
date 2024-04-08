import Link from "next/link";
import Image from "next/image";

import { desktopNavLinks } from "@/data/navbarNavlinks";
import ChevronDown from "./icons/ChevronDown";

const languages: {
  name: string;
  href: string;
  dataLink: string;
  dataLanguageCode: string;
}[] = [
  { name: "English", href: "/en", dataLink: "/en", dataLanguageCode: "en" },
  { name: "Indonesia", href: "/id", dataLink: "/id", dataLanguageCode: "id" },
  { name: "Español", href: "/es", dataLink: "/es", dataLanguageCode: "es" },
  { name: "Português", href: "/pt", dataLink: "/pt", dataLanguageCode: "pt" },
  { name: "ไทย", href: "/th", dataLink: "/th", dataLanguageCode: "th" },
];

const Header: React.FC = () => {
  return (
    <header className="hidden bg-white lg:block">
      <div className="mx-auto flex max-w-[1220px] items-center justify-between">
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
              className="hover:text-[var(--app-text-color-red)]"
              href={navLink.link}
              key={navLink.key}
            >
              {navLink.label}
            </Link>
          ))}
        </nav>

        <nav>
          <div className="flex items-center gap-5 text-sm font-semibold">
            <Link className="text-[var(--app-navlink-color)]" href="/">
              Log In
            </Link>
            <Link className="text-[var(--app-text-color-dark-gray)]" href="/">
              History
            </Link>

            <div>
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
                className="absolute -top-[100%] w-40 rounded-[10px] border border-[var(--app-border-color-gray)] bg-white py-2.5 transition-all"
              >
                {languages.map((language) => (
                  <Link
                    data-link={language.dataLink}
                    data-language-code={language.dataLanguageCode}
                    href={language.href}
                    key={language.name}
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

          <div></div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
