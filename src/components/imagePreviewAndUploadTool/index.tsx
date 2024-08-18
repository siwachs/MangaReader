import { useState, useCallback } from "react";

import ModelOverlay from "../utils/modelOverlay";

import { FiDownload } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const headerOrFooterWrapperClasses =
  "fixed left-0 w-full bg-gray-600/85 p-[19px_16px] text-white md:text-lg";
const headerOrFooterClasses =
  "mx-auto flex max-w-[1600px] items-center justify-between";
const navigationButtonClasses =
  "absolute top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white";

const ImagePreviewAndUploadTool: React.FC<{
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

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = images[activeSlide];
    link.download = `${title}-${activeSlide + 1}`;

    link.click();
  };

  return (
    <ModelOverlay blackBg>
      <div className={`${headerOrFooterWrapperClasses} top-0`}>
        <div className={headerOrFooterClasses}>
          <IoArrowBack
            onClick={goBackCallback}
            tabIndex={0}
            role="button"
            aria-label="Go Back"
            className="size-5 md:size-[22px]"
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
      </div>

      <div className="relative mx-auto mt-[62px] flex h-[calc(100vh-124px)] max-w-[800px] overflow-hidden md:mt-[66px] md:h-[calc(100vh-132px)]">
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
            <button
              onClick={prevSlide}
              aria-label="Prev Slide"
              className={`${navigationButtonClasses} left-2`}
            >
              <FaChevronLeft className="size-[22px]" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className={`${navigationButtonClasses} right-2`}
            >
              <FaChevronRight className="size-[22px]" />
            </button>
          </>
        )}
      </div>

      <div className={`${headerOrFooterWrapperClasses} bottom-0`}>
        <div className={headerOrFooterClasses}>
          {title && <p className="select-none truncate break-words">{title}</p>}

          <FiDownload
            onClick={downloadImage}
            tabIndex={0}
            role="button"
            aria-label="Download current image"
            className="size-5 md:size-[22px]"
          />
        </div>
      </div>
    </ModelOverlay>
  );
};

export default ImagePreviewAndUploadTool;
