"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import uuidv4 from "@/libs/uuidv4";
import { useToastContainer } from "./toastContainerContext";
import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { CommentsPayload, Comment, SortKey, VoteType } from "@/types";

import {
  makeDeleteRequest,
  makePostPutRequest,
  makeGetRequest,
} from "@/service/asyncApiCalls";
import SpoilerTag from "@/customHtmlElements/SpoilerElement";

type ContextType = {
  contentId: string;
  chapterId?: string;
  commentsPayload: CommentsPayload;
  rootComments: Comment[];
  getReplies: any;
  changeCommentsOrder: any;
  makeComment: any;
  voteComment: any;
  userId?: string;
  editComment: any;
  deleteComment: any;
  loadMoreComments: any;
};

const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_COMMENTS as string;

const initialCommentsPayload: CommentsPayload = {
  loading: true,
  error: false,
  totalPages: 0,
  totalComments: 0,
  pageNumber: 1,
  comments: [],
  sortKey: "BEST",
  loadMoreCommentsLoding: false,
};

const initialContextValue = {
  contentId: "0",
  commentsPayload: initialCommentsPayload,
  rootComments: [],
  getReplies: undefined,
  changeCommentsOrder: undefined,
  makeComment: undefined,
  voteComment: undefined,
  editComment: undefined,
  deleteComment: undefined,
  loadMoreComments: undefined,
};

const NestedCommentSystemContext =
  createContext<ContextType>(initialContextValue);

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
  const { addToast } = useToastContainer();

  const currentUrl = usePathname();
  const session = useSession();
  const [commentsPayload, setCommentsPayload] = useState<CommentsPayload>(
    initialCommentsPayload,
  );

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !window.customElements.get("spoiler-tag")
    ) {
      window.customElements.define("spoiler-tag", SpoilerTag);
    }
  }, []);

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
        setCommentsPayload((prev) => ({ ...prev, ...commentsPayloadParsed }));
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

  // Method to change comments order
  const changeCommentsOrder = (sortKey: SortKey) => {
    setCommentsPayload((prev) => ({ ...prev, sortKey }));
  };

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

  const getSignInConfirm = useCallback(() => {
    if (!session?.data) {
      if (confirm("Sign in with Google?")) {
        signIn("google", { callbackUrl: currentUrl });
      }

      return false;
    }

    return true;
  }, [currentUrl, session?.data?.user.id]);

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

      if (requestResponse.error)
        return addToast({
          id: uuidv4(),
          type: "error",
          text: requestResponse.errorMessage,
        });

      const { comments, ...restOfPayload } = requestResponse;
      setCommentsPayload((prev) => ({
        ...prev,
        ...restOfPayload,
        comments: [...prev.comments, ...comments],
      }));
    },
    [chapterId, contentId, commentsPayload.sortKey],
  );

  const makeComment = useCallback(
    async (body: Record<string, any>) => {
      if (!getSignInConfirm()) return;
      const { contentId, userId, message } = body;
      if (!contentId || !userId || !message?.trim())
        return addToast({
          id: uuidv4(),
          type: "warning",
          text: "Invalid body bad request. contentId, userId and message are required.",
        });

      const requestResponse = await makePostPutRequest(
        apiEndpoint,
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
              comments: [...prev.comments, comment],
            };
        }
      });
    },
    [getSignInConfirm],
  );

  const voteComment = useCallback(
    async (
      body: Record<string, any>,
      commentId: string,
      voteType: VoteType,
    ) => {
      if (!getSignInConfirm()) return;
      if (!body?.userId)
        return addToast({
          id: uuidv4(),
          type: "warning",
          text: "Invalid body bad request. userId is required.",
        });

      const requestResponse = await makePostPutRequest(
        `${apiEndpoint}/${commentId}/vote/${voteType}`,
        "PUT",
        body,
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

  const editComment = useCallback(
    async (body: Record<string, any>, commentId: string) => {
      if (!getSignInConfirm()) return;
      if (!body?.userId || !body?.message.trim())
        return addToast({
          id: uuidv4(),
          type: "warning",
          text: "Invalid body bad request. userId and message are required.",
        });

      const requestResponse = await makePostPutRequest(
        `${apiEndpoint}/${commentId}/edit`,
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
    [getSignInConfirm],
  );

  const deleteComment = useCallback(
    async (headers: Record<string, any>, commentId: string) => {
      if (!getSignInConfirm()) return;

      if (!headers["x-user-id"])
        return addToast({
          id: uuidv4(),
          type: "warning",
          text: "Invalid headers. x-user-id is required.",
        });

      const requestResponse = await makeDeleteRequest(
        `${apiEndpoint}/${commentId}/delete`,
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
    [getSignInConfirm],
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
          userId: session?.data?.user.id,
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
          session?.data?.user.id,
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
