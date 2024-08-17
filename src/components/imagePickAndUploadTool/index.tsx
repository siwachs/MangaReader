import { useState, useCallback, useMemo } from "react";

import ModelOverlay from "../utils/modelOverlay";

import { FiDownload } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

const ImagePickAndUploadTool: React.FC<{
  images: string[];
  goBackCallback: () => void;
  onClickResetCallback?: () => void;
  title: string;
  onClickOkCallback?: () => void;
}> = ({
  images,
  goBackCallback,
  onClickResetCallback,
  title,
  onClickOkCallback,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = images.length;

  const leftNavigationDisabled = useMemo(
    () => activeSlide === 0,
    [activeSlide],
  );
  const rightNavigationDisabled = useMemo(
    () => activeSlide === images.length - 1,
    [activeSlide, images.length],
  );

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const downloadImage = useCallback(() => {
    const link = document.createElement("a");
    link.href = images[activeSlide];
    link.download = `${title}-${activeSlide + 1}`;

    link.click();
  }, [images, activeSlide]);

  return (
    <ModelOverlay blackBg>
      <div className="fixed top-0 flex w-full items-center justify-between bg-gray-600/85 p-[19px_16px] text-white">
        <IoArrowBack
          onClick={goBackCallback}
          tabIndex={0}
          role="button"
          aria-label="Go Back"
          className="size-5"
        />

        <span className="select-none">
          {activeSlide + 1} / {totalSlides}
        </span>

        <button
          onClick={onClickResetCallback}
          className="select-none text-orange-600"
        >
          Reset
        </button>
      </div>

      <div className="mt-[62px] flex h-[calc(100vh-124px)] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className="hide-scrollbar grid h-full w-full flex-shrink-0 place-items-center overflow-y-auto overflow-x-hidden transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            <img
              loading="lazy"
              src={image}
              alt={`slide-${index}`}
              className="h-auto max-w-full"
            />
          </div>
        ))}

        {totalSlides > 1 && (
          <>
            <FaCircleChevronLeft
              tabIndex={0}
              role="button"
              onClick={prevSlide}
              aria-label="Prev Slide"
              aria-disabled={leftNavigationDisabled}
              className={`absolute left-2 top-1/2 size-7 -translate-y-1/2 ${leftNavigationDisabled ? "pointer-events-none" : "text-[var(--app-bg-color-primary)]"}`}
            />

            <FaCircleChevronRight
              tabIndex={0}
              role="button"
              onClick={nextSlide}
              aria-label="Next Slide"
              aria-disabled={rightNavigationDisabled}
              className={`absolute right-2 top-1/2 size-7 -translate-y-1/2 ${rightNavigationDisabled ? "pointer-events-none" : "text-[var(--app-bg-color-primary)]"}`}
            />
          </>
        )}
      </div>

      <div className="fixed bottom-0 flex w-full items-center justify-between bg-gray-600/85 p-[19px_16px] text-white">
        {title && <p className="truncate break-words">{title}</p>}

        <FiDownload
          onClick={downloadImage}
          tabIndex={0}
          role="button"
          aria-label="Download current image"
          className="size-5"
        />
      </div>
    </ModelOverlay>
  );
};

export default ImagePickAndUploadTool;
