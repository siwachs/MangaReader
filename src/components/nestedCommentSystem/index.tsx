"use client";

import { useState } from "react";
import Image from "next/image";

import { formatDistanceToNow, parseISO } from "date-fns";
import { roboto } from "@/libs/fonts";
import { Comment as CommentType } from "@/types";

import {
  NestedCommentProvider,
  useNestedCommentSystem,
} from "@/contexts/nestedCommentContext";
import {
  AddUser,
  ChatBubbleSolid,
  DislikeOutline,
  DislikeFilled,
  Flag,
  HeartOutline,
  LikeOutline,
  LikeFilled,
  Minus,
} from "../icons";
import CommentForm from "./commentForm";
import ClientAuth from "../buttons/clientAuth";

const NestedCommentSystem: React.FC<{
  contentId: string;
  chapterId?: string;
}> = ({ contentId, chapterId }) => {
  return (
    <NestedCommentProvider contentId={contentId} chapterId={chapterId}>
      <NestedCommentsContainer />
    </NestedCommentProvider>
  );
};

const sortButtonClasses =
  "text-sm/[19px] font-semibold data-[active=true]:border-b-[3px] data-[active=true]:border-[var(--app-text-color-gunmelt-gray)]";

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

  return (
    <div
      className={`${roboto.className} text-[var(--app-text-color-dark-grayish-green)]`}
    >
      <header className="mb-6">
        <div className="flex items-center justify-between border-b-2 border-[var(--app-border-color-slightly-blue-gray)] py-3 font-bold">
          <span
            className={
              commentsPayload.loading
                ? "animate-pulse rounded-sm bg-gray-400 text-gray-400"
                : undefined
            }
          >
            {commentsPayload?.comments.length ?? 0} Comments
          </span>

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
                  <ChatBubbleSolid className="size-[22px]" />
                </div>

                <span>Sign In</span>
              </>
            }
          />
        </div>
      </header>

      <section>
        <CommentForm />

        <div className="mb-2 flex items-center justify-between">
          <div className="mb-3 flex items-center gap-2.5 p-[7px_14px]">
            <button>
              <HeartOutline className="size-4" />
            </button>

            <span className="text-xs/[18px] font-bold">0</span>
          </div>

          <div className="mb-3 flex items-center gap-4 pt-[3px]">
            <button
              type="button"
              onClick={() => changeCommentsOrder("BEST")}
              data-active={commentsPayload.sortKey === "BEST"}
              className={sortButtonClasses}
            >
              Best
            </button>

            <button
              type="button"
              onClick={() => changeCommentsOrder("NEWEST")}
              data-active={commentsPayload.sortKey === "NEWEST"}
              className={sortButtonClasses}
            >
              Newest
            </button>

            <button
              type="button"
              onClick={() => changeCommentsOrder("OLDEST")}
              data-active={commentsPayload.sortKey === "OLDEST"}
              className={sortButtonClasses}
            >
              Oldest
            </button>
          </div>
        </div>

        {renderComments()}

        {commentsPayload.pageNumber !== commentsPayload.totalPages && (
          <button
            type="button"
            onClick={() => loadMoreComments(commentsPayload.pageNumber + 1)}
            disabled={
              commentsPayload.loading || commentsPayload.loadMoreCommentsLoding
            }
            className="my-1.5 w-full rounded-[15px] border border-[var(--app-text-color-gunmelt-gray)] pb-[8px] pt-[9px] text-center text-lg/[21px] font-bold text-[var(--app-text-color-gunmelt-gray)] transition-all duration-200 hover:bg-[var(--app-text-color-gunmelt-gray)] hover:text-white disabled:pointer-events-none"
          >
            Load more comments
          </button>
        )}

        <div className="mb-5 border border-[#dcdde7]" />
      </section>
    </div>
  );
};

const CommentList: React.FC<{ comments: CommentType[] }> = ({ comments }) => {
  return comments.map((comment: any) => (
    <Comment key={comment.id} comment={comment} />
  ));
};

const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => {
  const {
    getReplies,
    voteComment,
    deleteComment,
    userId,
    contentId,
    chapterId,
  } = useNestedCommentSystem();
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const parsedDate = parseISO(comment.createdAt);
  const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });

  const childComments = getReplies(comment.id);

  return (
    <div className="my-4">
      <div className="header flex">
        <div className="avatar mb-[9px] mr-2.5 size-[52px] flex-shrink-0 rounded-2xl">
          <Image
            src={comment.user.avatar}
            alt={comment.user.username ?? "Invalid username"}
            width={60}
            height={60}
            className="h-full w-full rounded-[inherit] object-cover object-center"
          />
        </div>

        <div className="mt-1">
          <div className="truncate text-[15px]/[18px] font-bold">
            {comment.user.username ?? "Invalid username"}
            <AddUser className="ml-1.5 inline-block size-4 text-[var(--app-text-color-cool-tone-grayish-blue)]" />
          </div>

          <span className="text-xs/[21px] font-medium text-[var(--app-text-color-muted-blue-gray)]">
            <span>{timeAgo}</span>
            {comment.isEdited && <span className="ml-3">edited</span>}
          </span>
        </div>

        <div className="mb-2.5 ml-auto mr-3 flex gap-2.5 text-[var(--app-text-color-muted-blue-gray)]">
          <Minus className="size-[18px] opacity-60" />
          <Flag className="mt-0.5 size-3 opacity-60" />
        </div>
      </div>

      {comment.isDeleted ? (
        <p className="body break-words text-[15px] leading-[21px] line-through">
          This message has been deleted.
        </p>
      ) : (
        <p className="body break-words text-[15px] leading-[21px]">
          {comment.message}
        </p>
      )}

      <div className="footer mt-1.5 flex h-[2em] items-center text-xs font-medium text-[var(--app-text-color-dark-grayish-green)]">
        <button
          onClick={() =>
            !comment.isDeleted &&
            voteComment({ userId, contentId, chapterId }, comment.id, "up")
          }
          className="flex items-center"
        >
          {comment?.voteType === "up" ? (
            <LikeFilled className="mx-2 size-5" />
          ) : (
            <LikeOutline className="mx-2 size-5 text-[var(--app-text-color-cool-tone-grayish-blue)]" />
          )}
          <span>{comment.upVotes}</span>
        </button>

        <button
          onClick={() =>
            !comment.isDeleted &&
            voteComment({ userId, contentId, chapterId }, comment.id, "down")
          }
          className="flex items-center"
        >
          {comment?.voteType === "down" ? (
            <DislikeFilled className="mx-2 size-5" />
          ) : (
            <DislikeOutline className="mx-2 size-5 text-[var(--app-text-color-cool-tone-grayish-blue)]" />
          )}
          <span>{comment.downVotes}</span>
        </button>

        <button
          onClick={() => setIsReplying((prev) => !prev)}
          className="mx-3.5 text-sm"
        >
          Reply
        </button>

        {!comment.isDeleted && comment.user.id === userId && (
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="mx-1.5 text-sm"
          >
            Edit
          </button>
        )}

        {comment.user.id === userId && (
          <button
            onClick={() =>
              comment.isDeleted
                ? deleteComment({ "x-user-id": userId }, comment.id)
                : confirm(
                    "You cannot delete a comment. You can only hide it.",
                  ) && deleteComment({ "x-user-id": userId }, comment.id)
            }
            className={`mx-1.5 text-sm ${comment.isDeleted ? "text-[var(--app-text-color-medium-dark-blue)]" : "text-red-600"}`}
          >
            {comment.isDeleted ? "Undo" : "Delete"}
          </button>
        )}
      </div>

      {isReplying && (
        <CommentForm
          parentId={comment.id}
          callback={() => setIsReplying(false)}
        />
      )}

      {isEditing && (
        <CommentForm
          initialMessage={comment.message}
          commentId={comment.id}
          editMode
          callback={() => setIsEditing(false)}
        />
      )}

      {childComments.length > 0 && (
        <div className="border-l-2 border-[var(--app-border-color-periwinkle)] pl-6">
          <CommentList comments={childComments} />
        </div>
      )}
    </div>
  );
};

export default NestedCommentSystem;
