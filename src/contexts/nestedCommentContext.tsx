"use client";

import { usePathname, useParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { DEFAULT_NESTED_COMMENT_SYSTEM_SORT_KEY } from "@/constants";
import { nextPublicNestedCommentSystemBaseEndpoint } from "@/constants/apiEndpoints";
import uuidv4 from "@/libs/uuidv4";
import { useToastContainer } from "./toastContainerContext";
import getSignInConfirm from "@/libs/getSignInConfirm";
import { useSession } from "next-auth/react";
import { Comment, SortKey, VoteType } from "@/types";

import {
  makeDeleteRequest,
  makePostPutRequest,
  makeGetRequest,
} from "@/service/asyncApiCalls";

const loadSpoilerTag = async () => {
  await import("@/customHtmlElements/SpoilerElement");
};

type CommentsPayload = {
  loading: boolean;
  error: boolean;
  errorMessage?: string;
  totalPages: number;
  totalComments: number;
  pageNumber: number;
  comments: Comment[];
  sortKey: SortKey;
  loadMoreCommentsLoding: boolean;
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

type ContextType = {
  contentId: string;
  chapterId?: string;
  commentsPayload: CommentsPayload;
  rootComments: Comment[];
  getReplies: (parentId?: string) => Comment[];
  changeCommentsOrder: (sortKey: SortKey) => void;
  makeComment: (body: Record<string, any>) => Promise<void>;
  voteComment: (
    body: Record<string, any>,
    commentId: string,
    voteType: VoteType,
    callback?: () => void,
  ) => Promise<void>;
  userId?: string;
  editComment: (body: Record<string, any>, commentId: string) => Promise<void>;
  deleteComment: (
    headers: Record<string, any>,
    commentId: string,
  ) => Promise<void>;
  loadMoreComments: (pageNumber: number) => Promise<void>;
};

const NestedCommentSystemContext = createContext<ContextType | undefined>(
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
  const { content_id: contentId, chapter_id: chapterId } = useParams<{
    content_id: string;
    chapter_id?: string;
  }>();

  const { addToast } = useToastContainer();
  const currentUrl = usePathname();
  const session = useSession();
  const loggedInUserId = session.data?.user.id;

  const [commentsPayload, setCommentsPayload] = useState<CommentsPayload>(
    initialCommentsPayload,
  );

  const updateCommentsPayload = (updates: Partial<CommentsPayload>) => {
    setCommentsPayload((prev) => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    loadSpoilerTag();
  }, []);

  useEffect(() => {
    const getInitialComments = async () => {
      updateCommentsPayload({ loading: true });
      const commentsSortKey =
        commentsPayload.sortKey || DEFAULT_NESTED_COMMENT_SYSTEM_SORT_KEY;
      const queryParams = new URLSearchParams(
        chapterId
          ? {
              contentId,
              chapterId,
              commentsSortKey,
            }
          : {
              contentId,
              commentsSortKey,
            },
      ).toString();
      const requestResponse = await makeGetRequest(
        nextPublicNestedCommentSystemBaseEndpoint,
        queryParams,
        () => updateCommentsPayload({ loading: false }),
      );

      if (requestResponse.error)
        return updateCommentsPayload({
          ...requestResponse,
        });

      updateCommentsPayload({ ...requestResponse });
    };

    getInitialComments();
  }, [chapterId, contentId, commentsPayload.sortKey]);

  const changeCommentsOrder = useCallback((sortKey: SortKey) => {
    updateCommentsPayload({ sortKey });
  }, []);

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
    [chapterId, contentId, commentsPayload.sortKey],
  );

  const makeComment = useCallback(
    async (body: Record<string, any>) => {
      if (!getSignInConfirm(currentUrl, loggedInUserId)) return;

      const { contentId, userId, message } = body;
      if (!contentId || !userId || !message?.trim())
        return addToast({
          id: uuidv4(),
          type: "warning",
          text: "Invalid body bad request. contentId, userId and message are required.",
        });

      const requestResponse = await makePostPutRequest(
        nextPublicNestedCommentSystemBaseEndpoint,
        "POST",
        body,
      );

      if (requestResponse.error)
        return addToast({
          id: uuidv4(),
          type: "error",
          text: requestResponse.errorMessage,
        });

      const { error, comment } = requestResponse;

      setCommentsPayload((prev) => {
        if (prev.sortKey === "NEWEST")
          return {
            ...prev,
            error,
            totalComments: prev.totalComments + 1,
            comments: [comment, ...prev.comments],
          };
        else if (prev.sortKey === "OLDEST")
          return {
            ...prev,
            error,
            totalComments: prev.totalComments + 1,
            comments: [...prev.comments, comment],
          };
        else {
          const commentWithZeroUpVotes = prev.comments.findIndex(
            (c) => c.upVotes === 0,
          );

          if (commentWithZeroUpVotes !== -1) {
            return {
              ...prev,
              error,
              totalComments: prev.totalComments + 1,
              comments: [
                ...prev.comments.slice(0, commentWithZeroUpVotes),
                comment,
                ...prev.comments.slice(commentWithZeroUpVotes),
              ],
            };
          } else
            return {
              ...prev,
              error,
              totalComments: prev.totalComments + 1,
              comments: [comment, ...prev.comments],
            };
        }
      });
    },
    [currentUrl, loggedInUserId],
  );

  const voteComment = useCallback(
    async (
      body: Record<string, any>,
      commentId: string,
      voteType: VoteType,
      callback?: () => void,
    ) => {
      if (!getSignInConfirm(currentUrl, loggedInUserId)) return;

      if (!body?.userId)
        return addToast({
          id: uuidv4(),
          type: "warning",
          text: "Invalid body bad request. userId is required.",
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
    [currentUrl, loggedInUserId],
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
    async (body: Record<string, any>, commentId: string) => {
      if (!getSignInConfirm(currentUrl, loggedInUserId)) return;

      if (!body?.userId || !body?.message.trim())
        return addToast({
          id: uuidv4(),
          type: "warning",
          text: "Invalid body bad request. userId and message are required.",
        });

      const requestResponse = await makePostPutRequest(
        `${nextPublicNestedCommentSystemBaseEndpoint}/${commentId}/edit`,
        "PUT",
        body,
      );

      if (requestResponse.error)
        return addToast({
          id: uuidv4(),
          type: "error",
          text: requestResponse.errorMessage,
        });

      updateComments(requestResponse.comment);
    },
    [],
  );

  const deleteComment = useCallback(
    async (headers: Record<string, any>, commentId: string) => {
      if (!getSignInConfirm(currentUrl, loggedInUserId)) return;

      if (!headers["x-user-id"])
        return addToast({
          id: uuidv4(),
          type: "warning",
          text: "Invalid headers. x-user-id is required.",
        });

      const requestResponse = await makeDeleteRequest(
        `${nextPublicNestedCommentSystemBaseEndpoint}/${commentId}/delete`,
        headers,
      );

      if (requestResponse.error)
        return addToast({
          id: uuidv4(),
          type: "error",
          text: requestResponse.errorMessage,
        });

      updateComments(requestResponse.comment);
    },
    [currentUrl, loggedInUserId],
  );

  return (
    <NestedCommentSystemContext.Provider
      value={useMemo(
        () => ({
          contentId,
          chapterId,
          commentsPayload,
          rootComments: getReplies(),
          getReplies,
          changeCommentsOrder,
          makeComment,
          voteComment,
          userId: loggedInUserId,
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
