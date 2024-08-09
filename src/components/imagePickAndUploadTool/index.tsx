import { Dispatch, SetStateAction, useState } from "react";

import ModelOverlay from "../utils/modelOverlay";

import { IoArrowBack } from "react-icons/io5";
import {
  FaRegCircleCheck,
  FaCircleChevronLeft,
  FaCircleChevronRight,
} from "react-icons/fa6";

const ImagePickAndUploadTool: React.FC<{
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}> = ({ images, setImages }) => {
  const [activeSlide, setActiveSlide] = useState(0);

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
          {activeSlide + 1}/{images.length}
        </span>

        <FaRegCircleCheck className="size-5" />
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
          onClick={() =>
            setActiveSlide((prev) => {
              if (prev - 1 < 0) return prev;

              return prev - 1;
            })
          }
          aria-label="Prev Slide"
          className="absolute left-2 top-1/2 size-7 -translate-y-1/2 text-[var(--app-bg-color-primary)]"
        />

        <FaCircleChevronRight
          tabIndex={0}
          role="button"
          onClick={() => {
            setActiveSlide((prev) => {
              if (prev + 1 === images.length) return prev;

              return prev + 1;
            });
          }}
          aria-label="Next Slide"
          className="absolute right-2 top-1/2 size-7 -translate-y-1/2 text-[var(--app-bg-color-primary)]"
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-[99999] flex h-10 select-none items-center justify-end bg-gray-600/85 px-5 text-[var(--app-bg-color-primary)]">
        Please Select
      </div>
    </ModelOverlay>
  );
};

export default ImagePickAndUploadTool;
