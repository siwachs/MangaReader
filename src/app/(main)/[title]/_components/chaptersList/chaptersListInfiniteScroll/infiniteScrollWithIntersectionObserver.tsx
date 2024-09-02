import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import useBodyOverflow from "@/hooks/useBodyOverflow";

import { Chapter } from "@/types";
import { ChaptersOrder as ChaptersOrderType, ChaptersPayload } from "..";
import ModelOverlay from "@/components/utils/modelOverlay";
import ChaptersOrder from "../chaptersOrder";
import ChapterLink from "@/components/buttons/chapterLink";

import { CHAPTERS_LIST_DEFAULT_PAGE_SIZE } from "@/constants";

import { AiOutlineLoading } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";

const InfiniteScrollWithIntersectionObserver: React.FC<{
  infiniteScroll: boolean;
  title: string;
  toogleInfiniteScroll: () => void;
  infiniteScrollToogleKeyDown?: (e: React.KeyboardEvent) => void;
  chaptersOrder: ChaptersOrderType;
  changeOrderToReverse: () => void;
  changeOrderToPositive: () => void;
  chapters: Chapter[];
  chaptersPayload: ChaptersPayload;
  setChaptersPayload: Dispatch<SetStateAction<ChaptersPayload>>;
  contentId: string;
}> = ({
  infiniteScroll,
  title,
  toogleInfiniteScroll,
  infiniteScrollToogleKeyDown,
  chaptersOrder,
  changeOrderToReverse,
  changeOrderToPositive,
  chapters,
  chaptersPayload,
  setChaptersPayload,
  contentId,
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const loadMoreChapters = () => {
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
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        const hasMore =
          chaptersPayload.pageNumber !== chaptersPayload.totalPages;

        if (isIntersecting && hasMore) loadMoreChapters();
      },
      {
        threshold: 1.0,
      },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [
    chaptersPayload.pageNumber,
    chaptersPayload.totalPages,
    chaptersPayload.chapters,
    chapters,
  ]);

  useBodyOverflow(infiniteScroll);
  useOutsideClick(containerRef, infiniteScroll, toogleInfiniteScroll);

  return (
    <ModelOverlay blackBgHalfOpacity mobileOnly>
      <div
        ref={containerRef}
        className="fixed bottom-0 left-0 right-0 h-[90vh] overflow-auto rounded-t-2xl bg-[var(--app-bg-color-primary)]"
      >
        <div className="fixed w-full rounded-t-2xl bg-[var(--app-bg-color-primary)]">
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

          <div className="">
            <AiOutlineLoading />
          </div>
        </div>
      </div>
    </ModelOverlay>
  );
};

export default InfiniteScrollWithIntersectionObserver;
