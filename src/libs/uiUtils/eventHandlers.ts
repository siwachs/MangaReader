import { Dispatch, SetStateAction } from "react";

import { imageFileToBase64 } from "../clientSideImageProcessing";

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
 * @returns A onChange event handler function.
 */
export const getUpdateImageSelectionEvent = (
  setImages: Dispatch<SetStateAction<string[]>>,
  callback?: () => void,
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = e.target.files || null;
    if (!selectedImages) return;

    const filteredImagesPromises = Array.from(selectedImages).map((file) => {
      if (file.type.startsWith("image/")) return imageFileToBase64(file);
    });

    Promise.all(filteredImagesPromises)
      .then((filteredImages) => {
        const validImages = filteredImages.filter(
          (image) => image !== undefined,
        );

        setImages(validImages);
        if (callback) callback();
      })
      .catch((error) => {});
  };
};
