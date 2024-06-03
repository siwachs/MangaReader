"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import UserProfile from "../users/userProfile";
import { homeNavLinks } from "@/data/navlinks";

const HomeNav: React.FC = () => {
  const currentUrl = usePathname();

  const session = useSession();
  const { data, status } = session;

  return (
    <nav className="hidden-scrollbar flex h-[40px] w-full items-center justify-between overflow-auto border-y border-[var(--app-border-color-gray)] px-2.5 md:hidden">
      {homeNavLinks.map((navLink) => {
        const { key, link, label } = navLink;

        if (
          key === "signin" &&
          (status === "loading" || status === "authenticated")
        ) {
          return (
            <div
              key={key}
              className="mx-2.5 size-[30px] flex-shrink-0 sm:size-[52px]"
            >
              <UserProfile
                status={status}
                avatarUrl={data?.user.avatar}
                profileName={data?.user.name}
                callbackUrl={currentUrl}
              />
            </div>
          );
        }

        return (
          <div key={key} className="relative mx-2.5 flex-shrink-0">
            <Link
              href={
                key === "signin" ? `${link}?callbackurl=${currentUrl}` : link
              }
            >
              <span className="text-sm font-normal leading-[37px] text-[var(--app-text-color-dark-slate)]">
                {label}
              </span>

              <div
                className={`${currentUrl === link ? "block" : "hidden"} absolute bottom-0 left-1/2 h-[5px] w-[25px] -translate-x-1/2 rounded-[200px] bg-[var(--app-text-color-crimson)]`}
              />
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default HomeNav;
