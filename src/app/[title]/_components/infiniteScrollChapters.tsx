import { useState, useEffect } from "react";
import Link from "next/link";

import { Like, CommentSolid, Close } from "@/components/icons";
import { ChapterPayload, ChaptersOrder } from "../_types";

const InfiniteScrollChapters = () => {
  const [infiniteScrollLoading, setInfiniteScrollLoading] =
    useState<boolean>(false);
  const [seeAll, setSeeAll] = useState<boolean>(false);
  const [chaptersOrder, setChaptersOrder] = useState<ChaptersOrder>("positive");
  const [chaptersPayload, setChaptersPayload] = useState<ChapterPayload>({
    chapters: [],
    pageNumber: 1,
    pageSize: 18,
    totalPages: 1,
    totalChapters: 0,
  });

  useEffect(() => {
    document.body.style.overflow = seeAll ? "hidden" : "auto";
  }, [seeAll]);

  const changeChapterOrder = (order: ChaptersOrder) => {
    if (order === chaptersOrder) return;
    setChaptersOrder(order);
    setChaptersPayload({
      ...chaptersPayload,
      chapters: chaptersPayload.chapters.slice().reverse(),
    });
  };

  return (
    <>
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

      {seeAll && (
        <div className="fixed left-0 top-0 z-50 h-screen w-full bg-black/50">
          <div className="fixed bottom-0 left-0 z-[60] h-[90vh] w-full overflow-auto rounded-t-[16px] bg-white">
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
                    onClick={() => changeChapterOrder("positive")}
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
                    onClick={() => changeChapterOrder("reverse")}
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

            <div className="mb-12 mt-[100px] flex flex-wrap items-center justify-between px-[4%]">
              {chaptersPayload.chapters.map((chapter, index) => (
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

            {infiniteScrollLoading && (
              <div className="my-6 flex items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[var(--app-text-color-vibrant-pink)]" />
                <div className="sr-only">Loading...</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InfiniteScrollChapters;
