import Axios from "./axiosConfig";

import { capitalizeText } from "./utils";

// Image Server...
import { ref, deleteObject, listAll } from "firebase/storage";
import storage from "@/lib/firebase";

const deleteChapterFromFileServer = async (pathToDelete) => {
  try {
    const dirRef = ref(storage, pathToDelete);
    const fileListSnapshot = await listAll(dirRef);
    const filePromises = fileListSnapshot.items.map((ref) => deleteObject(ref));
    await Promise.all(filePromises);
  } catch (error) {
    throw error;
  }
};

const deleteFolderAndContent = async (folderPath) => {
  const dirRef = ref(storage, folderPath);

  try {
    const fileList = await listAll(dirRef);
    const deletePromises = fileList.prefixes.map(async (prefix) => {
      await deleteChapterFromFileServer(prefix.fullPath);
    });

    await Promise.all(deletePromises);
  } catch (error) {
    throw error;
  }
};

export const deleteAllChapters = async (content_id, contentTitle) => {
  try {
    const folderPath = `Content/${capitalizeText(contentTitle)}/chapters`;
    deleteFolderAndContent(folderPath);

    await Axios.delete(`/api/chapter?content_id=${content_id}&type=all`);
  } catch (error) {
    throw error;
  }
};

export const deleteChapter = async (
  contentTitle,
  chapterTitle,
  content_id,
  chapter_id
) => {
  const pathToDelete = `Content/${capitalizeText(
    contentTitle
  )}/chapters/${capitalizeText(chapterTitle)}`;
  try {
    await deleteChapterFromFileServer(pathToDelete);
    await Axios.delete(
      `/api/chapter?content_id=${content_id}&chapter_id=${chapter_id}&type=single`
    );
  } catch (error) {
    throw error;
  }
};

export const deleteContentFromFileServer = async (
  content_id,
  content_title
) => {
  try {
    await deleteAllChapters(content_id, content_title);
    await deleteChapterFromFileServer(
      `/Content/${capitalizeText(content_title)}/displayImages`
    );
    await Axios.delete(`/api/content?content_id=${content_id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
