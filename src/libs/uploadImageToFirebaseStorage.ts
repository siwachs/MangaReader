import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default async function (refPath: string, image: string) {
  const imageRef = ref(storage, refPath);
  await uploadString(imageRef, image, "data_url");
  const imageUrl = await getDownloadURL(imageRef);

  return imageUrl;
}
