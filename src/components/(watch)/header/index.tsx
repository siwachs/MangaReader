"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import useBodyOverflow from "@/hooks/useBodyOverflow";
import useOutsideClick from "@/hooks/useOutsideClick";
import ChapterLink from "@/components/buttons/chapterLink";

import {
  Download,
  HeartOutline,
  InformationCircleSolid,
  Share,
} from "@/components/icons";
import { FaCircleChevronDown, FaChevronLeft } from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";

import chapters from "@/data/chapters";

const Header: React.FC = () => {
  const [isChapterSelectOpen, setIsChapterSelectOpen] = useState(false);

  const headerContainerRef = useRef<HTMLDivElement>(null);
  const chapterSelectContainerRef = useRef<HTMLDivElement>(null);

  useBodyOverflow(isChapterSelectOpen);
  useOutsideClick(chapterSelectContainerRef, isChapterSelectOpen, () => {
    setIsChapterSelectOpen(false);
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!headerContainerRef.current) return;

      if (window.scrollY >= 60) headerContainerRef.current.style.top = "-100px";
      else headerContainerRef.current.style.top = "0";
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerContainerRef}
      className="fixed left-0 top-0 z-10 w-full bg-white transition-[top]"
    >
      <div className="mx-auto flex h-[60px] max-w-[1600px] items-center justify-between md:h-[100px]">
        <div className="ml-5 flex-1 md:flex md:items-center">
          <Link
            href="/"
            className="text-[var(--app-text-color-slate-gray)] md:text-[var(--app-text-color-crimson)]"
          >
            <FaChevronLeft className="size-4" />
          </Link>

          <Link href="/" className="hidden flex-shrink-0 md:inline-block">
            <Image
              priority
              src="/MangaToon.svg"
              alt="mangatoon"
              width={200}
              height={60}
              className="-mb-1 ml-[8px] h-[27px] w-[131px] lg:-mb-2.5 lg:ml-[63px] lg:h-[40px] lg:w-[194px]"
            />
          </Link>
        </div>

        <div className="w-1/2">
          <div className="mt-0.5 flex items-center justify-center gap-[7px] font-medium md:gap-[12px]">
            <div className="hide-text text-[15px] text-black md:text-xl">
              Episode 1
            </div>

            <button
              onClick={() => setIsChapterSelectOpen((prev) => !prev)}
              className="size-3 text-[var(--app-text-color-slate-gray)] md:size-4"
            >
              {isChapterSelectOpen ? (
                <FaTimesCircle className="size-[inherit]" />
              ) : (
                <FaCircleChevronDown className="size-[inherit]" />
              )}
            </button>
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

      {isChapterSelectOpen && (
        <div
          ref={chapterSelectContainerRef}
          className="fixed left-1/2 z-10 h-[calc(100vh-60px)] w-full max-w-[1220px] -translate-x-1/2 bg-white md:h-72"
        >
          <div className="hidden-scrollbar h-full flex-wrap justify-between overflow-auto p-[6px_3vw] md:flex">
            {chapters.map((chapter) => (
              <ChapterLink
                key={chapter._id}
                title={chapter.title}
                releaseDate={chapter.releaseDate}
                href="/watch/892982/38938"
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
