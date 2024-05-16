"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ChevronDown,
  ChevronLeft,
  Download,
  HeartOutline,
  InformationCircleSolid,
  Share,
} from "@/components/icons";

const Header: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      if (window.scrollY >= 60) containerRef.current.style.top = "-100px";
      else containerRef.current.style.top = "0";
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={containerRef}
      className="fixed left-0 top-0 z-10 w-full bg-white"
    >
      <div className="mx-auto flex h-[60px] max-w-[1600px] items-center justify-between md:h-[100px]">
        <div className="ml-[15px] flex-1 md:flex md:items-center md:gap-2.5">
          <Link href="/">
            <ChevronLeft className="h-[26px] w-[26px] text-[var(--app-text-color-slate-gray)] md:h-10 md:w-10 md:text-[var(--app-text-color-crimson)]" />
          </Link>

          <Link href="/" className="hidden flex-shrink-0 md:inline-block">
            <Image
              priority
              src="/MangaToon.svg"
              alt="mangatoon"
              width={200}
              height={60}
              className="-mb-1 h-[27px] w-[131px] lg:-mb-2.5 lg:h-[40px] lg:w-[194px]"
            />
          </Link>
        </div>

        <div className="w-1/2">
          <div className="mt-0.5 flex items-center justify-center gap-[7px] font-medium md:gap-[12px]">
            <div className="hide-text text-[15px] text-black md:text-xl">
              Episode 1
            </div>
            <span className="flex h-3 w-3 cursor-pointer items-center justify-center rounded-full bg-[var(--app-text-color-slate-gray)] text-white md:h-4 md:w-4">
              <ChevronDown />
            </span>
          </div>

          <p className="hide-text md:font-noto-sans-sc text-center text-[10px]/[20px] font-medium text-[var(--app-text-color-slate-gray)] md:text-sm/[16px] md:font-normal">
            Isekai Shoukan Sareta Kita Seijo-sama ga &apos;Kareshi ga
            Shinda&apos; to Naku Bakari de Hataraite kuremasen
          </p>
        </div>

        <div className="mr-[15px] flex flex-1 items-center justify-end gap-[8px] text-[var(--app-text-color-pinkish-red)] md:gap-[23px]">
          <Download
            className="h-[15px] w-[15px] md:h-5 md:w-5"
            strokeWidth={2.2}
          />

          <Share className="hidden h-5 w-5 md:inline-block lg:hidden" />

          <div className="box-content hidden h-[35px] w-[95px] items-center justify-center gap-[5px] rounded-[100px] border border-[var(--app-text-color-pinkish-red)] lg:flex">
            <Share className="h-4 w-4" />
            <span>Share</span>
          </div>

          <div className="box-content hidden h-[35px] w-[95px] items-center justify-center gap-[5px] rounded-[100px] border border-[var(--app-text-color-pinkish-red)] lg:flex">
            <HeartOutline className="h-4 w-4" strokeWidth={2.2} />
            <span>Collect</span>
          </div>

          <HeartOutline
            className="h-[15px] w-[15px] md:h-5 md:w-5 lg:hidden"
            strokeWidth={2.2}
          />
          <InformationCircleSolid className="h-[15px] w-[15px] md:h-[26px] md:w-[26px]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
