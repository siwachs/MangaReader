"use client";

import { CommentsPayload, Comment, SortKey } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { makePostPutRequest } from "@/service/asyncApiCalls";

type ContextType = {
  contentId: any;
  chapterId: any;
  commentsPayload: CommentsPayload;
  rootComments: Comment[];
  getReplies: any;
  changeCommentsOrder: any;
  makeComment: any;
};

const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_COMMENTS as string;

const NestedCommentSystemContext = createContext<ContextType>({
  contentId: null,
  chapterId: null,
  commentsPayload: {
    loading: false,
    error: false,
    totalPages: 0,
    pageNumber: 1,
    comments: [],
    sortKey: "BEST",
  },
  rootComments: [],
  getReplies: null,
  changeCommentsOrder: null,
  makeComment: null,
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
  const [commentsPayload, setCommentsPayload] = useState<CommentsPayload>({
    loading: false,
    error: false,
    totalPages: 0,
    pageNumber: 1,
    comments: [],
    sortKey: "BEST",
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

    commentsPayload?.comments.map((comment) => {
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

  // Nested Comment System CRUD
  const makeComment = async (body: Record<string, any>) => {
    const { contentId, userId, message } = body;
    if (!contentId || !userId || !message?.trim())
      return { error: true, errorMessage: "Invalid body bad request." };

    const requestResponse = await makePostPutRequest(apiEndpoint, "POST", body);

    if (!requestResponse.error) {
      const { comment } = requestResponse;

      setCommentsPayload((prev) => {
        if (prev.sortKey === "NEWEST")
          return {
            ...prev,
            comments: [comment, ...prev.comments],
          };
        else if (prev.sortKey === "OLDEST")
          return {
            ...prev,
            comments: [...prev.comments, comment],
          };
        else {
          const commentWithZeroUpVotes = prev.comments.findIndex(
            (c) => c.upVotes === 0,
          );

          if (commentWithZeroUpVotes !== -1) {
            return {
              ...prev,
              comments: [
                ...prev.comments.slice(0, commentWithZeroUpVotes),
                comment,
                ...prev.comments.slice(commentWithZeroUpVotes),
              ],
            };
          } else
            return {
              ...prev,
              comments: [...prev.comments, comment],
            };
        }
      });
    } else {
      setCommentsPayload((prev) => ({
        ...prev,
        error: true,
        errorMessage: requestResponse.errorMessage,
      }));
    }
  };

  const contextValue = useMemo(
    () => ({
      contentId,
      chapterId,
      commentsPayload,
      rootComments: getReplies(),
      getReplies,
      changeCommentsOrder,
      makeComment,
    }),
    [contentId, chapterId, commentsPayload, getReplies],
  );

  return (
    <NestedCommentSystemContext.Provider value={contextValue}>
      {children}
    </NestedCommentSystemContext.Provider>
  );
}
