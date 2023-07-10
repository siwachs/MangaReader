import Link from "next/link";

import { signIn, useSession } from "next-auth/react";

import { encrypt } from "@/lib/encryption";

const Links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Trending",
    href: "/genre/tags/trending",
  },
  {
    title: "Genre",
    href: "/genre/tags/all",
  },
  {
    title: "Novels",
    href: "/genre/tags/novels",
  },
  {
    title1: "Sign In",
    title2: "User Profile",
  },
];

const MobileNavLinks = () => {
  const { status, data } = useSession();

  return (
    <nav className="flex h-[2.5rem] items-center justify-evenly border-y border-[color:var(--border-color-primary)] dark:border-gray-200 sm:h-[2.625rem] lg:hidden">
      {Links.map((item, index) =>
        item.href ? (
          <div key={index} className="mobile-navlinks">
            <Link href={item.href}>{item.title}</Link>
          </div>
        ) : status === "authenticated" ? (
          <div
            key={index}
            className="mobile-navlinks text-[var(--text-color-darkred)]"
          >
            <Link href={`/user-profile?uid=${encrypt(data?.user.uid)}`}>
              {item.title2}
            </Link>
          </div>
        ) : (
          <button
            key={index}
            className="mobile-navlinks text-[var(--text-color-darkred)] dark:text-[var(--text-color)]"
            onClick={() => signIn("google")}
          >
            Sign In
          </button>
        )
      )}
    </nav>
  );
};

export default MobileNavLinks;
