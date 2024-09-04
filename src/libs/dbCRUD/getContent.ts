import connectToMongoDB from "../db/connectToMongoDB";

import { Content } from "@/models";

import { ContentResponse } from "@/types";
import {
  partialContentForUpdate,
  partialContentForContentPage,
  partialGenre,
  partialChapters,
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

export async function getContentTitleAndDescription(
  contentId: string,
  { getTitle = false } = {},
): Promise<{ title?: string; description?: string }> {
  await connectToMongoDB();
  const partialContent = getTitle ? "title" : "title description";

  try {
    const contentDoc = await Content.findById(contentId).select(partialContent);

    return {
      title: contentDoc?.title,
      description: contentDoc?.description,
    };
  } catch (error: any) {
    return {};
  }
}
