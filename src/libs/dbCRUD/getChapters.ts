import connectToMongoDB from "../db/connectToMongoDB";

import { Content } from "@/models";

import { Chapter } from "@/types";
import {
  partialChapters,
  partialChaptersWithDescription,
  partialChaptersWithImages,
} from "../mongooseSelect";
import formatMongooseDoc from "../db/formatMongooseDoc";

type ChaptersResponse = {
  error: boolean;
  chapters: Chapter[];
  errorMessage?: string;
};

type ChapterResponse = {
  status?: 404;
  error: boolean;
  chapter?: Chapter;
  prevChapter?: string;
  nextChapter?: string;
  errorMessage?: string;
};

export default async function getChapters(
  contentId: string,
  { forClientComponent = false } = {},
): Promise<ChaptersResponse> {
  await connectToMongoDB();

  try {
    const chaptersDoc = await Content.findById(contentId)
      .select("chapters")
      .populate({ path: "chapters", select: partialChapters });

    const formattedChaptersDoc =
      chaptersDoc?.chapters.map((chapter: any) =>
        formatMongooseDoc(chapter.toObject()),
      ) ?? [];

    return {
      error: true,
      chapters: forClientComponent
        ? JSON.parse(JSON.stringify(formattedChaptersDoc))
        : formattedChaptersDoc,
    };
  } catch (error: any) {
    return { error: true, chapters: [], errorMessage: error.message };
  }
}

export async function getChapter(
  contentId: string,
  chapterId: string,
  { withDescription = false, withImages = false } = {},
): Promise<ChapterResponse> {
  try {
    await connectToMongoDB();
    let partialChaptersSelect;

    if (withDescription) {
      partialChaptersSelect = partialChaptersWithDescription;
    } else if (withImages) {
      partialChaptersSelect = partialChaptersWithImages;
    } else {
      partialChaptersSelect = partialChapters;
    }

    const contentDoc = await Content.findById(contentId)
      .select("chapters")
      .populate({ path: "chapters", select: partialChaptersSelect });

    const chapterIndex = contentDoc?.chapters.findIndex(
      (content: any) => content._id.toString() === chapterId,
    );
    if (chapterIndex === -1)
      return { status: 404, error: true, errorMessage: "Chapter not found." };

    const chapters = contentDoc?.chapters ?? [];
    const currentChapter = chapters[chapterIndex];

    const prevChapter =
      chapterIndex > 0 ? chapters[chapterIndex - 1]._id.toString() : undefined;
    const nextChapter =
      chapterIndex < chapters.length - 1
        ? chapters[chapterIndex + 1]._id.toString()
        : undefined;

    return {
      error: false,
      chapter: formatMongooseDoc(currentChapter.toObject()) as Chapter,
      prevChapter,
      nextChapter,
    };
  } catch (error: any) {
    return { error: true, errorMessage: error.message };
  }
}
