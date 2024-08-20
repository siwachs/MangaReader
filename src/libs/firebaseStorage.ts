import { storage } from "@/firebase";
import {
  getDownloadURL,
  ref,
  uploadString,
  listAll,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

export async function uploadImageToFirebaseStorage(
  refPath: string,
  image: string,
): Promise<string> {
  const imageRef = ref(storage, refPath);
  await uploadString(imageRef, image, "data_url");
  const imageUrl = await getDownloadURL(imageRef);

  return imageUrl;
}

export async function uploadImagesToFirebaseStorage(
  refPath: string,
  images: string[],
): Promise<string[]> {
  const imagesPromises = images.map(
    async (image, index) =>
      await uploadImageToFirebaseStorage(`${refPath}/${index}`, image),
  );

  return await Promise.all(imagesPromises);
}

export async function deleteFolder(refPath: string) {
  const folderRef = ref(storage, refPath);
  const files = await listAll(folderRef);

  for (const file of files.items) {
    await deleteObject(file);
  }
}

export async function moveFolder(
  oldRefPath: string,
  newRefPath: string,
): Promise<Record<string, string>> {
  const sourceRef = ref(storage, oldRefPath);
  const destinationRef = ref(storage, newRefPath);

  const files = await listAll(sourceRef);

  const updatedUrls: Record<string, string> = {};
  for (const file of files.items) {
    const oldURL = await getDownloadURL(file);
    const response = await fetch(oldURL);
    const fileData = await response.blob();

    const newFileRef = ref(destinationRef, file.name);
    await uploadBytes(ref(destinationRef, file.name), fileData);

    const updatedUrl = await getDownloadURL(newFileRef);
    updatedUrls[oldURL] = updatedUrl;

    await deleteObject(file);
  }

  return updatedUrls;
}
