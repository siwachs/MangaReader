import { useRef, useState, useEffect } from "react";

const ImagePicker = ({
  chapterImages,
  setChapterImages,
  imageUrls,
  setImageUrls,
  loading,
}) => {
  const [dragOverText, setDragOverText] = useState(false);
  const imagePickerRef = useRef(null);

  const getImageUrl = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    return new Promise((resolve) => {
      reader.onload = (loadedImage) => {
        resolve(loadedImage.target.result);
      };
    });
  };

  useEffect(() => {
    const fetchUrls = async () => {
      for (const imageObj of chapterImages) {
        const imageUrl = await getImageUrl(imageObj);
        if (imageUrls.includes(imageUrl)) continue;
        setImageUrls((prevState) => [...prevState, imageUrl]);
      }
    };

    fetchUrls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterImages]);

  const storeImages = (images) => {
    const filteredImages = images.filter(
      (file) => file.type.split("/")[0] === "image"
    );

    if (filteredImages.length === 0) return;

    const newImages = filteredImages.filter((image) => {
      const imageName = image.name;
      const imageSize = image.size;
      const imageLastModified = image.lastModified;

      return !chapterImages.some(
        (existingImage) =>
          existingImage.name === imageName &&
          existingImage.size === imageSize &&
          existingImage.lastModified === imageLastModified
      );
    });

    if (newImages.length === 0) return;

    setChapterImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleFilePickerChange = async (event) => {
    const files = Array.from(event.target.files);
    storeImages(files);
  };

  return (
    <button
      onDragOver={(event) => {
        event.preventDefault();
        setDragOverText(true);
      }}
      onDrop={(event) => {
        event.preventDefault();
        storeImages(Array.from(event.dataTransfer.files));
        setDragOverText(false);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setDragOverText(false);
      }}
      onClick={() => imagePickerRef.current.click()}
      className="h-52 w-full border border-dashed border-blue-500 text-blue-500"
      disabled={loading}
    >
      {!dragOverText
        ? "Drag and drop images or click to select images."
        : "Drop Images Here."}
      <input
        onChange={handleFilePickerChange}
        ref={imagePickerRef}
        type="file"
        multiple
        accept="image/*"
        hidden
      />
    </button>
  );
};

export default ImagePicker;
