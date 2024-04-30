export type MenuType = "chapters" | "comments";

export type Chapter = {
  _id: string;
  title: string;
  releaseDate: string;
  noOfLike: number;
  noOfComments: number;
};

export type ChapterPayload = {
  chapters: Chapter[];
  infiniteScrollChapters: Chapter[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalChapters: number;
};
