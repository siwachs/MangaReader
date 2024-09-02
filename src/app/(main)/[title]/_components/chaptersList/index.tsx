"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import getKeydownEvent from "@/libs/eventHandlers/getKeydownEvent";

import {
  CHAPTERS_LIST_DEFAULT_PAGE_NUMBER,
  CHAPTERS_LIST_DEFAULT_PAGE_SIZE,
} from "@/constants";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { Chapter } from "@/types";
import ModelOverlay from "@/components/utils/modelOverlay";
import ChaptersOrder from "./chaptersOrder";
import ChapterLink from "@/components/buttons/chapterLink";

import { FaBell, FaChevronDown } from "react-icons/fa6";

// Dynamic Imports
const InfiniteScrollWithClientHeight = dynamic(
  () => import("./chaptersListInfiniteScroll/infiniteScrollWithClientHeight"),
  {
    ssr: false,
    loading: () => (
      <ModelOverlay blackBgHalfOpacity mobileOnly>
        <div className="fixed bottom-0 left-0 right-0 h-[90vh] animate-pulse rounded-t-2xl bg-gray-400" />
      </ModelOverlay>
    ),
  },
);

export type ChaptersOrder = "reverse" | "positive";
export type ChaptersPayload = {
  chapters: Chapter[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

const ChaptersList: React.FC<{
  contentId: string;
  title: string;
  updatedOn: string;
  chapters: Chapter[];
}> = ({ contentId, title, updatedOn, chapters }) => {
  const [chaptersOrder, setChaptersOrder] = useState<ChaptersOrder>("reverse");
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

  const toogleInfiniteScroll = () => setInfiniteScroll((prev) => !prev);
  const infiniteScrollToogleKeyDown = getKeydownEvent(toogleInfiniteScroll);
  const toogleShowAll = () => setShowAll((prev) => !prev);
  const showAllToogleKeyDown = getKeydownEvent(toogleShowAll);

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
          <InfiniteScrollWithClientHeight
            infiniteScroll={infiniteScroll}
            title={title}
            toogleInfiniteScroll={toogleInfiniteScroll}
            infiniteScrollToogleKeyDown={infiniteScrollToogleKeyDown}
            chaptersOrder={chaptersOrder}
            changeOrderToReverse={changeOrderToReverse}
            changeOrderToPositive={changeOrderToPositive}
            chapters={chapters}
            chaptersPayload={chaptersPayload}
            setChaptersPayload={setChaptersPayload}
            contentId={contentId}
          />
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

export default ChaptersList;
