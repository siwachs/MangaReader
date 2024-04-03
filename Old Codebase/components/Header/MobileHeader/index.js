import { useState } from "react";

import { Menu } from "@mui/icons-material";

import Image from "next/image";
import Link from "next/link";

import ThemeModeButton from "../../../lib/Frontend-utils/ThemeModeButton";
import Backdrop from "./Backdrop";
import SideBar from "./SideBar";

const MobileHeader = ({ applyShadow }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <>
      <header
        className={`sticky top-0 z-10 bg-white pb-2 pt-5 dark:bg-gray-900 lg:hidden ${
          applyShadow ? "box-Shadow" : ""
        }`}
      >
        <div className="relative">
          <button
            onClick={() => setIsSideBarOpen(true)}
            className="absolute left-5 top-0"
          >
            <Menu />
          </button>

          <Link
            href="/"
            className="mx-auto flex w-fit items-center justify-center"
          >
            <Image
              src="/MangaToon.svg"
              width={150}
              height={100}
              alt="logoImage"
              className="h-7 w-[132px]"
            />
          </Link>

          <div className="absolute right-5 top-0">
            <ThemeModeButton />
          </div>
        </div>
      </header>

      {isSideBarOpen && (
        <>
          <Backdrop closeSideBar={setIsSideBarOpen} />
          <SideBar setIsSideBarOpen={setIsSideBarOpen} />
        </>
      )}
    </>
  );
};

export default MobileHeader;
