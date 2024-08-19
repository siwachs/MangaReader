"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import ChapterLink from "./chapterLink";
import { Share, Bookmark, Book, Close } from "@/components/icons";
import {
  contentInteractionButtonClasses,
  contentInteractionButtonTextClasses,
} from "../_styles";
import { MenuType, ChaptersPayload } from "../_types";

const menuTypeClasses =
  "inline-block h-10 w-1/3 select-none text-center text-xs/[40px] data-[active=true]:pointer-events-none data-[active=false]:cursor-pointer data-[active=true]:border-b-2 data-[active=true]:border-[var(--app-text-color-red)] data-[active=true]:text-[var(--app-text-color-red)] md:h-20 md:w-auto md:border-none md:text-xl/[80px]";
const chaptersOrderClasses =
  "font-noto-sans-sc select-none font-normal data-[active=true]:pointer-events-none data-[active=false]:cursor-pointer data-[active=true]:text-[var(--app-text-color-crimson)]";

const ChaptersAndComments: React.FC<{
  initialChaptersPayload: ChaptersPayload;
}> = ({ initialChaptersPayload }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [infiniteScrollLoading, setInfiniteScrollLoading] =
    useState<boolean>(false);
  const [seeAll, setSeeAll] = useState<boolean>(false);

  const [chaptersOrder, setChaptersOrder] = useState<ChaptersOrder>("positive");
  const [menuType, setMenuType] = useState<MenuType>("chapters");

  const [chaptersPayload, setChaptersPayload] = useState<ChaptersPayload>({
    ...initialChaptersPayload,
  });

  // on Change Chapters Order
  useEffect(() => {
    containerRef.current?.scrollTo(0, 0);
    const getChapters = async () => {
      try {
        setInfiniteScrollLoading(true);

        const chaptersResponse = await fetch(
          `/api/chapters?pagination=true&chaptersOrder=${chaptersOrder}`,
        );
        const chaptersData = await chaptersResponse.json();
        const { error, chapters, ...restOfChaptersPayload } = chaptersData;
        setChaptersPayload((prev) => ({
          ...prev,
          infiniteScrollChapters: chapters,
          ...restOfChaptersPayload,
        }));
      } catch (error: any) {
      } finally {
        setInfiniteScrollLoading(false);
      }
    };

    getChapters();
  }, [chaptersOrder]);

  // on Infinite Scroll
  useEffect(() => {
    document.body.style.overflow = seeAll ? "hidden" : "auto";
    const container = containerRef.current;

    const getMoreChapters = async () => {
      try {
        setInfiniteScrollLoading(true);

        const chaptersResponse = await fetch(
          `/api/chapters?pagination=true&pageNumber=${chaptersPayload.pageNumber + 1}&chaptersOrder=${chaptersOrder}`,
        );
        const chaptersData = await chaptersResponse.json();
        const { error, chapters, ...restOfChaptersPayload } = chaptersData;

        setChaptersPayload((prev) => ({
          ...prev,
          infiniteScrollChapters: [...prev.infiniteScrollChapters, ...chapters],
          ...restOfChaptersPayload,
        }));
      } catch (error: any) {
      } finally {
        setInfiniteScrollLoading(false);
      }
    };

    const handleScroll = () => {
      if (!container || infiniteScrollLoading || !seeAll) return;

      const bottomOffset = container.scrollHeight - container.clientHeight;
      const scrolledToBottom = container.scrollTop >= bottomOffset * 0.9;
      const hasMore = chaptersPayload.pageNumber !== chaptersPayload.totalPages;

      if (scrolledToBottom && hasMore) {
        getMoreChapters();
      }
    };

    if (seeAll) {
      containerRef.current?.addEventListener("scroll", handleScroll);
    }

    return () => container?.removeEventListener("scroll", handleScroll);
  }, [
    seeAll,
    infiniteScrollLoading,
    chaptersPayload.infiniteScrollChapters,
    chaptersPayload.pageNumber,
    chaptersPayload.totalPages,
    chaptersOrder,
  ]);
  // Use Signals with fetch to optimize and only make fetch request for fetch and cancel previous fetch calls. It use to prevent fetch race ie AbortController

  const changeChapterOrder = (order: ChaptersOrder) => {
    if (chaptersOrder === order) return;

    setChaptersOrder(order);
    setChaptersPayload((prev) => ({
      ...prev,
      chapters: prev.chapters.slice().reverse(),
    }));
  };

  return (
    <>
      <div className="menu-wrapper mx-[5%] w-[90%] max-w-[1200px] md:mx-auto md:w-full">
        <div className="content-interaction-wrapper soft-edge-shadow fixed bottom-0 left-0 z-30 flex h-[60px] w-full items-center justify-between bg-white px-[5%] md:static md:mt-[40px] md:h-[50px] md:flex-row-reverse md:justify-end md:gap-[35px] md:px-0 md:shadow-none">
          <button className={contentInteractionButtonClasses}>
            <Share
              className="h-[13px] w-[13px] md:h-5 md:w-5"
              strokeWidth={2.1}
            />
            <span className={contentInteractionButtonTextClasses}>Share</span>
          </button>

          <button className={contentInteractionButtonClasses}>
            <Bookmark
              className="h-[13px] w-[13px] md:h-5 md:w-5"
              strokeWidth={2.1}
            />
            <span className={contentInteractionButtonTextClasses}>
              Subscribe
            </span>
          </button>

          <Link
            href="/"
            className={`pink-lift-shadow ${contentInteractionButtonClasses} w-[60%] bg-[var(--app-text-color-crimson)] text-[var(--app-text-color-near-white)]`}
          >
            <Book
              className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]"
              strokeWidth={2.1}
            />
            <span className="font-noto-sans-sc ml-2.5 inline-block text-[13px]/[37px] font-medium md:h-[29px] md:text-base/[29px]">
              Read Now
            </span>
          </Link>
        </div>

        <div className="menu-controls h-10 border-b border-black/[0.2] md:h-20">
          <div className="float-left w-[35%] text-gray-500/70 md:w-auto">
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

            <span className="mx-3.5 hidden text-black md:inline-block">/</span>

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

          <div className="float-right flex gap-[5px] text-xs/[40px] text-[var(--app-text-color-slate-gray)] md:text-sm/[89px]">
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

            <span className="text-black">/</span>

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

        <div className="font-noto-sans-sc float-left my-1 w-[90%] text-xs font-normal text-[var(--app-text-color-slate-gray)] md:hidden">
          <span>Updated to Chapter {chaptersPayload.totalChapters}</span>
        </div>
      </div>

      <div className="chapters-list mx-auto mb-5 w-full max-w-[1200px]">
        <div className="ml-[6%] w-[94%] md:ml-0 md:flex md:w-full md:flex-wrap md:justify-center">
          {chaptersPayload.chapters.slice(0, 6).map((chapter, index) => (
            <ChapterLink
              key={chapter._id}
              chapter={chapter}
              chaptersOrder={chaptersOrder}
              index={index}
              totalChapters={chaptersPayload.totalChapters}
            />
          ))}
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter") {
            setSeeAll(true);
          }
        }}
        onClick={() => setSeeAll(true)}
        className="see-all-button mx-auto mb-20 h-[42px] w-[80%] cursor-pointer rounded-lg bg-[var(--app-text-color-near-white)] text-center leading-[42px] text-gray-500/70 md:hidden"
      >
        See all
      </div>

      <div
        className={`infinite-scroll-list fixed left-0 top-0 z-50 ${seeAll ? "block" : "hidden"} h-screen w-full bg-black/50`}
      >
        <div
          ref={containerRef}
          className="fixed bottom-0 left-0 z-[60] max-h-[90vh] w-full overflow-auto rounded-t-[16px] bg-white"
        >
          <div className="fixed w-full rounded-t-[16px] bg-white">
            <p className="m-4 mt-4 text-center text-base font-medium">
              Popular Princess
            </p>

            <Close
              onClick={() => setSeeAll(false)}
              className="absolute right-4 top-4 h-[18px] w-[18px] cursor-pointer"
              strokeWidth={2}
            />

            <div className="mt-[8px] flex items-center justify-between px-4">
              <p className="text-[13px]">
                Updated to Chapter {chaptersPayload.totalChapters}
              </p>

              <div className="flex items-center text-[13px] leading-4">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    changeChapterOrder("positive");
                  }}
                  onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                    if (e.key === "Enter") {
                      changeChapterOrder("positive");
                    }
                  }}
                  data-active={chaptersOrder === "positive"}
                  className="data-[active=true]:text-[var(--app-text-color-bright-pink)]"
                >
                  <span>Positive</span>
                </div>

                <span>  |  </span>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    changeChapterOrder("reverse");
                  }}
                  onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                    if (e.key === "Enter") {
                      changeChapterOrder("reverse");
                    }
                  }}
                  data-active={chaptersOrder === "reverse"}
                  className="data-[active=true]:text-[var(--app-text-color-bright-pink)]"
                >
                  <span>Reverse</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${!infiniteScrollLoading && "mb-12"} mt-[100px] flex flex-wrap justify-between px-[4%]`}
          >
            {chaptersPayload.infiniteScrollChapters.map((chapter, index) => (
              <ChapterLink
                key={chapter._id}
                chapter={chapter}
                chaptersOrder={chaptersOrder}
                index={index}
                totalChapters={chaptersPayload.totalChapters}
              />
            ))}
          </div>

          {infiniteScrollLoading && (
            <div
              className={
                "loading-indicator my-6 flex items-center justify-center"
              }
            >
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[var(--app-text-color-bright-pink)]" />
              <div className="sr-only">Loading...</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChaptersAndComments;
