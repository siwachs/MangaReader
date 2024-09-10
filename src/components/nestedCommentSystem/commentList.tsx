import { useState, memo } from "react";
import Link from "next/link";
import Image from "next/image";

import { formatDistanceToNow, parseISO } from "date-fns";
import { Comment as CommentType, VoteType } from "@/types";

import { useNestedCommentSystem } from "@/providers/nestedCommentProvider";
import CommentForm from "./commentForm";

import { HiUserAdd } from "react-icons/hi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { TiFlag } from "react-icons/ti";
import { IoMdShareAlt } from "react-icons/io";

const CommentList: React.FC<{ comments: CommentType[] }> = ({ comments }) => {
  return comments.map((comment: CommentType) => (
    <Comment key={comment.id} comment={comment} />
  ));
};

const Comment: React.FC<{ comment: CommentType }> = memo(({ comment }) => {
  const {
    getReplies,
    voteComment,
    deleteComment,
    userId,
    contentId,
    chapterId,
  } = useNestedCommentSystem();

  const [isChildrenCollapsed, setIsChildrenCollapsed] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingLoading, setIsEditingLoading] = useState(false);
  const toogleIsEditingLoading = () => setIsEditingLoading((prev) => !prev);

  const toogleIsChildrenCollapsed = () =>
    setIsChildrenCollapsed((prev) => !prev);
  const toogleIsReplying = () => setIsReplying((prev) => !prev);
  const toogleIsEditing = () => setIsEditing((prev) => !prev);

  const parsedDate = parseISO(comment.createdAt);
  const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });
  const childComments = getReplies(comment.id);

  const [isVoteLoading, setIsVoteLoading] = useState<"none" | VoteType>("none");
  const voteLoading = isVoteLoading !== "none";

  const voteCommentCallback = async (voteType: VoteType) => {
    if (comment.isDeleted || voteLoading) return;

    setIsVoteLoading(voteType);

    await voteComment(
      { userId, contentId, chapterId },
      comment.id,
      voteType,
      () => setIsVoteLoading("none"),
    );
  };
  const upVote = () => voteCommentCallback("up");
  const downVote = () => voteCommentCallback("down");

  const [isDeleteCommentLoading, setIsDeleteCommentLoading] = useState(false);
  const toogleIsDeletCommentLoading = () =>
    setIsDeleteCommentLoading((prev) => !prev);
  const deleteCommentCallback = async () => {
    if (isDeleteCommentLoading) return;

    if (comment.isDeleted) {
      toogleIsDeletCommentLoading();
      return await deleteComment(
        { "x-user-id": userId },
        comment.id,
        toogleIsDeletCommentLoading,
      );
    }

    if (confirm("You cannot delete a comment. You can only hide it.")) {
      setIsDeleteCommentLoading(true);
      await deleteComment(
        { "x-user-id": userId },
        comment.id,
        toogleIsDeletCommentLoading,
      );
    }
  };

  return (
    <div id={comment.id}>
      <div className="mb-4 flex flex-wrap">
        <div
          data-role="avatar-container"
          className={`relative mb-[9px] mr-2.5 ${isChildrenCollapsed ? "size-10 md:size-[46px]" : "size-[52px] md:size-[58px]"} flex-shrink-0 rounded-2xl md:mr-3.5`}
        >
          <div
            id="indicator"
            className={`absolute left-0 top-0 hidden ${isChildrenCollapsed ? "h-10" : "h-[52px]"} w-[5px] rounded-[3px] bg-gray-800`}
          />

          <Image // ml-3
            src={comment.user?.avatar ?? "/assets/person.png"}
            alt={comment.user?.username ?? "profile-pic"}
            width={60}
            height={60}
            className="h-full w-full rounded-[inherit] object-cover object-center"
          />
        </div>

        <div data-role="body-container" className="flex-1">
          <div
            data-role="username-timestamp-collapse-and-flag-container"
            className="my-1 flex min-h-5 flex-wrap"
          >
            <div
              data-role="username-timestamp"
              className="mr-3 flex-1 text-xs/[21px] md:text-base"
            >
              <div className="flex flex-wrap items-center">
                <span className="mr-1 line-clamp-1 text-[15px] font-bold text-gray-800 md:text-lg">
                  {comment.user?.username ?? "deleted"}
                  &nbsp;
                  <HiUserAdd
                    className="-mt-1 inline-block size-[18px] text-[var(--app-text-color-blue-gray)] hover:text-gray-800 md:size-5"
                    tabIndex={0}
                    role="button"
                    aria-label="Add user"
                  />
                </span>

                {comment.parentId !== "root" && (
                  <Link
                    href={`#${comment.parentId}`}
                    className="ml-2 flex select-none items-center gap-0.5 font-medium text-[var(--app-text-color-very-dary-steel-blue)]"
                  >
                    <IoMdShareAlt className="size-4 md:size-[22px]" />
                    <span>{comment.user?.username ?? "deleted"}</span>
                  </Link>
                )}
              </div>

              <span className="font-medium text-[var(--app-text-color-very-dary-steel-blue)]">
                <span>{timeAgo}</span>
                {comment.isEdited && <span className="ml-3">edited</span>}
              </span>
            </div>

            <div
              data-role="collapse-and-flag"
              className="mr-4 flex text-[var(--app-text-color-blue-gray)]"
            >
              {isChildrenCollapsed ? (
                <FaPlus
                  className="mr-2.5 size-4 hover:text-gray-800 md:size-[22px]"
                  tabIndex={0}
                  role="button"
                  aria-label="Expand Children"
                  onClick={toogleIsChildrenCollapsed}
                />
              ) : (
                <FaMinus
                  className="mr-2.5 size-[18px] hover:text-gray-800 md:size-[22px]"
                  tabIndex={0}
                  role="button"
                  aria-label="Collapse Children"
                  onClick={toogleIsChildrenCollapsed}
                />
              )}

              <TiFlag
                className="mt-0.5 size-4 hover:text-gray-800 md:size-[22px]"
                tabIndex={0}
                role="button"
                aria-label="Flag Comment"
              />
            </div>
          </div>

          <div
            data-role="message-votes-reply-edit-and-delete"
            className={
              isChildrenCollapsed ? "hidden" : "-ml-[62px] mt-4 sm:ml-0"
            }
          >
            <p
              className={`break-words text-[15px] leading-[21px] md:text-lg ${isDeleteCommentLoading || isEditingLoading ? "w-fit animate-pulse rounded-sm bg-gray-400 text-gray-400" : ""} ${comment.isDeleted ? "line-through" : "whitespace-pre-wrap"}`}
              dangerouslySetInnerHTML={{
                __html: comment.isDeleted
                  ? "This comment was deleted."
                  : comment.message,
              }}
            />

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-800 md:mt-3.5 md:text-base">
              <div className="flex flex-wrap items-center">
                <button
                  onClick={upVote}
                  className="flex items-center"
                  aria-label={
                    comment?.voteType === "up"
                      ? "Remove Upvote"
                      : "Upvote Comment"
                  }
                >
                  {renderVoteIcon("up", isVoteLoading, comment?.voteType)}

                  <span>{comment.upVotes}</span>
                </button>

                <button
                  onClick={downVote}
                  className="flex items-center"
                  aria-label={
                    comment?.voteType === "down"
                      ? "Remove Downvote"
                      : "Downvote Comment"
                  }
                >
                  {renderVoteIcon("down", isVoteLoading, comment?.voteType)}

                  <span>{comment.downVotes}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center">
                <button
                  onClick={toogleIsReplying}
                  className="ml-2 mr-3.5 text-sm md:text-base"
                >
                  Reply
                </button>

                {!comment.isDeleted && comment.user.id === userId && (
                  <FaEdit
                    className="mx-1.5 text-sm md:text-base"
                    tabIndex={0}
                    role="button"
                    aria-label="Edit Comment"
                    onClick={toogleIsEditing}
                  />
                )}

                {comment.user.id === userId && (
                  <button
                    onClick={deleteCommentCallback}
                    className={`mx-1.5 text-sm md:text-base ${comment.isDeleted ? "text-[var(--app-text-color-medium-dark-blue)]" : "text-red-600"}`}
                    aria-label={
                      comment.isDeleted ? "Unde Delete" : "Delete Comment"
                    }
                  >
                    {comment.isDeleted ? "Undo" : <FaTrash />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isReplying && (
        <CommentForm parentId={comment.id} callback={toogleIsReplying} />
      )}

      {isEditing && (
        <CommentForm
          initialMessage={comment.message}
          commentId={comment.id}
          editMode
          editModeCallback={toogleIsEditingLoading}
          callback={toogleIsEditing}
        />
      )}

      {childComments.length > 0 && (
        <div
          className={`${isChildrenCollapsed ? "hidden" : ""} border-l-2 border-[var(--app-border-color-periwinkle)] pl-3.5 sm:pl-[62px]`}
        >
          <CommentList comments={childComments} />
        </div>
      )}
    </div>
  );
});

Comment.displayName = "Comment";

type IsVoteLoading = "none" | VoteType;

const getVoteLoadingClasses = (
  voteType: VoteType,
  isVoteLoading: IsVoteLoading,
  currentVoteType?: VoteType,
): string => {
  if (isVoteLoading === voteType) {
    return currentVoteType === voteType
      ? "remove-vote-loading"
      : "add-vote-loading";
  }

  return "";
};

const renderVoteIcon = (
  voteType: VoteType,
  isVoteLoading: IsVoteLoading,
  currentVoteType?: VoteType,
) => {
  const baseClasses = "mx-2 size-5 md:size-6";
  const voteLoadingClasses = getVoteLoadingClasses(
    voteType,
    isVoteLoading,
    currentVoteType,
  );

  switch (voteType) {
    case "up":
      return currentVoteType === "up" ? (
        <BiSolidLike
          className={`${baseClasses} ${voteLoadingClasses} text-[var(--app-text-color-red)]`}
        />
      ) : (
        <BiLike
          className={`${baseClasses} ${voteLoadingClasses} text-gray-500`}
        />
      );
    case "down":
      return currentVoteType === "down" ? (
        <BiSolidDislike
          className={`${baseClasses} ${voteLoadingClasses} text-[var(--app-text-color-red)]`}
        />
      ) : (
        <BiDislike
          className={`${baseClasses} ${voteLoadingClasses} text-gray-500`}
        />
      );
    default:
      return <></>;
  }
};

export default CommentList;
