"use client";

import "./index.css";

import { Suspense } from "react";
import { roboto } from "@/libs/fonts";
import { SortKey } from "@/types";
import { useNestedCommentSystem } from "@/contexts/nestedCommentContext";

import LoadingSkeleton from "../utils/loadingSkeleton";
import ClientAuth from "../buttons/clientAuth";
import CommentForm from "./commentForm";
import CommentList from "./commentList";

import { IoChatbubble } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

const NestedCommentsContainer: React.FC = () => {
  const {
    rootComments,
    commentsPayload,
    changeCommentsOrder,
    loadMoreComments,
  } = useNestedCommentSystem();

  function renderComments() {
    if (commentsPayload.loading)
      return (
        <div className="h-[107px] bg-[url('/assets/loading-gear.gif')] bg-center bg-no-repeat" />
      );

    if (commentsPayload.error)
      return (
        <div className="flex min-h-[107px] items-center justify-center leading-7 text-red-600">
          {commentsPayload.errorMessage}
        </div>
      );

    if (rootComments.length === 0)
      return (
        <div className="text-center leading-[107px] opacity-60">
          Be the first to comment.
        </div>
      );

    return <CommentList comments={rootComments} />;
  }

  const loadMore = () => loadMoreComments(commentsPayload.pageNumber + 1);

  return (
    <div
      className={`${roboto.className} nested-comment-system-wrapper text-gray-800`}
    >
      <header className="mb-6">
        <div className="flex items-center justify-between border-b-2 border-gray-300 py-3 font-bold">
          <span
            className={
              commentsPayload.loading
                ? "animate-pulse rounded-sm bg-gray-400 text-gray-400"
                : "md:text-lg"
            }
          >
            {commentsPayload.totalComments} Comments
          </span>

          <Suspense fallback={<LoadingSkeleton />}>
            <ClientAuth
              profileContainerClasses="relative size-9"
              profileMenuPositionClasses="right-0 top-10"
              signInButtonClasses="flex items-center gap-1.5"
              signInButtonComponent={
                <>
                  <div className="relative">
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-white">
                      1
                    </span>

                    <IoChatbubble className="size-[22px] md:size-7" />
                  </div>

                  <span className="md:size-lg">Sign In</span>
                </>
              }
            />
          </Suspense>
        </div>
      </header>

      <section>
        <CommentForm />

        <div className="mb-2 flex items-center justify-between">
          <div className="mb-3 ml-3 flex items-center gap-2.5">
            <FaRegHeart className="md:size-4" />

            <span className="text-xs/[18px] font-bold md:text-base">0</span>
          </div>

          <div className="mb-3 flex items-center gap-4 pt-[3px]">
            {["BEST", "NEWEST", "OLDEST"].map((order) => (
              <button
                key={order}
                onClick={() => {
                  if (
                    commentsPayload.loading ||
                    commentsPayload.loadMoreCommentsLoding
                  )
                    return;
                  changeCommentsOrder(order as SortKey);
                }}
                data-active={commentsPayload.sortKey === order}
                className="text-sm/[19px] font-semibold data-[active=true]:border-b-[3px] data-[active=true]:border-gray-800 md:text-base"
              >
                {order === "BEST"
                  ? "Best"
                  : order === "NEWEST"
                    ? "Newest"
                    : "Oldest"}
              </button>
            ))}
          </div>
        </div>

        {renderComments()}

        {commentsPayload.pageNumber < commentsPayload.totalPages && (
          <button
            type="button"
            onClick={loadMore}
            disabled={
              commentsPayload.loading || commentsPayload.loadMoreCommentsLoding
            }
            className="my-1.5 w-full rounded-[15px] border border-gray-800 pb-[8px] pt-[9px] text-center text-lg/[21px] font-bold text-gray-800 transition-all duration-200 hover:bg-gray-800 hover:text-white disabled:pointer-events-none"
          >
            Load more comments
          </button>
        )}

        <div className="mb-5 border border-[#dcdde7]" />
      </section>
    </div>
  );
};

export default NestedCommentsContainer;
