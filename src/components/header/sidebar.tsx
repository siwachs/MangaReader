import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";

const Sidebar: React.FC<{
  closeSidebar: Dispatch<SetStateAction<boolean>>;
}> = ({ closeSidebar }) => {
  return (
    <div
      role="menu"
      tabIndex={0}
      aria-label="close-sidebar"
      className="fixed inset-0 z-20 bg-black/50"
    >
      <div className="fixed inset-0 z-30 w-[80%] overflow-auto bg-white">
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
          <div className="m-5 h-10 overflow-hidden rounded-[10px] border border-[var(--app-text-medium-dark-gray)]">
            <div className="ml-2.5 h-10 text-lg leading-10 text-gray-300">
              Search
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
