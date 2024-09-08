"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./slider.css";

import { BANNER_AUTO_NEXT_DELAY } from "@/constants";
import ErrorMessage from "@/components/messages/errorMessage";
import { ContentListResponse } from "@/libs/dbCRUD/getContentList";
import { contentCoverBlurDataImageURL } from "@/data/imageDataUrls";

import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Banner: React.FC<{
  bannerListResponse: ContentListResponse;
}> = ({ bannerListResponse }) => {
  const { error, errorMessage, contentList } = bannerListResponse;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentSlide, setCurrentSlide] = useState(
    contentList.length > 0 ? Math.floor(contentList.length / 2) : 0,
  );

  const getImageClass = (index: number): string => {
    if (index === currentSlide) return "centerActive";
    if ((currentSlide - 1 + contentList.length) % contentList.length === index)
      return "leftActive";
    if ((currentSlide + 1) % contentList.length === index) return "rightActive";
    return "imageHidden";
  };

  const startAutoNext = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(
      () => changeSlide("right"),
      BANNER_AUTO_NEXT_DELAY,
    );
  };

  const changeSlide = (direction: "left" | "right") => {
    setCurrentSlide((prev) =>
      direction === "right"
        ? (prev + 1) % contentList.length
        : (prev - 1 + contentList.length) % contentList.length,
    );

    startAutoNext();
  };

  const moveToSlideNumber = (index: number) => {
    setCurrentSlide(index);
    startAutoNext();
  };

  useEffect(() => {
    if (contentList.length > 0) {
      startAutoNext();

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [contentList.length]);

  if (error) {
    return (
      <ErrorMessage>{`Unable to load the Banner because ${errorMessage}`}</ErrorMessage>
    );
  }

  return (
    <div className="banner mx-auto mt-5 w-[90%] overflow-hidden md:m-0 md:w-full">
      <div className="banner-images relative mx-auto w-full max-w-[1200px] md:my-[30px]">
        <div className="slide relative h-[60vw] w-full overflow-hidden md:h-[332px] lg:h-[432px]">
          {contentList.map((image, index) => (
            <Link
              key={image.id}
              href={`${encodeURIComponent(image.title.toLowerCase().replaceAll(" ", "-"))}?content_id=${image.id}`}
              onClick={() => setCurrentSlide(index)}
            >
              <div
                className={`img absolute overflow-hidden ${getImageClass(index)}`}
              >
                <Image
                  placeholder="blur"
                  blurDataURL={contentCoverBlurDataImageURL}
                  src={image.thumbnail}
                  alt={`slide-${index}`}
                  width={740}
                  height={486}
                  className="mx-[7px] rounded"
                />
              </div>
            </Link>
          ))}

          <div className="absolute bottom-0 z-30 flex w-full justify-center">
            {contentList.map((_, index) => (
              <button
                key={index}
                className={`m-[5px] h-[9px] rounded ${currentSlide === index ? "pointer-events-none w-[25px] bg-[var(--app-text-color-red)]" : "w-[9px] cursor-pointer bg-gray-300"}`}
                onClick={() => moveToSlideNumber(index)}
              />
            ))}
          </div>
        </div>

        <BsChevronCompactLeft
          tabIndex={0}
          role="button"
          className="navigationButton -left-[150px]"
          onClick={() => changeSlide("left")}
        />

        <BsChevronCompactRight
          tabIndex={0}
          role="button"
          className="navigationButton -right-[150px]"
          onClick={() => changeSlide("right")}
        />
      </div>
    </div>
  );
};

export default Banner;
