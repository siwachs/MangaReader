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

type ContextType = {
  commentsPayload: CommentsPayload;
  rootComments: Comment[];
  getReplies: any;
  changeCommentsOrder: any;
};

const NestedCommentSystemContext = createContext<ContextType>({
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
          `/api/comments?${queryParams}`,
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
  }, [commentsPayload.comments]);

  const getReplies = useCallback(
    (parentId = "root") => {
      return getCommentsByParentId[parentId] ?? [];
    },
    [getCommentsByParentId],
  );

  const contextValue = useMemo(
    () => ({
      commentsPayload,
      rootComments: getReplies(),
      getReplies,
      changeCommentsOrder,
    }),
    [commentsPayload, getReplies],
  );

  return (
    <NestedCommentSystemContext.Provider value={contextValue}>
      {children}
    </NestedCommentSystemContext.Provider>
  );
}
