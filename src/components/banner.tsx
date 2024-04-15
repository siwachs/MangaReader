"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

const images = [
  "https://cn-e-pic.mangatoon.mobi/pictures_library/7d7ed86c8b538179dc2c34bbdb9db293.webp",
  "https://cn-e-pic.mangatoon.mobi/pictures_library/eb3020e566a07d35c3706fffdc91af9e.webp",
  "https://cn-e-pic.mangatoon.mobi/pictures_library/3f8020acc1e714ef663b62360b152a8c.webp",
  "https://cn-e-pic.mangatoon.mobi/pictures_library/733d91eb4b61387e718e2531068d2398.webp",
  "https://cn-e-pic.mangatoon.mobi/pictures_library/7f865446a25ca4c75d9e825d0b3e1910.webp",
  "https://cn-e-pic.mangatoon.mobi/homepage-banners/562-2763.webp",
];

const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [startTouch, setStartTouch] = useState<number | null>(null);

  const handleStartTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartTouch(e.touches[0].clientX);
  };

  const handleMoveTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startTouch === null) return;

    const touchDiff = startTouch - e.touches[0].clientX;
    const threshold = 6;

    if (touchDiff > threshold) {
      // Swipe Right
      setCurrentSlide((prev) => {
        return (prev + 1) % images.length;
      });
    } else if (touchDiff < -threshold) {
      // Swipe Left
      setCurrentSlide((prev) => {
        if (prev == 0) return images.length - 1;

        return prev - 1;
      });
    }

    setStartTouch(null);
  };

  return (
    <div className="mx-auto mt-5 w-[90%]">
      <div
        className="m-0 w-full"
        onTouchStart={handleStartTouch}
        onTouchMove={handleMoveTouch}
      >
        <div className="relative h-[60vw] w-full overflow-hidden lg:h-[432px]">
          {images.map((image, index) => (
            <Link key={image} href="/">
              <Image
                src={image}
                alt="slide-image"
                className={`h-full w-full rounded object-cover object-center transition-transform duration-500 ease-in-out ${currentSlide === index ? "scale-100" : "scale-0"}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
              />
            </Link>
          ))}

          <div className="absolute bottom-0 z-10 flex w-full justify-center">
            {images.map((image, index) => (
              <button
                type="button"
                onClick={() => {
                  if (currentSlide === index) return;

                  setCurrentSlide(index);
                }}
                key={image}
                className={`m-[5px] h-2 cursor-pointer ${currentSlide === index ? "w-6" : "w-2"} rounded ${currentSlide === index ? "bg-[var(--app-text-color-red)]" : "bg-[var(--app-text-color-light-gray)]"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
