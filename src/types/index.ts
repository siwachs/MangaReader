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
  chapterId: null;
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
  voteType?: VoteType;
};

export type SortKey = "BEST" | "NEWEST" | "OLDEST";

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
  contentId: string;
  id: string;
  title: string;
  images: string[];
  description?: string;
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
  chaptersUpdatedOn: string;
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
  status?: 404;
  error: boolean;
  content?: Content;
  errorMessage?: string;
};
