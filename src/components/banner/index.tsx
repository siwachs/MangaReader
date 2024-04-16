"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import "./slider.css";

const images = [
  "https://cn-e-pic.mangatoon.mobi/pictures_library/7d7ed86c8b538179dc2c34bbdb9db293.webp",
  "https://cn-e-pic.mangatoon.mobi/pictures_library/eb3020e566a07d35c3706fffdc91af9e.webp",
  "https://cn-e-pic.mangatoon.mobi/pictures_library/3f8020acc1e714ef663b62360b152a8c.webp",
  "https://cn-e-pic.mangatoon.mobi/pictures_library/733d91eb4b61387e718e2531068d2398.webp",
  "https://cn-e-pic.mangatoon.mobi/pictures_library/7f865446a25ca4c75d9e825d0b3e1910.webp",
  "https://cn-e-pic.mangatoon.mobi/homepage-banners/562-2763.webp",
];

const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(3);

  return (
    <div className="banner w-full overflow-hidden">
      <div className="banner-images w-fill relative mx-auto my-[30px] max-w-[1200px]">
        <div className="slide relative h-[432px] w-full overflow-hidden">
          {images.map((image, index) => (
            <Link href="/" key={image}>
              <div className={`img absolute overflow-hidden img${index + 1}`}>
                <Image
                  src={image}
                  alt={`slide-${index + 1}`}
                  width={800}
                  height={432}
                  className="mx-[7px] rounded"
                />
              </div>
            </Link>
          ))}

          <div className="absolute bottom-0 z-10 flex w-full justify-center">
            {images.map((image, index) => (
              <div
                key={image}
                className={`m-[5px] h-[9px] rounded ${currentSlide === index + 1 ? "w-[25px] bg-[var(--app-text-color-red)]" : "w-[9px] cursor-pointer bg-[var(--app-text-color-light-gray)]"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
