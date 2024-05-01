"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import {
  Like,
  CommentSolid,
  Share,
  Bookmark,
  BookOpen,
  Close,
} from "@/components/icons";
import { MenuType, ChapterPayload } from "../_types";

const menuTypeClasses =
  "inline-block h-10 w-1/3 select-none text-center text-xs/[40px] data-[active=true]:pointer-events-none data-[active=false]:cursor-pointer data-[active=true]:border-b-2 data-[active=true]:border-[var(--app-text-color-red)] data-[active=false]:text-[var(--app-text-color-medium-gray)] data-[active=true]:text-[var(--app-text-color-red)] md:h-20 md:w-auto md:border-none md:text-xl/[80px]";
const chaptersOrderClasses =
  "font-noto-sans-sc select-none font-[400] data-[active=true]:pointer-events-none data-[active=false]:cursor-pointer data-[active=true]:text-[var(--app-text-color-crimson)] data-[active=false]:text-[var(--app-text-color-slate-gray)]";

const ChaptersAndComments: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fetchReqRef = useRef(false);

  const [infiniteScrollLoading, setInfiniteScrollLoading] =
    useState<boolean>(false);
  const [seeAll, setSeeAll] = useState<boolean>(false);

  const [chaptersOrder, setChaptersOrder] = useState<ChaptersOrder>("positive");
  const [menuType, setMenuType] = useState<MenuType>("chapters");

  const [chaptersPayload, setChaptersPayload] = useState<ChapterPayload>({
    chapters: [],
    infiniteScrollChapters: [],
    pageNumber: 1,
    pageSize: 18,
    totalPages: 1,
    totalChapters: 0,
  });

  // on Initial Chapters fetching
  useEffect(() => {
    const getChapters = async () => {
      try {
        const chaptersResponse = await fetch("/api/chapters");
        const chaptersData = await chaptersResponse.json();
        const { error, chapters, ...restOfChaptersPayload } = chaptersData;
        setChaptersPayload((prev) => ({
          ...prev,
          chapters,
          ...restOfChaptersPayload,
        }));
      } catch (error: any) {}
    };

    getChapters();
  }, []);

  // on Change Chapters Order
  useEffect(() => {
    const getChapters = async () => {
      try {
        setInfiniteScrollLoading(true);
        fetchReqRef.current = true;
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
        fetchReqRef.current = false;
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
        fetchReqRef.current = true;

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
        fetchReqRef.current = false;
      }
    };

    const handleScroll = () => {
      if (!container || fetchReqRef.current || infiniteScrollLoading) return;

      const bottomOffset = container.scrollHeight - container.clientHeight;
      const scrolledToBottom = container.scrollTop >= bottomOffset * 0.9;
      const hasMore = chaptersPayload.pageNumber !== chaptersPayload.totalPages;

      if (scrolledToBottom && hasMore && seeAll) {
        getMoreChapters();
      }
    };

    if (seeAll) {
      containerRef.current?.addEventListener("scroll", handleScroll);
    }

    return () => container?.removeEventListener("scroll", handleScroll);
  }, [seeAll, infiniteScrollLoading, chaptersPayload, chaptersOrder]);

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

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter") {
            setSeeAll(true);
          }
        }}
        onClick={() => setSeeAll(true)}
        className="mx-auto mb-[80px] h-[42px] w-[80%] cursor-pointer rounded-lg bg-[var(--app-text-color-near-white)] text-center leading-[42px] text-[var(--app-text-color-medium-gray)] md:hidden"
      >
        See all
      </div>

      <div
        className={`fixed left-0 top-0 z-50 ${seeAll ? "block" : "hidden"} h-screen w-full bg-black/50`}
      >
        <div
          ref={containerRef}
          className="fixed bottom-0 left-0 z-[60] h-[90vh] w-full overflow-auto rounded-t-[16px] bg-white"
        >
          <div className="fixed w-full rounded-t-[16px] bg-white">
            <p className="m-4 mt-4 text-center text-base font-[500] text-[var(--app-text-color-dark-gray)]">
              Popular Princess
            </p>

            <Close
              onClick={() => setSeeAll(false)}
              className="absolute right-4 top-4 h-[18px] w-[18px] cursor-pointer text-[var(--app-text-color-dark-gray)]"
              strokeWidth={2}
            />

            <div className="mt-[8px] flex items-center justify-between px-4">
              <p className="text-[13px] text-[var(--app-text-color-dark-gray)]">
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
                  className="data-[active=true]:text-[var(--app-text-color-vibrant-pink)]"
                >
                  <span>Positive</span>
                </div>

                <span className="text-[var(--app-text-color-pale-silver)]">
                    |  
                </span>

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
                  className="data-[active=true]:text-[var(--app-text-color-vibrant-pink)]"
                >
                  <span>Reverse</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${(!infiniteScrollLoading || !fetchReqRef.current) && "mb-12"} mt-[100px] flex flex-wrap items-center justify-between px-[4%]`}
          >
            {chaptersPayload.infiniteScrollChapters.map((chapter, index) => (
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

          {(infiniteScrollLoading || fetchReqRef.current) && (
            <div className={"my-6 flex items-center justify-center"}>
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[var(--app-text-color-vibrant-pink)]" />
              <div className="sr-only">Loading...</div>
            </div>
          )}
        </div>
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
