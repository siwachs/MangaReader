export type pageReqObj = {
  params: {
    content_id?: string;
    chapter_id?: string;
  };
  searchParams: {
    content_id?: string;
  };
};

// Header NavLink
export type LinkObject = {
  key: string;
  Icon?: any;
  sidebarOnly?: boolean;
  label: string;
  link: string;
};

// Nested Comment System's types
export type VoteType = "up" | "down";

export type Comment = {
  id: string;
  parentId: string;
  message: string;
  contentId: string;
  chapterId?: string;
  user: {
    id: string;
    username?: string;
    avatar: string;
  };
  upVotes: number;
  downVotes: number;
  isEdited: boolean;
  isReported: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  voteType?: VoteType;
};

export type SortKey = "BEST" | "NEWEST" | "OLDEST";

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

// Content Page And CMS
export type Tags =
  | "BannerContent"
  | "ReadWithEditor"
  | "CompletedClassic"
  | "WeeklyNovel"
  | "FreeRead";

export type Status =
  | "Ongoing"
  | "Discontinued"
  | "Abandoned"
  | "Unscheduled"
  | "Completed";

export type Genre = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Chapter = {
  id: string;
  title: string;
  images: string[];
  noOfViews: number;
  noOfLikes: number;
  createdAt: string;
};

type News = { id: string; title: string; shortDescription: string };

export type Content = {
  id: string;
  tags: Tags[];
  thumbnail: string;
  poster: string;
  title: string;
  status: Status;
  genres: Genre[] | string[];
  rating: number;
  noOfViews: number;
  noOfSubscribers: number;
  author: string;
  synonyms: string[];
  chapters: Chapter[];
  chaptersCount: number;
  description: string;
  imagesAndWallpapers: string[];
  news: News[];
  createdAt: string;
  updatedAt: string;
};

export type GenresResponse = {
  error: boolean;
  genres?: Genre[];
  errorMessage?: string;
};

export type ContentResponse = {
  error: boolean;
  content?: Content;
  errorMessage?: string;
};
