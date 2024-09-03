"use server";

import { revalidatePath } from "next/cache";

import connectToMongoDB from "@/libs/db/connectToMongoDB";
import Genre from "@/models/Genre";
import Content from "@/models/Content";

import { Content as ContentType } from "@/types";
import { MONGOOSE_DUPLICATE_KEY_ERROR } from "@/constants";
import { isBase64Image, getValidContentPayload } from "@/libs/validations";
import {
  deleteFolder,
  moveFolder,
  uploadImageToFirebaseStorage,
  uploadImagesToFirebaseStorage,
} from "@/libs/firebaseStorage";

export const addGenre = async (prevState: any, formData: FormData) => {
  try {
    await connectToMongoDB();

    const name = (formData.get("name") as string).trim();
    if (!name)
      return { error: true, errorMessage: "Genre name can't be empty." };
    const description = (formData.get("description") as string).trim();
    if (!description)
      return { error: true, errorMessage: "Description can't be empty." };

    const existingGenre = await Genre.findOne({
      name: new RegExp(`^${name}`, "i"),
    });
    if (existingGenre)
      return { error: true, errorMessage: "Genre must be unique." };

    const genre = await Genre.create({ name, description });

    revalidatePath("/admin/content");
    return {
      error: false,
      errorMessage: undefined,
      resetForm: genre?._id.toString(),
    };
  } catch (error: any) {
    if (error.code === MONGOOSE_DUPLICATE_KEY_ERROR) {
      return { error: true, errorMessage: "Genre must be unique." };
    }

    return { error: true, errorMessage: error.message };
  }
};

export const addOrUpdateContent = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const validContentPayload = getValidContentPayload(formData);
    if (validContentPayload.error) return validContentPayload;

    const contentId = (formData.get("contentId") as string).trim();
    if (contentId)
      return updateContent(contentId, validContentPayload as ContentType);

    const { title, thumbnail, poster, imagesAndWallpapers } =
      validContentPayload as ContentType;
    if (await Content.findOne({ title }).select("_id"))
      return { error: true, errorMessage: "Title must be unique." };

    validContentPayload.thumbnail = await uploadImageToFirebaseStorage(
      `Content/${title}/thumbnail`,
      thumbnail,
    );
    validContentPayload.poster = await uploadImageToFirebaseStorage(
      `Content/${title}/poster`,
      poster,
    );

    validContentPayload.imagesAndWallpapers =
      await uploadImagesToFirebaseStorage(
        `Content/${title}/imagesAndWallpapers`,
        imagesAndWallpapers,
      );

    const content = await Content.create(validContentPayload);

    return {
      error: false,
      errorMessage: undefined,
      resetForm: content?._id.toString(),
    };
  } catch (error: any) {
    if (error.code === MONGOOSE_DUPLICATE_KEY_ERROR) {
      return { error: true, errorMessage: "Title must be unique." };
    }

    return { error: true, errorMessage: error.message };
  }
};

const updateContent = async (
  contentId: string,
  validContentPayload: ContentType,
) => {
  const content = await Content.findById(contentId).select("_id title");
  const {
    title: newTitle,
    thumbnail,
    poster,
    imagesAndWallpapers,
  } = validContentPayload;

  const oldTitle = content.title;
  const isTitleUpdateRequest = newTitle !== oldTitle;
  if (
    isTitleUpdateRequest &&
    (await Content.findOne({ title: newTitle }).select("_id"))
  )
    return { error: true, errorMessage: "Title must be unique." };

  if (isBase64Image(thumbnail))
    validContentPayload.thumbnail = await uploadImageToFirebaseStorage(
      `Content/${oldTitle}/thumbnail`,
      thumbnail,
    );

  if (isBase64Image(poster))
    validContentPayload.poster = await uploadImageToFirebaseStorage(
      `Content/${oldTitle}/poster`,
      poster,
    );

  const isImagesAndWallpapersUpdateRequest =
    imagesAndWallpapers.length === 0 || isBase64Image(imagesAndWallpapers[0]);

  if (isImagesAndWallpapersUpdateRequest) {
    await deleteFolder(`Content/${oldTitle}/imagesAndWallpapers`);

    validContentPayload.imagesAndWallpapers =
      await uploadImagesToFirebaseStorage(
        `Content/${oldTitle}/imagesAndWallpapers`,
        imagesAndWallpapers,
      );
  }

  if (isTitleUpdateRequest) {
    const updatedThumbnailAndPosterUrls = await moveFolder(
      `Content/${oldTitle}`,
      `Content/${newTitle}`,
    );
    const updatedImagesAndWallpapersUrls = await moveFolder(
      `Content/${oldTitle}/imagesAndWallpapers`,
      `Content/${newTitle}/imagesAndWallpapers`,
    );

    validContentPayload.thumbnail =
      updatedThumbnailAndPosterUrls[validContentPayload.thumbnail] ??
      validContentPayload.thumbnail;

    validContentPayload.poster =
      updatedThumbnailAndPosterUrls[validContentPayload.poster] ??
      validContentPayload.poster;

    validContentPayload.imagesAndWallpapers = Object.values(
      updatedImagesAndWallpapersUrls,
    );
  }

  await Content.findByIdAndUpdate(contentId, validContentPayload);

  revalidatePath("/admin/content");
  return { error: false, errorMessage: undefined };
};
