import NodeCache from "node-cache";

import Axios from "./axiosConfig";
import {
  additionalGenres,
  initialInputsForUploadContent,
} from "@/CONSTANT_DATA";

const cache = new NodeCache({ stdTTL: 210 });

export const getCachedGenreList = async () => {
  const cachedGenres = cache.get("genres");

  if (cachedGenres) {
    return cachedGenres;
  }

  try {
    const response = await Axios.get("/api/tags");
    const genres = [...additionalGenres, ...response.data];
    cache.set("genres", genres);
    return genres;
  } catch (error) {
    return [];
  }
};

export const getRecommended = async () => {
  const cachedRecommended = cache.get("recommended");

  if (cachedRecommended) {
    return cachedRecommended;
  }

  try {
    const response = await Axios.get(`/api/content`, {
      params: {
        contentType: "recommended",
        selectedFields: "displayImagePoster,title,populatedTags",
        limit: 6,
      },
    });
    const recommended = response.data;
    cache.set("recommended", recommended);
    return recommended;
  } catch (error) {
    return [];
  }
};

export const increaseViewCount = async (content_id) => {};

export const transformText = (value) => {
  return value?.replace(/\s+/g, " ").trim() || "";
};

export const capitalizeText = (text) => {
  return (
    text
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ") || ""
  );
};

export const getInitialInputsForUploadContent = (content) => {
  if (content)
    return {
      ...initialInputsForUploadContent,
      contentType: content.contentType,
      displayImageThumbnail: content.displayImageThumbnail,
      displayImagePoster: content.displayImagePoster,
      title: content.title,
      status: content.status,
      authorName: content.authorName,
      description: content.description,
      selectedGenres:
        content.populatedTags.map((genre) => genre.tagName) ||
        content.tags.map((genre) => genre.tagName),
      tags:
        content.populatedTags.map((genre) => genre._id) ||
        content.tags.map((genre) => genre._id),
    };
  else return initialInputsForUploadContent;
};
