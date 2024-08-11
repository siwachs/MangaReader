import { Dispatch, SetStateAction, useState, useCallback } from "react";

import ModelOverlay from "../utils/modelOverlay";

import { IoArrowBack } from "react-icons/io5";
import {
  FaRegCircleCheck,
  FaCircleChevronLeft,
  FaCircleChevronRight,
  FaCircleCheck,
} from "react-icons/fa6";

const ImagePickAndUploadTool: React.FC<{
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  selectionLimit?: number;
}> = ({ images, setImages, selectionLimit }) => {
  const [selectedSlides, setSelectedSlides] = useState<string[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const totalSlides = images.length;
  const totalSelectedSlides = selectedSlides.length;
  const leftNavigationDisabled = activeSlide === 0;
  const rightNavigationDisabled = activeSlide === images.length - 1;
  const currentSlide = images[activeSlide];
  const isSlideSelected = selectedSlides.includes(currentSlide);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const selectSlide = useCallback(() => {
    if (selectionLimit && selectionLimit === totalSelectedSlides)
      return alert(`Select upto ${selectionLimit} images`);

    setSelectedSlides((prev) => [...prev, currentSlide]);
  }, [currentSlide, totalSelectedSlides, selectionLimit]);

  const removeSlide = useCallback(() => {
    setSelectedSlides((prev) => prev.filter((slide) => slide !== currentSlide));
  }, [currentSlide]);

  return (
    <ModelOverlay zIndex={9999} blackBg>
      <div className="fixed left-0 right-0 top-0 z-[99999] flex h-[60px] items-center justify-between bg-gray-600/85 px-5 text-[var(--app-bg-color-primary)]">
        <IoArrowBack
          tabIndex={0}
          role="button"
          onClick={() => setImages([])}
          aria-label="Go back"
          className="size-5"
        />

        <span className="select-none">
          {activeSlide + 1}/{totalSlides}
        </span>

        {isSlideSelected ? (
          <FaCircleCheck
            tabIndex={0}
            role="button"
            onClick={removeSlide}
            aria-label="Remove Slide"
            className="size-5 text-green-500"
          />
        ) : (
          <FaRegCircleCheck
            tabIndex={0}
            role="button"
            onClick={selectSlide}
            aria-label="Select Slide"
            className="size-5"
          />
        )}
      </div>

      <div className="hidden-scrollbar relative mt-[60px] flex h-[calc(100vh-120px)] overflow-y-auto overflow-x-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex h-full w-full flex-shrink-0 items-center justify-center transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            <img
              src={image}
              alt={`slide-${index}`}
              className="h-auto max-w-full"
            />
          </div>
        ))}

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
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-[99999] flex h-10 select-none items-center justify-end bg-gray-600/85 px-5 text-[var(--app-bg-color-primary)]">
        {totalSelectedSlides === 0 ? (
          <span>Please Select</span>
        ) : (
          <button className="flex items-center gap-1.5 text-orange-600">
            <span className="flex size-[18px] items-center justify-center rounded-full bg-orange-600 text-xs text-white">
              {totalSelectedSlides}
            </span>
            {selectionLimit ? (
              <span>
                {totalSelectedSlides === selectionLimit
                  ? "Completed"
                  : "Please Select"}
              </span>
            ) : (
              <span>Next</span>
            )}
          </button>
        )}
      </div>
    </ModelOverlay>
  );
};

export default ImagePickAndUploadTool;
