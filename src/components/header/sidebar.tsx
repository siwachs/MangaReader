import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import useOutsideClick from "@/hooks/useOutsideClick";
import useBodyOverflow from "@/hooks/useBodyOverflow";

import getKeydownEvent from "@/libs/eventHandlers/getKeydownEvent";
import ModelOverlay from "../utils/modelOverlay";
import { navLinks } from "./navlinks";

import { IoClose } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";

const Sidebar: React.FC<{
  isSidebarOpen: boolean;
  setIsSidebarOpen: () => void;
}> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  useBodyOverflow(isSidebarOpen);

  useOutsideClick(sidebarRef, isSidebarOpen, setIsSidebarOpen);
  const onKeyDown = getKeydownEvent(setIsSidebarOpen);

  return (
    <ModelOverlay blackBgHalfOpacity>
      <div
        ref={sidebarRef}
        className="hide-scrollbar fixed inset-0 z-[9999] w-[80%] max-w-sm overflow-auto bg-[var(--app-bg-color-primary)]"
      >
        <div className="ml-[25px] mt-[28px] h-[27px]">
          <Image
            priority
            src="/MangaToon.svg"
            alt="mangatoon"
            width={145}
            height={36}
            className="h-[27px] w-[131px]"
          />
        </div>

        <Link href="/search" onClick={setIsSidebarOpen}>
          <div className="m-5 flex h-[42px] flex-shrink-0 items-center justify-between overflow-hidden rounded-[10px] border border-gray-400 text-lg text-gray-300">
            <div className="ml-2.5 text-lg">Search</div>

            <BiSearchAlt className="mr-2.5 size-[22px]" />
          </div>
        </Link>

        <nav className="mx-5 mb-5">
          {navLinks.map((navLink) => {
            const { key, Icon, link, label } = navLink;

            return (
              <Link key={key} href={link} onClick={setIsSidebarOpen}>
                <div className="flex h-[60px] flex-shrink-0 items-center gap-[15px] font-bold text-gray-800">
                  <Icon className="size-4" />
                  <span>{label}</span>
                </div>

                <div className="h-[1px] w-full bg-gray-300" />
              </Link>
            );
          })}
        </nav>
      </div>

      <IoClose
        tabIndex={0}
        role="button"
        onClick={setIsSidebarOpen}
        onKeyDown={onKeyDown}
        aria-label="Close Sidebar"
        className="fixed right-[25px] top-[25px] z-[9999] size-9 text-white"
      />
    </ModelOverlay>
  );
};

export default Sidebar;
