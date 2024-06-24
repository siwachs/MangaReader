"use client";

import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { CommentsPayload, Comment, SortKey, VoteType } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  makeDeleteRequest,
  makePostPutRequest,
  makeGetRequest,
} from "@/service/nestedCommentSystemAsyncApiCalls";

type ContextType = {
  contentId: string | undefined | null;
  chapterId: string | undefined | null;
  commentsPayload: CommentsPayload;
  rootComments: Comment[];
  getReplies: any;
  changeCommentsOrder: any;
  makeComment: any;
  voteComment: any;
  userId?: string | null;
  editComment: any;
  deleteComment: any;
  loadMoreComments: any;
};

const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_COMMENTS as string;

const NestedCommentSystemContext = createContext<ContextType>({
  contentId: null,
  chapterId: null,
  commentsPayload: {
    loading: true,
    error: false,
    totalPages: 0,
    pageNumber: 1,
    comments: [],
    sortKey: "BEST",
    loadMoreCommentsLoding: false,
  },
  rootComments: [],
  getReplies: null,
  changeCommentsOrder: null,
  makeComment: null,
  voteComment: null,
  editComment: null,
  deleteComment: null,
  loadMoreComments: null,
});

export function useNestedCommentSystem() {
  const context = useContext(NestedCommentSystemContext);
  if (!context)
    throw new Error(
      "useNestedCommentSystem must be used within NestedCommentProvider",
    );

  return context;
}

export function NestedCommentProvider({
  contentId,
  chapterId,
  children,
}: Readonly<{
  contentId: string;
  chapterId?: string;
  children: React.ReactNode;
}>) {
  const currentUrl = usePathname();
  const session = useSession();
  const [commentsPayload, setCommentsPayload] = useState<CommentsPayload>({
    loading: true,
    error: false,
    totalPages: 0,
    pageNumber: 1,
    comments: [],
    sortKey: "BEST",
    loadMoreCommentsLoding: false,
  });

  useEffect(() => {
    const getInitialComments = async () => {
      try {
        setCommentsPayload((prev) => ({ ...prev, loading: true }));
        const commentsSortKey = commentsPayload.sortKey || "BEST";
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

        const commentsPayloadResponse = await fetch(
          `${apiEndpoint}?${queryParams}`,
        );
        const commentsPayloadParsed = await commentsPayloadResponse.json();
        setCommentsPayload(commentsPayloadParsed);
      } catch (error: any) {
        setCommentsPayload((prev) => ({
          ...prev,
          error: true,
          errorMessage: error.message,
        }));
      } finally {
        setCommentsPayload((prev) => ({ ...prev, loading: false }));
      }
    };

    getInitialComments();
  }, [chapterId, contentId, commentsPayload.sortKey]);

  const changeCommentsOrder = (sortKey: SortKey) => {
    setCommentsPayload((prev) => ({ ...prev, sortKey }));
  };

  const getCommentsByParentId = useMemo(() => {
    const groups: Record<string, Comment[]> = {};

    commentsPayload?.comments?.map((comment) => {
      groups[comment.parentId] ||= [];
      groups[comment.parentId].push(comment);
    });

    return groups;
  }, [commentsPayload?.comments]);

  const getReplies = useCallback(
    (parentId = "root") => {
      return getCommentsByParentId[parentId] ?? [];
    },
    [getCommentsByParentId],
  );

  const getSignInConfirm = useCallback(() => {
    if (!session?.data) {
      if (confirm("Sign in with Google?")) {
        signIn("google", { callbackUrl: currentUrl });
      }

      return false;
    }

    return true;
  }, [currentUrl, session?.data]);

  // Nested Comment System CRUD
  const loadMoreComments = useCallback(
    async (pageNumber: string) => {
      setCommentsPayload((prev) => ({ ...prev, loadMoreCommentsLoding: true }));
      const commentsSortKey = commentsPayload.sortKey || "BEST";
      const queryParams = new URLSearchParams(
        chapterId
          ? {
              contentId,
              chapterId,
              commentsSortKey,
              pageNumber,
            }
          : {
              contentId,
              commentsSortKey,
              pageNumber,
            },
      ).toString();
      const requestResponse = await makeGetRequest(
        apiEndpoint,
        queryParams,
        () => {
          setCommentsPayload((prev) => ({
            ...prev,
            loadMoreCommentsLoding: false,
          }));
        },
      );

      setCommentsPayload((prev) => ({
        ...prev,
        ...requestResponse,
        comments: [...prev.comments, ...(requestResponse?.comments || [])],
      }));
    },
    [chapterId, contentId, commentsPayload.sortKey],
  );

  const makeComment = useCallback(
    async (body: Record<string, any>) => {
      if (!getSignInConfirm()) return;
      const { contentId, userId, message } = body;
      if (!contentId || !userId || !message?.trim())
        return {
          error: true,
          errorMessage:
            "Invalid body bad request. contentId, userId and message are required.",
        };

      const requestResponse = await makePostPutRequest(
        apiEndpoint,
        "POST",
        body,
      );

      if (!requestResponse.error) {
        const { comment } = requestResponse;

        setCommentsPayload((prev) => {
          if (prev.sortKey === "NEWEST")
            return {
              ...prev,
              error: false,
              comments: [comment, ...prev.comments],
            };
          else if (prev.sortKey === "OLDEST")
            return {
              ...prev,
              error: false,
              comments: [...prev.comments, comment],
            };
          else {
            const commentWithZeroUpVotes = prev.comments.findIndex(
              (c) => c.upVotes === 0,
            );

            if (commentWithZeroUpVotes !== -1) {
              return {
                ...prev,
                error: false,
                comments: [
                  ...prev.comments.slice(0, commentWithZeroUpVotes),
                  comment,
                  ...prev.comments.slice(commentWithZeroUpVotes),
                ],
              };
            } else
              return {
                ...prev,
                error: false,
                comments: [...prev.comments, comment],
              };
          }
        });
      }

      return requestResponse;
    },
    [getSignInConfirm],
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

  const voteComment = useCallback(
    async (
      body: Record<string, any>,
      commentId: string,
      voteType: VoteType,
    ) => {
      if (!getSignInConfirm()) return;
      const { userId } = body;
      if (!userId)
        return {
          error: true,
          errorMessage: "Invalid body bad request. userId is required.",
        };

      const requestResponse = await makePostPutRequest(
        `${apiEndpoint}/${commentId}/vote/${voteType}`,
        "PUT",
        body,
      );

      if (!requestResponse.error) {
        const updatedComment = requestResponse.comment;
        setCommentsPayload((prev) => ({
          ...prev,
          comments: prev.comments.map((comment) =>
            comment.id === updatedComment.id ? updatedComment : comment,
          ),
        }));
      }
    },
    [getSignInConfirm],
  );

  const editComment = useCallback(
    async (body: Record<string, any>, commentId: string) => {
      if (!getSignInConfirm()) return;
      const { userId, message } = body;
      if (!userId || !message.trim())
        return {
          error: true,
          errorMessage:
            "Invalid body bad request. userId and message are required.",
        };

      const requestResponse = await makePostPutRequest(
        `${apiEndpoint}/${commentId}/edit`,
        "PUT",
        body,
      );

      if (!requestResponse.error) {
        updateComments(requestResponse.comment);
      }

      return requestResponse;
    },
    [getSignInConfirm],
  );

  const deleteComment = useCallback(
    async (headers: Record<string, any>, commentId: string) => {
      if (!getSignInConfirm()) return;

      if (!headers["x-user-id"])
        return {
          error: true,
          errorMessage: "Invalid headers. x-user-id is required.",
        };

      const requestResponse = await makeDeleteRequest(
        `${apiEndpoint}/${commentId}/delete`,
        "DELETE",
        headers,
      );

      if (!requestResponse.error) {
        updateComments(requestResponse.comment);
      }
    },
    [getSignInConfirm],
  );

  const contextValue = useMemo(
    () => ({
      contentId,
      chapterId,
      commentsPayload,
      rootComments: getReplies(),
      getReplies,
      changeCommentsOrder,
      makeComment,
      voteComment,
      userId: session.data?.user.id,
      editComment,
      deleteComment,
      loadMoreComments,
    }),
    [
      contentId,
      chapterId,
      commentsPayload,
      getReplies,
      makeComment,
      voteComment,
      session.data?.user.id,
      editComment,
      deleteComment,
      loadMoreComments,
    ],
  );

  return (
    <NestedCommentSystemContext.Provider value={contextValue}>
      {children}
    </NestedCommentSystemContext.Provider>
  );
}
