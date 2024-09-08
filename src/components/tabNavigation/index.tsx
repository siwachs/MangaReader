"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import LoadingSkeleton from "../utils/loadingSkeleton";
import { LinkObject } from "@/types";
import ClientAuth from "../buttons/clientAuth";

const tabNavigationLinks: LinkObject[] = [
  { key: "home", label: "Home", link: "/" },
  { key: "comics", label: "Comics", link: "/genre/all/0" },
  { key: "search", label: "Search", link: "/search" },
  { key: "booklist", label: "Booklist", link: "/book/list" },
  {
    key: "signin",
    label: "Sign In",
    link: "/api/auth/signin",
  },
];

const TabNavigation: React.FC = () => {
  const currentURL = usePathname();

  const getActiveTab = (currentURL: string, link: string) => {
    if (currentURL === link) return true;

    const currentURLParts = currentURL.split("/");
    const linkParts = link.split("/");

    return currentURLParts[1] === linkParts[1];
  };

  return (
    <nav className="hide-scrollbar flex h-10 w-full items-center justify-between overflow-auto border-y border-gray-300 px-2.5 md:hidden">
      {tabNavigationLinks.map((navLink) => {
        const { key, link, label } = navLink;

        return key === "signin" ? (
          <Suspense fallback={<LoadingSkeleton />}>
            <ClientAuth
              key={key}
              profileContainerClasses="mx-2.5 size-[30px] flex-shrink-0 sm:size-[32px]"
              signInButtonClasses="text-sm font-normal leading-[37px] whitespace-nowrap text-gray-800"
            />
          </Suspense>
        ) : (
          <div key={key} className="relative mx-2.5 flex-shrink-0">
            <Link href={link}>
              <span className="text-sm font-normal leading-[37px] text-gray-800">
                {label}
              </span>

              <div
                className={`${getActiveTab(currentURL, link) ? "block" : "hidden"} absolute bottom-0 left-1/2 h-[5px] w-[25px] -translate-x-1/2 rounded-[200px] bg-[var(--app-text-color-crimson)]`}
              />
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default TabNavigation;
