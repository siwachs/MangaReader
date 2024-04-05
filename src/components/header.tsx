import Link from "next/link";
import Image from "next/image";

import { desktopNavLinks } from "@/data/navbarNavlinks";

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
          <div className="flex items-center gap-4 text-sm font-semibold">
            <Link className="text-[var(--app-navlink-color)]" href="/">
              Log In
            </Link>
            <Link className="text-[var(--app-text-color-dark-gray)]" href="/">
              History
            </Link>

            <div id="en">
              <div></div>
            </div>
          </div>

          <div></div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
