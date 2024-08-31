"use client";

import useBodyOverflow from "@/hooks/useBodyOverflow";
import React, { useState, useEffect, useRef } from "react";
import getKeydownEvent from "@/libs/eventHandlers/getKeydownEvent";

import {
  CHAPTERS_LIST_DEFAULT_PAGE_NUMBER,
  CHAPTERS_LIST_DEFAULT_PAGE_SIZE,
} from "@/constants";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { Chapter } from "@/types";
import ChapterLink from "@/components/buttons/chapterLink";

import { LiaTimesSolid } from "react-icons/lia";
import { FaBell, FaChevronDown } from "react-icons/fa6";

type ChaptersOrder = "reverse" | "positive";
type ChaptersPayload = {
  chapters: Chapter[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

const chaptersOrderBtnClasses =
  "select-none data-[active=true]:pointer-events-none data-[active=false]:cursor-pointer data-[active=true]:text-[var(--app-text-color-bright-pink)]";

const ChaptersList: React.FC<{
  contentId: string;
  title: string;
  updatedOn: string;
  chapters: Chapter[];
}> = ({ contentId, title, updatedOn, chapters }) => {
  const [chaptersOrder, setChaptersOrder] = useState<ChaptersOrder>("reverse");

  const containerRef = useRef<HTMLDivElement>(null);
  const [chaptersPayload, setChaptersPayload] = useState<ChaptersPayload>({
    chapters: chapters.slice(0, CHAPTERS_LIST_DEFAULT_PAGE_SIZE),
    pageNumber: CHAPTERS_LIST_DEFAULT_PAGE_NUMBER,
    pageSize: CHAPTERS_LIST_DEFAULT_PAGE_SIZE,
    totalPages: chapters.length / CHAPTERS_LIST_DEFAULT_PAGE_SIZE,
  });

  const resetChaptersPayload = () => {
    setChaptersPayload((prev) => ({
      ...prev,
      chapters: chapters.slice(0, CHAPTERS_LIST_DEFAULT_PAGE_SIZE),
      pageNumber: 1,
    }));
  };

  const changeOrderToReverse = () => {
    if (chaptersOrder === "reverse") return;

    chapters.reverse();
    setChaptersOrder("reverse");
    resetChaptersPayload();
  };
  const changeOrderToPositive = () => {
    if (chaptersOrder === "positive") return;

    chapters.reverse();
    setChaptersOrder("positive");
    resetChaptersPayload();
  };

  const [infiniteScroll, setInfiniteScroll] = useState(false);
  const [showAll, setShowAll] = useState(false);
  useBodyOverflow(infiniteScroll);

  const toogleInfiniteScroll = () => setInfiniteScroll((prev) => !prev);
  const infiniteScrollToogleKeyDown = getKeydownEvent(toogleInfiniteScroll);
  const toogleShowAll = () => setShowAll((prev) => !prev);
  const showAllToogleKeyDown = getKeydownEvent(toogleShowAll);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (!container) return;

      const bottomOffset = container.scrollHeight - container.clientHeight;
      const scrolledToBottom = container.scrollTop >= bottomOffset * 0.9;
      const hasMore = chaptersPayload.pageNumber !== chaptersPayload.totalPages;

      if (scrolledToBottom && hasMore) {
        setChaptersPayload((prev) => {
          const startingIndex =
            (prev.pageNumber + 1) * CHAPTERS_LIST_DEFAULT_PAGE_SIZE;
          const endingIndex = startingIndex + CHAPTERS_LIST_DEFAULT_PAGE_SIZE;
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

  const date = parseISO(updatedOn);
  const formattedDate = format(date, "dd/MM/yy");
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });
  const formattedUpdateOn = `${formattedDate} . ${timeAgo}`;

  return (
    <div className="detail-episodes mt-[30px]">
      <div className="detail-title mx-auto mt-2 flex max-w-[1200px] justify-between px-4 md:mt-3 md:justify-start md:px-0">
        <p className="ml-4 text-lg font-bold md:ml-0 md:text-2xl">
          {title} Chapters
        </p>

        <DetailSubscribe
          formattedDate={formattedDate}
          formattedUpdateOn={formattedUpdateOn}
        />

        <ChaptersOrder
          mobileOnly
          order={chaptersOrder}
          changeOrderToReverse={changeOrderToReverse}
          changeOrderToPositive={changeOrderToPositive}
        />
      </div>

      <ChaptersOrder
        order={chaptersOrder}
        changeOrderToReverse={changeOrderToReverse}
        changeOrderToPositive={changeOrderToPositive}
      />

      <DetailSubscribe
        mobileOnly
        formattedDate={formattedDate}
        formattedUpdateOn={formattedUpdateOn}
      />

      <div className="detail-episodes-continer mx-auto max-w-[1200px] flex-wrap justify-between md:flex">
        {chapters.length === 0 && (
          <div className="m-4 font-bold">No Chapters updated yet.</div>
        )}

        {chapters.slice(0, showAll ? chapters.length : 3).map((chapter) => (
          <ChapterLink
            key={chapter.id}
            title={chapter.title}
            releaseDate={chapter.createdAt}
            href={`/watch/${contentId}/${chapter.id}`}
          />
        ))}

        {chapters.length > 3 && (
          <div
            role="button"
            tabIndex={0}
            onClick={toogleInfiniteScroll}
            onKeyDown={infiniteScrollToogleKeyDown}
            className="mx-4 my-2 flex cursor-pointer items-center justify-center rounded-lg bg-gray-100 px-4 py-3 text-gray-500/70 md:hidden"
          >
            View All Chapters &nbsp;&nbsp;&nbsp;&gt;&gt;&gt;
          </div>
        )}

        {infiniteScroll && (
          <div className="fixed inset-0 z-[999] bg-[var(--app-backdrop-color-black)] md:hidden">
            <div
              ref={containerRef}
              className="fixed bottom-0 left-0 right-0 h-[90vh] overflow-auto rounded-t-2xl bg-white"
            >
              <div className="fixed w-full rounded-t-2xl bg-white">
                <p className="m-4 text-center text-base font-medium">{title}</p>
                <LiaTimesSolid
                  tabIndex={0}
                  role="button"
                  aria-label="Close Chapters List"
                  onClick={toogleInfiniteScroll}
                  onKeyDown={infiniteScrollToogleKeyDown}
                  className="absolute right-4 top-4 size-5"
                />

                <div className="mt-2 flex items-center justify-between px-4 text-[13px]">
                  <p>Update to chapters {chapters.length}</p>

                  <ChaptersOrder
                    mobileOnly
                    order={chaptersOrder}
                    changeOrderToReverse={changeOrderToReverse}
                    changeOrderToPositive={changeOrderToPositive}
                  />
                </div>
              </div>

              <div className="mb-10 mt-[100px]">
                {chaptersPayload.chapters.map((chapter) => (
                  <ChapterLink
                    key={chapter.id}
                    title={chapter.title}
                    releaseDate={chapter.createdAt}
                    href={`/watch/${contentId}/${chapter.id}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div
          role="button"
          tabIndex={0}
          onClick={toogleShowAll}
          onKeyDown={showAllToogleKeyDown}
          className="mb-4 hidden h-[68px] w-80 items-center justify-center gap-1.5 rounded-lg bg-gray-100 text-gray-500/70 md:flex"
        >
          <span>{showAll ? "Hide Chapters" : "View All Chapters"}</span>
          <FaChevronDown
            className={`size-3.5 ${showAll ? "-rotate-180" : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

const DetailSubscribe: React.FC<{
  mobileOnly?: boolean;
  formattedDate: string;
  formattedUpdateOn: string;
}> = ({ mobileOnly, formattedDate, formattedUpdateOn }) => {
  return (
    <div
      className={
        mobileOnly
          ? "mx-4 my-2 flex items-center justify-between rounded-lg bg-gray-100 px-4 py-3 md:hidden"
          : "ml-3.5 hidden items-center gap-2 font-normal text-[var(--app-text-color-bright-pink)] md:flex"
      }
    >
      <p className="select-none text-sm/[18px] font-normal text-gray-500/70">
        {mobileOnly
          ? `Updated on ${formattedDate}`
          : `Updated on ${formattedUpdateOn}`}
      </p>

      <button className="flex items-center gap-1 text-sm text-[var(--app-text-color-bright-pink)] md:gap-1.5">
        <FaBell className="size-3" />
        <span>Subscribe</span>
      </button>
    </div>
  );
};

const ChaptersOrder: React.FC<{
  mobileOnly?: boolean;
  order: ChaptersOrder;
  changeOrderToReverse: () => void;
  changeOrderToPositive: () => void;
}> = ({ mobileOnly, order, changeOrderToReverse, changeOrderToPositive }) => {
  return (
    <div
      className={
        mobileOnly
          ? "flex items-center text-[13px] leading-4 md:hidden"
          : "mx-auto mb-6 hidden max-w-[1200px] items-center justify-end text-lg font-normal md:flex"
      }
    >
      <button
        onClick={changeOrderToReverse}
        className={chaptersOrderBtnClasses}
        data-active={order === "reverse"}
      >
        Reverse
      </button>

      <span className="mx-1 text-[var(--app-text-color-pale-silver)]">|</span>

      <button
        onClick={changeOrderToPositive}
        className={chaptersOrderBtnClasses}
        data-active={order === "positive"}
      >
        Positive
      </button>
    </div>
  );
};

export default ChaptersList;
