"use client";

import { usePathname, useParams, useSearchParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSession } from "next-auth/react";

import {
  DEFAULT_NESTED_COMMENT_SYSTEM_SORT_KEY,
  NESTED_COMMENT_SET_A_USERNAME_MESSAGE,
  NESTED_COMMENT_SYSTEM_INVALID_USERID,
  NESTED_COMMENT_SYSYEM_INVALID_BODY_MESSAGE,
} from "@/constants";
import { nextPublicNestedCommentSystemBaseEndpoint } from "@/constants/apiEndpoints";
import uuidv4 from "@/libs/uuidv4";
import { useToastContainer } from "../toastContainerProvider";
import getSignInConfirm from "@/libs/getSignInConfirm";
import { Comment, SortKey, VoteType } from "@/types";
import { CommentsPayload, Context } from "./types";

import {
  makeDeleteRequest,
  makePostPutRequest,
  makeGetRequest,
} from "@/service/asyncApiCalls";

const loadSpoilerTag = async () => {
  await import("@/customHtmlElements/SpoilerElement");
};

const initialCommentsPayload: CommentsPayload = {
  loading: true,
  error: false,
  totalPages: 1,
  totalComments: 0,
  pageNumber: 1,
  comments: [],
  sortKey: DEFAULT_NESTED_COMMENT_SYSTEM_SORT_KEY,
  loadMoreCommentsLoding: false,
};

const NestedCommentSystemContext = createContext<Context | undefined>(
  undefined,
);

export function useNestedCommentSystem() {
  const context = useContext(NestedCommentSystemContext);
  if (!context)
    throw new Error(
      "useNestedCommentSystem must be used within NestedCommentProvider",
    );

  return context;
}

export function NestedCommentProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { content_id: routeContentId, chapter_id: routeChapterId } =
    useParams();
  const searchParams = useSearchParams();

  const contentId =
    (routeContentId as string) ||
    (searchParams.get("content_id") as string) ||
    "";
  const chapterId =
    (routeChapterId as string) ||
    (searchParams.get("chapter_id") as string) ||
    undefined;

  const { addToast } = useToastContainer();
  const currentUrl = usePathname();
  const session = useSession();

  const loggedInUserId = session.data?.user.id;
  const username = session.data?.user.username;

  const [commentsPayload, setCommentsPayload] = useState<CommentsPayload>(
    initialCommentsPayload,
  );

  const updateCommentsPayload = useCallback(
    (updates: Partial<CommentsPayload>) => {
      setCommentsPayload((prev) => ({ ...prev, ...updates }));
    },
    [],
  );

  useEffect(() => {
    loadSpoilerTag();
  }, []);

  const changeCommentsOrder = useCallback(
    (sortKey: SortKey) => {
      updateCommentsPayload({ sortKey });
    },
    [updateCommentsPayload],
  );

  // Comments grouping by parentId
  const getCommentsByParentId = useMemo(() => {
    const groups: Record<string, Comment[]> = {};

    commentsPayload?.comments?.map((comment) => {
      groups[comment.parentId] ||= [];
      groups[comment.parentId].push(comment);
    });

    return groups;
  }, [commentsPayload?.comments]);

  // get comments group by parentId
  const getReplies = useCallback(
    (parentId = "root") => {
      return getCommentsByParentId[parentId] ?? [];
    },
    [getCommentsByParentId],
  );

  // Nested Comment System CRUD
  const loadMoreComments = useCallback(
    async (pageNumber: number) => {
      updateCommentsPayload({ loading: true });
      const commentsSortKey =
        commentsPayload.sortKey || DEFAULT_NESTED_COMMENT_SYSTEM_SORT_KEY;
      const queryParams = new URLSearchParams(
        chapterId
          ? {
              contentId,
              chapterId,
              commentsSortKey,
              pageNumber: pageNumber.toString(),
            }
          : {
              contentId,
              commentsSortKey,
              pageNumber: pageNumber.toString(),
            },
      ).toString();

      const requestResponse = await makeGetRequest(
        nextPublicNestedCommentSystemBaseEndpoint,
        queryParams,
        () => updateCommentsPayload({ loading: false }),
      );

      if (requestResponse.error)
        return addToast({
          id: uuidv4(),
          type: "error",
          text: requestResponse.errorMessage,
        });

      const { comments, ...rest } = requestResponse;
      updateCommentsPayload({
        ...rest,
        comments: [...commentsPayload.comments, ...comments],
      });
    },
    [chapterId, contentId, commentsPayload.sortKey, addToast],
  );

  const makeComment = useCallback(
    async (body: Record<string, any>, callback?: () => void) => {
      const { contentId, userId, message = "" } = body;

      if (!contentId || !userId || !message.trim())
        return addToast({
          id: uuidv4(),
          type: "warning",
          text: NESTED_COMMENT_SYSYEM_INVALID_BODY_MESSAGE,
        });

      if (!username)
        return addToast({
          id: uuidv4(),
          type: "info",
          text: NESTED_COMMENT_SET_A_USERNAME_MESSAGE,
        });

      const requestResponse = await makePostPutRequest(
        nextPublicNestedCommentSystemBaseEndpoint,
        "POST",
        body,
        callback,
      );

      if (requestResponse.error)
        return addToast({
          id: uuidv4(),
          type: "error",
          text: requestResponse.errorMessage,
        });

      const { error, comment } = requestResponse;

      setCommentsPayload((prev) => {
        let newComments = [...prev.comments];

        if (prev.sortKey === "NEWEST") newComments = [comment, ...newComments];
        else if (prev.sortKey === "OLDEST")
          newComments = [...newComments, comment];
        else {
          const commentWithZeroUpVotes = prev.comments.findIndex(
            (c) => c.upVotes === 0,
          );

          if (commentWithZeroUpVotes !== -1) {
            newComments = [
              ...newComments.slice(0, commentWithZeroUpVotes),
              comment,
              ...newComments.slice(commentWithZeroUpVotes),
            ];
          } else {
            newComments = [comment, ...newComments];
          }
        }

        return {
          ...prev,
          error,
          totalComments: prev.totalComments + 1,
          comments: newComments,
        };
      });
    },
    [username, addToast],
  );

  const voteComment = useCallback(
    async (
      body: Record<string, any>,
      commentId: string,
      voteType: VoteType,
      callback?: () => void,
    ) => {
      if (!getSignInConfirm(currentUrl, loggedInUserId)) {
        return callback && callback();
      }

      const { userId } = body;
      if (!userId)
        return addToast({
          id: uuidv4(),
          type: "warning",
          text: NESTED_COMMENT_SYSTEM_INVALID_USERID,
        });

      const requestResponse = await makePostPutRequest(
        `${nextPublicNestedCommentSystemBaseEndpoint}/${commentId}/vote/${voteType}`,
        "PUT",
        body,
        callback,
      );

      if (requestResponse.error) {
        addToast({
          id: uuidv4(),
          type: "error",
          text: requestResponse.errorMessage,
        });
      } else {
        const { comment } = requestResponse;

        setCommentsPayload((prev) => ({
          ...prev,
          comments: prev.comments.map((c) =>
            c.id === comment.id ? comment : c,
          ),
        }));
      }
    },
    [currentUrl, loggedInUserId, addToast],
  );

  // For Edited and deleted comments
  const updateComments = (updatedComment: Comment) => {
    setCommentsPayload((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) =>
        comment.id === updatedComment.id
          ? { ...comment, ...updatedComment }
          : comment,
      ),
    }));
  };

  const editComment = useCallback(
    async (
      body: Record<string, any>,
      commentId: string,
      callback?: () => void,
    ) => {
      const { userId, message = "" } = body;

      if (!userId || !message.trim())
        return addToast({
          id: uuidv4(),
          type: "warning",
          text: NESTED_COMMENT_SYSYEM_INVALID_BODY_MESSAGE,
        });

      if (!username)
        return addToast({
          id: uuidv4(),
          type: "info",
          text: NESTED_COMMENT_SET_A_USERNAME_MESSAGE,
        });

      const requestResponse = await makePostPutRequest(
        `${nextPublicNestedCommentSystemBaseEndpoint}/${commentId}/edit`,
        "PUT",
        body,
        callback,
      );

      if (requestResponse.error)
        return addToast({
          id: uuidv4(),
          type: "error",
          text: requestResponse.errorMessage,
        });

      updateComments(requestResponse.comment);
    },
    [username, addToast, updateComments],
  );

  const deleteComment = useCallback(
    async (
      headers: Record<string, any>,
      commentId: string,
      callback?: () => void,
    ) => {
      if (!getSignInConfirm(currentUrl, loggedInUserId)) {
        return callback && callback();
      }

      if (!headers["x-user-id"])
        return addToast({
          id: uuidv4(),
          type: "warning",
          text: "Invalid headers. x-user-id is required.",
        });

      const requestResponse = await makeDeleteRequest(
        `${nextPublicNestedCommentSystemBaseEndpoint}/${commentId}/delete`,
        headers,
        callback,
      );

      if (requestResponse.error)
        return addToast({
          id: uuidv4(),
          type: "error",
          text: requestResponse.errorMessage,
        });

      updateComments(requestResponse.comment);
    },
    [currentUrl, loggedInUserId, addToast, updateComments],
  );

  return (
    <NestedCommentSystemContext.Provider
      value={useMemo(
        () => ({
          contentId,
          chapterId,
          commentsPayload,
          updateCommentsPayload,
          rootComments: getReplies(),
          getReplies,
          changeCommentsOrder,
          makeComment,
          voteComment,
          userId: loggedInUserId,
          username,
          editComment,
          deleteComment,
          loadMoreComments,
        }),
        [
          contentId,
          chapterId,
          commentsPayload,
          getReplies,
          changeCommentsOrder,
          makeComment,
          voteComment,
          loggedInUserId,
          username,
          editComment,
          deleteComment,
          loadMoreComments,
        ],
      )}
    >
      {children}
    </NestedCommentSystemContext.Provider>
  );
}
