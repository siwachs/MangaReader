import Link from "next/link";
import Image from "next/image";

import { Tooltip } from "@mui/material";
import { capitalizeText } from "@/lib/utils";

const SearchResultes = ({ title, keyword, content }) => {
  return (
    <div className="search-result">
      <div className="mt-[5%] lg:mt-[1.875rem]">
        <span
          style={{ fontFamily: "Noto Sans SC" }}
          className="text-xl font-[500] leading-[2.25rem] text-[var(--text-color-darkred)] lg:text-2xl"
        >
          {title}
        </span>
        <span className="mx-[5%] text-sm lg:mx-2 lg:text-base">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          {content.length} results for '{keyword}'
        </span>
      </div>

      <div className="my-[3%] lg:my-[30px]">
        <div className="grid grid-cols-3 gap-x-[2%] gap-y-5 overflow-hidden lg:flex lg:flex-wrap lg:gap-[1.875rem]">
          {content.map((item) => (
            <Link key={item._id} href={`/title?content_id=${item._id}`}>
              <div className="relative h-[38.5vw] lg:h-[233px] lg:w-[175px]">
                <Image
                  src={item.displayImagePoster.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 768px) 90vw, 100vw"
                  className={`h-auto max-w-full rounded-[4px] brightness-95 dark:brightness-90 ${
                    item.displayImagePoster.type === "poster"
                      ? "object-cover"
                      : "border object-contain"
                  }`}
                />
              </div>

              <Tooltip arrow title={capitalizeText(item.title)}>
                <div className="one-line-text ml-[2%] mt-[3%] w-[95%] text-sm capitalize text-[var(--text-color-black)] dark:text-white sm:text-base md:text-base lg:mt-0 lg:w-[10rem] lg:leading-[1.875rem]">
                  <span>{item.title}</span>
                </div>
              </Tooltip>

              <div className="one-line-text w-[95%] text-xs capitalize text-[var(--text-color-content)] dark:text-gray-100 sm:mt-0.5 md:text-sm lg:-mt-1 lg:w-[10rem]">
                <span>
                  {item.populatedTags.map((genre) => genre.tagName).join("/")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultes;
