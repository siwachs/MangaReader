"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Chapter } from "@/types";
import useBodyOverflow from "@/hooks/useBodyOverflow";
import useOutsideClick from "@/hooks/useOutsideClick";
import ChapterLink from "@/components/buttons/chapterLink";

import { HiOutlineShare } from "react-icons/hi";
import { BiSolidErrorCircle } from "react-icons/bi";
import { RiHeartAdd2Line } from "react-icons/ri";
import { FiDownload } from "react-icons/fi";
import { FaCircleChevronDown, FaChevronLeft } from "react-icons/fa6";
import { FaTimesCircle, FaCaretDown } from "react-icons/fa";

const rightSectionButtonClasses =
  "box-content hidden h-[35px] w-[95px] items-center justify-center gap-[5px] rounded-[100px] border border-[var(--app-text-color-pinkish-red)] lg:inline-flex";

const Header: React.FC<{
  chapters: Chapter[];
  contentId: string;
  chapterId: string;
  contentTitle: string;
  chapterTitle: string;
}> = ({ chapters, contentId, chapterId, contentTitle, chapterTitle }) => {
  const [isChapterSelectOpen, setIsChapterSelectOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const headerContainerRef = useRef<HTMLDivElement>(null);
  const chapterSelectContainerRef = useRef<HTMLDivElement>(null);
  const moreMenuContainerRef = useRef<HTMLDivElement>(null);

  const toogleChapterSelect = () => setIsChapterSelectOpen((prev) => !prev);
  const toogleMoreMenu = () => setIsMoreMenuOpen((prev) => !prev);

  useBodyOverflow(isChapterSelectOpen || isMoreMenuOpen);

  useOutsideClick(
    chapterSelectContainerRef,
    isChapterSelectOpen,
    toogleChapterSelect,
  );
  useOutsideClick(moreMenuContainerRef, isMoreMenuOpen, toogleMoreMenu);

  useEffect(() => {
    const hideHeaderOnScroll = () => {
      const headerContainer = headerContainerRef.current;
      if (!headerContainer) return;

      if (window.scrollY >= 60) headerContainer.style.top = "-100px";
      else headerContainer.style.top = "0";
    };

    hideHeaderOnScroll();
    window.addEventListener("scroll", hideHeaderOnScroll);
    return () => window.removeEventListener("scroll", hideHeaderOnScroll);
  }, []);

  useEffect(() => {
    if (isChapterSelectOpen) {
      const chapter = document.getElementById(chapterId);

      chapter?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isChapterSelectOpen, chapterId]);

  return (
    <header
      ref={headerContainerRef}
      className="fixed left-0 top-0 z-10 w-full bg-[var(--app-bg-color-primary)] transition-[top]"
    >
      <div className="mx-auto flex h-[60px] max-w-[1600px] items-center justify-between md:h-[100px]">
        <div className="ml-5 flex-1 md:flex md:items-center">
          <Link
            href={`/${encodeURIComponent(contentTitle?.toLowerCase().replaceAll(" ", "-"))}?content_id=${contentId}`}
          >
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
              height={36}
              className="-mb-1 h-[27px] w-[131px] md:ml-[31px] lg:-mb-2.5 lg:ml-[63px] lg:h-[40px] lg:w-[194px]"
            />
          </Link>
        </div>

        <div className="w-1/2">
          <div className="mt-0.5 flex items-center justify-center gap-[7px] font-medium md:gap-3">
            <div className="truncate text-[15px] text-black md:text-xl">
              {chapterTitle}
            </div>

            <button
              aria-expanded={isChapterSelectOpen}
              aria-haspopup="true"
              aria-controls="chapters-list"
              onClick={toogleChapterSelect}
              className="size-[13px] md:size-4"
            >
              {isChapterSelectOpen ? (
                <FaTimesCircle className="size-[inherit]" color="grey" />
              ) : (
                <FaCircleChevronDown className="size-[inherit]" color="grey" />
              )}
            </button>
          </div>

          <p className="md:font-noto-sans-sc truncate text-center text-[10px]/[20px] font-medium text-neutral-400 sm:text-sm/[16px] md:font-normal">
            {contentTitle}
          </p>
        </div>

        <div className="relative mr-[15px] flex flex-1 items-center justify-end gap-2.5 text-[var(--app-text-color-pinkish-red)] sm:gap-5 md:mr-5 md:gap-6">
          <button aria-label="Download" className="hidden sm:inline-flex">
            <FiDownload className="size-5" />
          </button>

          <button
            aria-label="Share"
            className="hidden sm:inline-flex lg:hidden"
          >
            <HiOutlineShare className="size-5" />
          </button>

          <button className={rightSectionButtonClasses}>
            <HiOutlineShare className="size-5" />
            <span>Share</span>
          </button>

          <button className={rightSectionButtonClasses}>
            <RiHeartAdd2Line className="size-5" />
            <span>Collect</span>
          </button>

          <button aria-label="Like" className="lg:hidden">
            <RiHeartAdd2Line className="size-5" />
          </button>
          <button aria-label="Report Error" className="hidden sm:inline-flex">
            <BiSolidErrorCircle className="size-5 lg:size-6" color="gray" />
          </button>

          <div className="sm:hidden" ref={moreMenuContainerRef}>
            <button
              onClick={toogleMoreMenu}
              aria-expanded={isMoreMenuOpen}
              aria-controls="more-menu"
              aria-haspopup="true"
            >
              <FaCaretDown className="size-[22px] text-gray-500/70" />
            </button>

            <div
              id="more-menu"
              className={`absolute right-0 top-[24px] z-10 ${isMoreMenuOpen ? "block" : "hidden"} w-[150px] rounded-xl border border-gray-300 bg-[var(--app-bg-color-primary)] shadow-lg`}
            >
              <button
                onClick={toogleMoreMenu}
                className="my-1 flex h-7 w-full items-center gap-2 px-4"
              >
                <FiDownload className="size-5" />
                <span className="text-sm">Download</span>
              </button>

              <button
                onClick={toogleMoreMenu}
                className="my-1 flex h-7 w-full items-center gap-2 px-4"
              >
                <HiOutlineShare className="size-5" />
                <span className="text-sm">Share</span>
              </button>

              <button
                onClick={toogleMoreMenu}
                className="my-1 flex h-7 w-full items-center gap-2 px-4"
              >
                <BiSolidErrorCircle className="size-5" color="gray" />
                <span className="text-sm">Report Error</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={chapterSelectContainerRef}
        className={
          isChapterSelectOpen
            ? "fixed left-1/2 z-10 h-[calc(100vh-60px)] w-full max-w-[1220px] -translate-x-1/2 bg-[var(--app-bg-color-primary)] md:h-72"
            : "hidden"
        }
      >
        <div
          id="chapters-list"
          className="h-full overflow-auto p-[6px_3vw] pb-[84px] md:flex md:flex-wrap md:items-start md:justify-between"
        >
          {chapters.map((chapter) => (
            <ChapterLink
              id={chapter.id}
              dataActive={chapterId}
              key={chapter.id}
              title={chapter.title}
              releaseDate={chapter.createdAt}
              href={`/watch/${contentId}/${chapter.id}`}
              callback={toogleChapterSelect}
            />
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
