"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import useBodyOverflow from "@/hooks/useBodyOverflow";
import useOutsideClick from "@/hooks/useOutsideClick";
import ChapterLink from "@/components/buttons/chapterLink";

import { HiOutlineShare } from "react-icons/hi";
import { BiSolidErrorCircle } from "react-icons/bi";
import { RiHeartAdd2Line } from "react-icons/ri";
import { FiDownload } from "react-icons/fi";
import { FaCircleChevronDown, FaChevronLeft } from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";
import chapters from "@/data/chapters";

const rightSectionButtonClasses =
  "box-content hidden h-[35px] w-[95px] items-center justify-center gap-[5px] rounded-[100px] border border-[var(--app-text-color-pinkish-red)] lg:inline-flex";

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
          <Link href="/">
            <FaChevronLeft
              className="size-[18px] md:hidden md:size-[26px] md:text-[var(--app-text-color-crimson)]"
              color="grey"
            />
            <FaChevronLeft className="hidden size-[26px] text-[var(--app-text-color-crimson)] md:inline-block" />
          </Link>

          <Link href="/" className="hidden md:inline-block">
            <Image
              priority
              src="/MangaToon.svg"
              alt="mangatoon"
              width={200}
              height={60}
              className="-mb-1 h-[27px] w-[131px] md:ml-[31px] lg:-mb-2.5 lg:ml-[63px] lg:h-[40px] lg:w-[194px]"
            />
          </Link>
        </div>

        <div className="w-1/2">
          <div className="mt-0.5 flex items-center justify-center gap-[7px] font-medium md:gap-3">
            <div className="truncate text-[15px] text-black md:text-xl">
              Episode 1
            </div>

            <button
              onClick={() => setIsChapterSelectOpen((prev) => !prev)}
              className="size-3 md:size-4"
            >
              {isChapterSelectOpen ? (
                <FaTimesCircle className="size-[inherit]" color="grey" />
              ) : (
                <FaCircleChevronDown className="size-[inherit]" color="grey" />
              )}
            </button>
          </div>

          <p className="md:font-noto-sans-sc truncate text-center text-[10px]/[20px] font-medium text-neutral-400 md:text-sm/[16px] md:font-normal">
            Isekai Shoukan Sareta Kita Seijo-sama ga &apos;Kareshi ga
            Shinda&apos; to Naku Bakari de Hataraite kuremasen
          </p>
        </div>

        <div className="mr-[15px] flex flex-1 items-center justify-end gap-2 text-[var(--app-text-color-pinkish-red)] sm:gap-5 md:mr-5 md:gap-6">
          <FiDownload className="size-4 md:size-5" />

          <HiOutlineShare className="size-4 lg:hidden" />

          <div className={rightSectionButtonClasses}>
            <HiOutlineShare className="size-4" />
            <span>Share</span>
          </div>

          <div className={rightSectionButtonClasses}>
            <RiHeartAdd2Line className="size-4" />
            <span>Collect</span>
          </div>

          <RiHeartAdd2Line className="size-4 lg:hidden" />
          <BiSolidErrorCircle className="size-[17px] md:size-6" color="gray" />
        </div>
      </div>

      <div
        ref={chapterSelectContainerRef}
        className={
          isChapterSelectOpen
            ? "fixed left-1/2 z-10 h-[calc(100vh-60px)] w-full max-w-[1220px] -translate-x-1/2 bg-white md:h-72"
            : "hidden"
        }
      >
        <div className="hide-scrollbar h-full flex-wrap justify-between overflow-auto p-[6px_3vw] md:flex">
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
    </header>
  );
};

export default Header;
