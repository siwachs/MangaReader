import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { encrypt } from "@/lib/encryption";

import NavLinks from "./NavLinks";
import SearchBox from "./SearchBox";
import ThemeModeButton from "../../../lib/Frontend-utils/ThemeModeButton";

import { Search } from "@mui/icons-material";

import { signIn, useSession } from "next-auth/react";

const DesktopHeader = () => {
  const { data, status } = useSession();

  const [searchMode, setSearchMode] = useState(false);

  return (
    <header className="sticky top-0 z-10 hidden bg-white shadow-sm dark:bg-gray-900 dark:shadow-white lg:flex">
      <div className="mx-auto mt-2.5 flex min-h-[80px] w-full max-w-[1200px] items-center justify-between">
        <Link href="/">
          <Image
            src="/MangaToon.svg"
            height={60}
            width={200}
            alt="logoImage"
            className="h-10 w-48"
          />
        </Link>

        <NavLinks />

        <div className="flex items-center gap-x-5">
          {searchMode ? (
            <SearchBox setSearchMode={setSearchMode} />
          ) : (
            <button
              className="h-10 w-10 rounded-full border-[0.5px] border-[var(--text-color-darkred)]"
              onClick={() => setSearchMode(true)}
            >
              <Search className="text-[var(--text-color)]" />
            </button>
          )}

          {!searchMode && (
            <Link
              className="rounded-3xl bg-[var(--text-color)] px-6 text-sm/10 text-white"
              href="/publish-your-work"
            >
              Publish
            </Link>
          )}

          {status === "authenticated" ? (
            <Link href={`/user-profile?uid=${encrypt(data?.user.uid)}`}>
              <Image
                height={60}
                width={60}
                className="h-11 w-11 rounded-full object-cover"
                src={`${data?.user.image}?timestamp=${Date.now()}`}
                alt="profile-picture"
              />
            </Link>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="inline-block whitespace-nowrap font-bold text-[var(--navlink-color)] hover:text-[var(--text-color)] dark:text-white"
            >
              Sign In
            </button>
          )}

          <ThemeModeButton buttonSize />
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
