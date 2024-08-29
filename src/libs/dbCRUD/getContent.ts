import connectToMongoDB from "../db/connectToMongoDB";
import Content from "@/models/Content";

import { ContentResponse } from "@/types";
import {
  partialContentForUpdate,
  partialContentForContentPage,
} from "../mongooseSelect";
import formatMongooseDoc from "../db/formatMongooseDoc";

export default async function getContent(
  contentId: string,
  { forContentPage = false, forClientComponent = false } = {},
): Promise<ContentResponse> {
  try {
    await connectToMongoDB();

    const contentDoc = await Content.findById(contentId)
      .select(
        forContentPage ? partialContentForContentPage : partialContentForUpdate,
      )
      .populate({ path: "genres", select: "name" });

    if (!contentDoc) return { error: true, errorMessage: "Content not found." };

    const formatedContentDoc = formatMongooseDoc(contentDoc.toObject());

    return {
      error: false,
      content: forClientComponent
        ? JSON.parse(JSON.stringify(formatedContentDoc))
        : formatedContentDoc,
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
