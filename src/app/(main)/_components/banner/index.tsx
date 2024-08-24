"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./slider.css";

import { contentCoverBlurDataImageURL } from "@/data/imageDataUrls";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Banner: React.FC<{
  bannerList: { id: string; thumbnail: string; title: string }[];
}> = ({ bannerList }) => {
  const [currentSlide, setCurrentSlide] = useState(
    Math.floor(bannerList.length / 2),
  );

  const getImageClass = (index: number): string => {
    if (index === currentSlide) return "centerActive";

    if ((currentSlide - 1 + bannerList.length) % bannerList.length === index)
      return "leftActive";

    if ((currentSlide + 1) % bannerList.length === index) return "rightActive";

    return "imageHidden";
  };

  const changeSlide = (direction: "left" | "right") => {
    setCurrentSlide((prev) =>
      direction === "right"
        ? (prev + 1) % bannerList.length
        : (prev - 1 + bannerList.length) % bannerList.length,
    );
  };

  return (
    <div className="banner mx-auto mt-5 w-[90%] overflow-hidden md:m-0 md:w-full">
      <div className="banner-images relative mx-auto w-full max-w-[1200px] md:my-[30px]">
        <div className="slide relative h-[60vw] w-full overflow-hidden md:h-[432px]">
          {bannerList.map((image, index) => (
            <Link
              key={image.id}
              href={`${encodeURIComponent(image.title.toLocaleLowerCase().replaceAll(" ", "-"))}?content_id=${image.id}`}
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
            {bannerList.map((image, index) => (
              <button
                key={image.id}
                className={`m-[5px] h-[9px] rounded ${currentSlide === index ? "pointer-events-none w-[25px] bg-[var(--app-text-color-red)]" : "w-[9px] cursor-pointer bg-gray-300"}`}
                onClick={() => setCurrentSlide(index)}
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
