import { Dispatch, SetStateAction, useState } from "react";

import ModelOverlay from "../utils/modelOverlay";

import { IoArrowBack } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import {
  FaRegCircleCheck,
  FaCircleChevronLeft,
  FaCircleChevronRight,
  FaCheck,
} from "react-icons/fa6";

const ImagePickAndUploadTool: React.FC<{
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}> = ({ images, setImages }) => {
  const [selectedSlides, setSelectedSlides] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const leftNavigationDisabled = activeSlide === 0;
  const rightNavigationDisabled = activeSlide === images.length - 1;
  const currentSlide = activeSlide + 1;
  const totalSlides = images.length;

  const prevSlide = () => {
    setActiveSlide((prev) => {
      if (prev - 1 < 0) return prev;

      return prev - 1;
    });
  };

  const nextSlide = () => {
    setActiveSlide((prev) => {
      if (prev + 1 === images.length) return prev;

      return prev + 1;
    });
  };

  const selectSlide = () => {};

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
          {currentSlide}/{totalSlides}
        </span>

        <FaRegCircleCheck
          tabIndex={0}
          role="button"
          onClick={selectSlide}
          aria-label="Select Slide"
          className="size-5"
        />
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
        Please Select
      </div>
    </ModelOverlay>
  );
};

export default ImagePickAndUploadTool;
