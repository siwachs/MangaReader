import { Dispatch, SetStateAction } from "react";

import { imageFileToBase64 } from "../imageProcessing";

/**
 * Create keydown events for button-like behavior on non interactive elements.
 * @param onClick - Function to be called on keydown.
 * @returns A keydown event handler function.
 */
export const createKeydownEvent = (onClick?: () => void) => {
  if (!onClick) return undefined;

  return (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") onClick();
  };
};

/**
 * Handle onChange events for input field of type file
 * @param setImages - State to set images.
 * @param maxFileSize - Define each image's max size fallback to 3MB
 * @returns A onChange event handler function.
 */
export const getUpdateImageSelectionEvent = (
  setImages: Dispatch<SetStateAction<string[]>>,
  callback?: () => void,
  maxFileSize?: number,
) => {
  const effectiveMaxFileSize = maxFileSize ?? 3;
  const MAX_FILE_SIZE = effectiveMaxFileSize * 1024 * 1024; // Convert MB to bytes

  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = e.target.files || null;
    if (!selectedImages) return;

    const filesArray = Array.from(selectedImages);
    const errorMessages: string[] = [];

    const filteredImagesPromises = filesArray
      .filter((file) => {
        const isImage = file.type.startsWith("image/");
        const isWithinSizeLimit = file.size <= MAX_FILE_SIZE;

        if (!isImage) errorMessages.push(`${file.name} is not a image.`);
        if (!isWithinSizeLimit)
          errorMessages.push(
            `${file.name} exceeds the size limit of ${effectiveMaxFileSize}MB.`,
          );

        return isImage && isWithinSizeLimit;
      })
      .map((file) => imageFileToBase64(file));

    if (errorMessages.length > 0) return alert(errorMessages.join("\n"));

    Promise.all(filteredImagesPromises).then((filteredImages) => {
      setImages(filteredImages);
      if (callback) callback();
    });
  };
};
