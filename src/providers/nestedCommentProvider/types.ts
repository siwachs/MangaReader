import { Comment, SortKey, VoteType } from "@/types";

export type CommentsPayload = {
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

export type Context = {
  contentId: string;
  chapterId?: string;
  commentsPayload: CommentsPayload;
  updateCommentsPayload: (updated: Partial<CommentsPayload>) => void;
  rootComments: Comment[];
  getReplies: (parentId?: string) => Comment[];
  changeCommentsOrder: (sortKey: SortKey) => void;
  makeComment: (
    body: Record<string, any>,
    callback?: () => void,
  ) => Promise<void>;
  voteComment: (
    body: Record<string, any>,
    commentId: string,
    voteType: VoteType,
    callback?: () => void,
  ) => Promise<void>;
  userId?: string;
  username?: string;
  editComment: (
    body: Record<string, any>,
    commentId: string,
    callback?: () => void,
  ) => Promise<void>;
  deleteComment: (
    headers: Record<string, any>,
    commentId: string,
    callback?: () => void,
  ) => Promise<void>;
  loadMoreComments: (pageNumber: number) => Promise<void>;
};
