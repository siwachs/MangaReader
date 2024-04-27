import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";

import { Close, SearchGlass } from "../icons";
import { navLinks } from "@/data/navlinks";

const Sidebar: React.FC<{
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setSidebarOpen }) => {
  return (
    <div
      role="menu"
      tabIndex={0}
      aria-label="close-sidebar"
      className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
    >
      <div className="fixed inset-0 z-50 w-[80%] max-w-sm overflow-auto bg-white">
        <div className="ml-[25px] mt-[28px] h-[27px]">
          <Image
            priority
            src="/MangaToon.svg"
            alt="mangatoon"
            width={256}
            height={256}
            className="h-[27px] w-[131px]"
          />
        </div>

        <Link href="en/search">
          <div className="m-5 flex h-[42px] flex-shrink-0 items-center justify-between overflow-hidden rounded-[10px] border border-[var(--app-text-medium-dark-gray)] text-lg text-gray-300">
            <div className="ml-2.5 text-lg">Search</div>

            <div className="mr-2.5">
              <SearchGlass classNames="h-[18px] w-[18px]" strokeWidth={2.6} />
            </div>
          </div>
        </Link>

        <nav className="mx-5 mb-5">
          {navLinks.map((navLink) => {
            const { key, Icon, link, label } = navLink;

            return (
              <React.Fragment key={key}>
                <Link href={link} onClick={() => setSidebarOpen(false)}>
                  <div className="flex h-[60px] flex-shrink-0 items-center gap-[15px] text-base font-bold text-gray-800">
                    <Icon classNames="h-[16px] w-[16px]" strokeWidth={2.6} />
                    <span>{label}</span>
                  </div>
                </Link>
                <div className="h-[1px] w-full bg-gray-300" />
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      <Close
        className="fixed right-[25px] top-[25px] z-30 h-[32px] w-[32px] cursor-pointer text-white"
        strokeWidth={2.6}
        onClick={() => setSidebarOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
