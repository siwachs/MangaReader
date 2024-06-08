export type Chapter = { _id: string; title: string; releaseDate: string };

type News = { title: string; link: string; shortDescription: string };

type LatestUpdates = { title: string; link: string };

export type Content = {
  poster: string;
  title: string;
  genres: string[];
  status: string;
  rating: number;
  author: string;
  synonyms: string[];
  reminderText: string;
  chapters: Chapter[];
  totalChapters: number;
  description: string;
  galleryImages: string[];
  newsList: News[];
  latestUpdates: LatestUpdates[];
};
