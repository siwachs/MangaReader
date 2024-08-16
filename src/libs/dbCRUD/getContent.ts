import connectToMongoDB from "../db/connectToMongoDB";
import Content from "@/models/Content";

import { partialContent } from "../mongooseSelect";
import formatMongooseDoc from "../db/formatMongooseDoc";

export default async function getContent(contentId?: string) {
  try {
    if (!contentId) return { error: false, content: null };

    await connectToMongoDB();
    const contentDoc = await Content.findById(contentId).select(partialContent);
    const formatedContentDoc = contentDoc
      ? formatMongooseDoc(contentDoc.toObject())
      : null;
    console.log(JSON.parse(JSON.stringify(formatedContentDoc)));

    return {
      error: false,
      content: JSON.parse(JSON.stringify(formatedContentDoc)),
    };
  } catch (error: any) {
    return {
      error: true,
      errorMessage: error.message,
    };
  }
}
