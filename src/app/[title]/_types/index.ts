export type ChaptersOrder = "positive" | "reverse";

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
