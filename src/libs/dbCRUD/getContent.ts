import connectToMongoDB from "../db/connectToMongoDB";

import { Content } from "@/models";

import { ContentResponse, ChaptersResponse, Chapter } from "@/types";
import {
  partialContentForUpdate,
  partialContentForContentPage,
  partialGenre,
  partialChapters,
  partialChaptersWithDescription,
  partialChaptersWithImages,
} from "../mongooseSelect";
import formatMongooseDoc from "../db/formatMongooseDoc";

export default async function getContent(
  contentId: string,
  { forContentPage = false, forClientComponent = false } = {},
): Promise<ContentResponse> {
  try {
    await connectToMongoDB();
    const partialContent = forContentPage
      ? partialContentForContentPage
      : partialContentForUpdate;

    const contentDoc = forContentPage
      ? await Content.findById(contentId)
          .select(partialContent)
          .populate({ path: "genres", select: partialGenre })
          .populate({ path: "chapters", select: partialChapters })
      : await Content.findById(contentId).select(partialContent);

    if (!contentDoc)
      return { status: 404, error: true, errorMessage: "Content not found." };

    const formattedContentDoc = formatMongooseDoc(contentDoc.toObject());

    return {
      error: false,
      content: forClientComponent
        ? JSON.parse(JSON.stringify(formattedContentDoc))
        : formattedContentDoc,
    };
  } catch (error: any) {
    return {
      error: true,
      errorMessage: error.message,
    };
  }
}

export async function getContentChapters(
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

export async function getContentChapter(
  contentId: string,
  chapterId: string,
  { withDescription = false, withImages = false } = {},
): Promise<{
  status?: 404;
  error: boolean;
  chapter?: Chapter;
  errorMessage?: string;
}> {
  try {
    await connectToMongoDB();
    const partialChaptersSelect = withDescription
      ? partialChaptersWithDescription
      : withImages
        ? partialChaptersWithImages
        : partialChapters;

    const contentDoc = await Content.findById(contentId)
      .select("chapters")
      .populate({ path: "chapters", select: partialChaptersSelect });
    const chapter = contentDoc?.chapters.filter(
      (content: any) => content._id.toString() === chapterId,
    );
    if (!chapter)
      return { status: 404, error: true, errorMessage: "Chapter not found." };

    return {
      error: false,
      chapter: formatMongooseDoc(chapter?.[0].toObject()) as Chapter,
    };
  } catch (error: any) {
    return { error: true, errorMessage: error.message };
  }
}

export async function getContentTitleAndDescription(
  contentId: string,
): Promise<{ title?: string; description?: string }> {
  await connectToMongoDB();

  try {
    const contentDoc =
      await Content.findById(contentId).select("title description");

    return {
      title: contentDoc?.title,
      description: contentDoc?.description,
    };
  } catch (error: any) {
    return {};
  }
}
