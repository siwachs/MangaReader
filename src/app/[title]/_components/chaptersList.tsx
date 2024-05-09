"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { BellSolid, ChevronDown, Close } from "@/components/icons";
import { Chapter } from "../_types";

type ChaptersOrder = "reverse" | "positive";
type ChaptersPayload = {
  chapters: Chapter[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

const chaptersOrderBtnClasses =
  "select-none data-[active=true]:pointer-events-none data-[active=false]:cursor-pointer data-[active=true]:text-[var(--app-text-color-vibrant-pink)]";

const ChaptersList: React.FC<{
  title: string;
  reminderText: string;
  allChapters: Chapter[];
}> = ({ title, reminderText, allChapters }) => {
  const chapters = allChapters;
  const PAGE_SIZE = 18;
  const initialChaptersPayload: ChaptersPayload = {
    chapters: chapters.slice(0, PAGE_SIZE),
    pageNumber: 1,
    pageSize: PAGE_SIZE,
    totalPages: chapters.length / PAGE_SIZE,
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [chaptersPayload, setChaptersPayload] = useState<ChaptersPayload>(
    initialChaptersPayload,
  );
  const [chaptersOrder, setChaptersOrder] = useState<ChaptersOrder>("reverse");
  const [infiniteScroll, setInfiniteScroll] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const changeChapterOrder = (order: ChaptersOrder) => {
    if (order === chaptersOrder) return;
    chapters.reverse();

    setChaptersOrder(order);
    setChaptersPayload(initialChaptersPayload);
  };

  useEffect(() => {
    document.body.style.overflow = infiniteScroll ? "hidden" : "auto";
  }, [infiniteScroll]);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (!container) return;

      const bottomOffset = container.scrollHeight - container.clientHeight;
      const scrolledToBottom = container.scrollTop >= bottomOffset * 0.9;
      const hasMore = chaptersPayload.pageNumber !== chaptersPayload.totalPages;

      if (scrolledToBottom && hasMore) {
        setChaptersPayload((prev) => {
          const startingIndex = (prev.pageNumber + 1) * PAGE_SIZE;
          const endingIndex = startingIndex + PAGE_SIZE;
          const nextChapters = chapters.slice(startingIndex, endingIndex);

          return {
            ...prev,
            chapters: [...prev.chapters, ...nextChapters],
            pageNumber: prev.pageNumber + 1,
          };
        });
      }
    };

    if (infiniteScroll) {
      container?.addEventListener("scroll", handleScroll);
    }

    return () => container?.removeEventListener("scroll", handleScroll);
  }, [
    infiniteScroll,
    chaptersPayload.pageNumber,
    chaptersPayload.totalPages,
    chaptersPayload.chapters,
    chapters,
  ]);

  return (
    <div className="detail-episodes mt-[30px]">
      <div className="detail-title mx-auto mt-2 flex max-w-[1200px] justify-between px-4 md:mt-3 md:justify-start md:px-0">
        <p className="ml-4 text-lg font-[700] text-[var(--app-text-color-dark-gray)] md:ml-0 md:text-2xl">
          {title} Chapters
        </p>

        <div className="detail-subscribe ml-2.5 hidden cursor-pointer items-center gap-0.5 text-sm font-[400] text-[var(--app-text-color-bright-pink)] md:flex">
          <BellSolid className="h-3 w-3" />
          <span>Update reminder</span>
        </div>

        <ChaptersOrderMobileOnly
          chaptersOrder={chaptersOrder}
          changeChapterOrder={changeChapterOrder}
        />
      </div>

      <div className="mx-auto mb-6 hidden max-w-[1200px] items-center justify-end text-lg font-[400] text-[var(--app-text-color-dark-gray)] md:flex">
        <span
          role="button"
          tabIndex={0}
          onClick={() => changeChapterOrder("reverse")}
          onKeyDown={(e: React.KeyboardEvent<HTMLSpanElement>) => {
            if (e.key === "Enter") {
              changeChapterOrder("reverse");
            }
          }}
          className={chaptersOrderBtnClasses}
          data-active={chaptersOrder === "reverse"}
        >
          Reverse
        </span>
        <span className="text-[var(--app-text-color-pale-silver)]">  |  </span>
        <span
          role="button"
          tabIndex={0}
          onClick={() => changeChapterOrder("positive")}
          onKeyDown={(e: React.KeyboardEvent<HTMLSpanElement>) => {
            if (e.key === "Enter") {
              changeChapterOrder("positive");
            }
          }}
          className={chaptersOrderBtnClasses}
          data-active={chaptersOrder === "positive"}
        >
          Positive
        </span>
      </div>

      <div className="detail-subscribe mx-4 my-2 flex items-center justify-between rounded-lg bg-[var(--app-text-color-very-light-gray)] px-4 py-3 md:hidden">
        <p className="text-sm/[18px] font-[400] text-[var(--app-text-color-medium-gray)]">
          {reminderText}
        </p>

        <div className="flex cursor-pointer items-center gap-0.5 text-right text-xs text-[var(--app-text-color-bright-pink)]">
          <BellSolid className="h-3 w-3" />
          <span>Update reminder</span>
        </div>
      </div>

      <div className="detail-episodes-continer mx-auto max-w-[1200px] flex-wrap justify-between md:flex">
        {chapters.slice(0, showAll ? allChapters.length : 3).map((chapter) => (
          <ChapterLink
            key={chapter._id}
            title={chapter.title}
            releaseDate={chapter.releaseDate}
            href="/"
          />
        ))}

        <div
          role="button"
          tabIndex={0}
          onClick={() => setInfiniteScroll(true)}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") {
              setInfiniteScroll(true);
            }
          }}
          className="mx-4 my-2 flex cursor-pointer items-center justify-center rounded-lg bg-[var(--app-text-color-very-light-gray)] px-4 py-3 text-[var(--app-text-color-medium-gray)] md:hidden"
        >
          View All Chapters &nbsp;&nbsp;&nbsp;&gt;&gt;&gt;
        </div>

        {infiniteScroll && (
          <div className="fixed inset-0 z-[999] bg-[var(--app-backdrop-color-black)] md:hidden">
            <div
              ref={containerRef}
              className="fixed bottom-0 left-0 right-0 h-[90vh] overflow-auto rounded-t-2xl bg-white"
            >
              <div className="fixed w-full rounded-t-2xl bg-white text-[var(--app-text-color-dark-gray)]">
                <p className="m-4 text-center text-base font-[500]">{title}</p>
                <Close
                  className="absolute right-4 top-4 h-5 w-5 cursor-pointer"
                  onClick={() => setInfiniteScroll(false)}
                />
                <div className="mt-2 flex items-center justify-between px-4 text-[13px]">
                  <p>Update to chapters {chapters.length}</p>

                  <ChaptersOrderMobileOnly
                    chaptersOrder={chaptersOrder}
                    changeChapterOrder={changeChapterOrder}
                  />
                </div>
              </div>

              <div className="mb-10 mt-[100px]">
                {chaptersPayload.chapters.map((chapter) => (
                  <ChapterLink
                    key={chapter._id}
                    title={chapter.title}
                    releaseDate={chapter.releaseDate}
                    href="/"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            setShowAll((prev) => !prev);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            setShowAll((prev) => !prev);
          }}
          className="mb-4 box-content hidden h-[43px] w-[288px] cursor-pointer items-center justify-center gap-1 rounded-lg bg-[var(--app-text-color-very-light-gray)] px-4 py-3 text-base text-[var(--app-text-color-medium-gray)] md:flex"
        >
          <span>{showAll ? "Hide All Chapters" : "View All Chapters"}</span>
          <ChevronDown
            className={`h-4 w-4 ${showAll ? "-rotate-180" : ""} text-[var(--app-text-color-medium-gray)]`}
            strokeWidth={2.6}
          />
        </div>
      </div>
    </div>
  );
};

const ChaptersOrderMobileOnly: React.FC<{
  chaptersOrder: ChaptersOrder;
  changeChapterOrder: (order: ChaptersOrder) => void;
}> = ({ chaptersOrder, changeChapterOrder }) => {
  return (
    <div className="flex items-center text-[13px] leading-4 md:hidden">
      <span
        role="button"
        tabIndex={0}
        onClick={() => changeChapterOrder("reverse")}
        onKeyDown={(e: React.KeyboardEvent<HTMLSpanElement>) => {
          if (e.key === "Enter") {
            changeChapterOrder("reverse");
          }
        }}
        className={chaptersOrderBtnClasses}
        data-active={chaptersOrder === "reverse"}
      >
        Reverse
      </span>
      <span className="mx-1 text-[var(--app-text-color-pale-silver)]">|</span>
      <span
        role="button"
        tabIndex={0}
        onClick={() => changeChapterOrder("positive")}
        onKeyDown={(e: React.KeyboardEvent<HTMLSpanElement>) => {
          if (e.key === "Enter") {
            changeChapterOrder("positive");
          }
        }}
        className={chaptersOrderBtnClasses}
        data-active={chaptersOrder === "positive"}
      >
        Positive
      </span>
    </div>
  );
};

const ChapterLink: React.FC<{
  title: string;
  releaseDate: string;
  href: string;
}> = React.memo(({ title, releaseDate, href }) => {
  return (
    <div className="mx-4 my-2 rounded-lg bg-[var(--app-text-color-very-light-gray)] px-4 py-3 md:m-0 md:mb-4 md:w-80">
      <div className="flex items-center justify-between">
        <Link href={href}>
          <p className="text-sm/[18px] font-[400] text-[var(--app-text-color-dark-gray)]">
            {title}
          </p>
          <p className="mt-2.5 text-xs font-[400] text-[var(--app-text-color-medium-gray)]">
            release date {releaseDate}
          </p>
        </Link>

        <ChevronDown
          className="h-4 w-4 cursor-pointer text-[var(--app-text-color-medium-gray)]"
          strokeWidth={2.6}
        />
      </div>
    </div>
  );
});

ChapterLink.displayName = "ChapterLink";

export default ChaptersList;
