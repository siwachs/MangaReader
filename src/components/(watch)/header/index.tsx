"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

import {
  ChevronDown,
  Download,
  HeartOutline,
  InformationCircleSolid,
} from "@/components/icons";

const Header: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      if (window.scrollY >= 60) containerRef.current.style.top = "-60px";
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
      <div className="flex h-[60px] items-center justify-between">
        <div className="ml-5 flex-1">
          <Link href="/">
            <ChevronDown
              strokeWidth={3.6}
              className="h-[22px] w-[22px] rotate-90 text-[var(--app-text-color-slate-gray)]"
            />
          </Link>
        </div>

        <div className="w-1/2">
          <div className="mt-0.5 flex items-center justify-center gap-[7px] font-medium">
            <div className="hide-text text-[15px] text-black">Episode 1</div>
            <span className="flex h-3 w-3 cursor-pointer items-center justify-center rounded-full bg-[var(--app-text-color-slate-gray)] text-white">
              <ChevronDown />
            </span>
          </div>

          <p className="hide-text text-center text-[10px]/[20px] font-medium text-[var(--app-text-color-slate-gray)]">
            Isekai Shoukan Sareta Kita Seijo-sama ga &apos;Kareshi ga
            Shinda&apos; to Naku Bakari de Hataraite kuremasen
          </p>
        </div>

        <div className="flex flex-1 items-center justify-end text-[var(--app-text-color-pinkish-red)]">
          <Download className="mr-[8px] h-[15px] w-[15px]" strokeWidth={2.2} />
          <HeartOutline
            className="mr-[8px] h-[15px] w-[15px]"
            strokeWidth={2.2}
          />
          <InformationCircleSolid className="mr-[15px] h-[15px] w-[15px]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
