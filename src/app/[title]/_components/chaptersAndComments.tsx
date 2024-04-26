"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import {
  Like,
  CommentSolid,
  Share,
  Bookmark,
  BookOpen,
} from "@/components/icons";

const menuTypeClasses =
  "inline-block h-10 w-1/3 select-none text-center text-xs/[40px] data-[active=true]:pointer-events-none data-[active=false]:cursor-pointer data-[active=true]:border-b-2 data-[active=true]:border-[var(--app-text-color-red)] data-[active=false]:text-[var(--app-text-color-medium-gray)] data-[active=true]:text-[var(--app-text-color-red)] md:h-20 md:w-auto md:border-none md:text-xl/[80px]";
const chaptersOrderClasses =
  "font-noto-sans-sc select-none font-[400] data-[active=true]:pointer-events-none data-[active=false]:cursor-pointer data-[active=true]:text-[var(--app-text-color-crimson)] data-[active=false]:text-[var(--app-text-color-slate-gray)]";

const ChaptersAndComments: React.FC = () => {
  const [chaptersOrder, setChaptersOrder] = useState<"positive" | "reverse">(
    "positive",
  );
  const [chaptersPayload, setChaptersPayload] = useState<{
    chapters: {
      _id: string;
      title: string;
      releaseDate: string;
      noOfLike: number;
      noOfComments: number;
    }[];
    totalChapters: number;
  }>({ chapters: [], totalChapters: 0 });

  const [menuType, setMenuType] = useState<"chapters" | "comments">("chapters");
  useEffect(() => {
    const getChapters = async () => {
      try {
        const response = await fetch("/api/chapters");
        const data = await response.json();
        setChaptersPayload({
          chapters: data.chapters,
          totalChapters: data.totalChapters,
        });
      } catch (error: any) {}
    };

    getChapters();
  }, []);

  const changeChapterOrder = (order: "positive" | "reverse") => {
    if (order === chaptersOrder) return;
    setChaptersOrder(order);
    setChaptersPayload({
      chapters: chaptersPayload.chapters.slice().reverse(),
      totalChapters: chaptersPayload.totalChapters,
    });
  };

  return (
    <>
      <div className="menu-wrapper mx-[5%] w-[90%] max-w-[1200px] md:mx-auto md:w-full">
        <div className="h-10 w-full max-w-[1200px] border-b border-black border-opacity-[0.2] md:h-20">
          <div className="float-left w-[35%] md:w-auto">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setMenuType("chapters")}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter") {
                  setMenuType("chapters");
                }
              }}
              data-active={menuType === "chapters"}
              className={`${menuTypeClasses} md:pr-2.5`}
            >
              <span>Chapters</span>
            </div>

            <span className="font-noto-sans-sc hidden text-sm/[16px] text-[var(--app-text-color-slate-gray)] md:inline-block">
              Updated to Chapter {chaptersPayload.totalChapters}
            </span>

            <span className="mx-3.5 hidden md:inline-block">/</span>

            <div
              role="button"
              tabIndex={0}
              onClick={() => setMenuType("comments")}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter") {
                  setMenuType("comments");
                }
              }}
              data-active={menuType === "comments"}
              className={`${menuTypeClasses} ml-5 md:ml-0 md:pr-2.5`}
            >
              <span>Comments</span>
            </div>

            <span className="font-noto-sans-sc hidden text-sm/[16px] text-[var(--app-text-color-slate-gray)] md:inline-block">
              (5772)
            </span>
          </div>

          <div className="float-right flex gap-[5px] text-xs/[40px] md:text-sm/[89px]">
            <div
              role="button"
              tabIndex={0}
              onClick={() => changeChapterOrder("positive")}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter") {
                  changeChapterOrder("positive");
                }
              }}
              data-active={chaptersOrder === "positive"}
              className={chaptersOrderClasses}
            >
              <span>Positive</span>
            </div>

            <span>/</span>

            <div
              role="button"
              tabIndex={0}
              onClick={() => changeChapterOrder("reverse")}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter") {
                  changeChapterOrder("reverse");
                }
              }}
              data-active={chaptersOrder === "reverse"}
              className={chaptersOrderClasses}
            >
              <span>Reverse</span>
            </div>
          </div>
        </div>

        <div className="font-noto-sans-sc float-left my-1 w-[90%] text-xs font-[400] text-[var(--app-text-color-slate-gray)] md:hidden">
          <span>Updated to Chapter {chaptersPayload.totalChapters}</span>
        </div>
      </div>

      <div className="mx-auto mb-5 w-full max-w-[1200px]">
        <div className="ml-[6%] w-[94%] overflow-hidden md:w-full">
          {chaptersPayload.chapters.slice(0, 6).map((chapter, index) => (
            <Link
              href="/"
              key={chapter._id}
              className="m-[8px_8px_0_0] inline-block min-h-10 w-[45.8%] rounded-[10px] bg-[var(--app-text-color-near-white)] pb-2.5 pl-2.5 pt-[6px] text-[var(--app-text-color-black)] md:min-h-[60px] md:w-[270px] md:p-[6px_0_8px_15px]"
            >
              <div className="h-[24px] text-xs md:text-sm">
                <span className="mr-5">
                  {chaptersOrder === "positive"
                    ? index + 1
                    : chaptersPayload.totalChapters - index}
                </span>
                <span className="hide-text">{chapter.title}</span>
              </div>

              <div className="text-xs text-[var(--app-text-color-medium-gray)] md:text-sm">
                <span>{chapter.releaseDate}</span>
                <div className="flex items-center gap-[5px]">
                  <Like className="h-[12px] w-[12px]" fill="#999" />
                  <span>{chapter.noOfLike}</span>
                  <CommentSolid className="h-[10px] w-[10px]" fill="#999" />
                  <span>{chapter.noOfComments}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto mb-[80px] h-[42px] w-[80%] rounded-lg bg-[var(--app-text-color-near-white)] text-center leading-[42px] text-[var(--app-text-color-medium-gray)] md:hidden">
        See all
      </div>

      <div className="soft-edge-shadow fixed bottom-0 left-0 z-30 flex h-[60px] w-full items-center justify-between bg-white px-[5%] md:hidden">
        <button className="flex h-[36px] w-[15%] items-center justify-center rounded-[100px] border border-[var(--app-text-color-crimson)] text-[var(--app-text-color-crimson)]">
          <Share className="h-[13px] w-[13px]" strokeWidth={2.1} />
        </button>

        <button className="flex h-[36px] w-[15%] items-center justify-center rounded-[100px] border border-[var(--app-text-color-crimson)] text-[var(--app-text-color-crimson)]">
          <Bookmark className="h-[13px] w-[13px]" strokeWidth={2.1} />
        </button>

        <Link
          href="/"
          className="pink-lift-shadow flex h-[36px] w-[60%] items-center justify-center rounded-[100px] bg-[var(--app-text-color-crimson)] text-[var(--app-text-color-near-white)]"
        >
          <BookOpen className="h-[14px] w-[14px]" strokeWidth={2.1} />
          <span className="font-noto-sans-sc ml-2.5 inline-block text-[13px]/[37px] font-[500]">
            Read Now
          </span>
        </Link>
      </div>
    </>
  );
};

export default ChaptersAndComments;
