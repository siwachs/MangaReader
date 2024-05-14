import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { Favorite } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

import numeral from "numeral";
import { capitalizeText } from "@/lib/utils";

import ListWrapper from "../Wrappers/ListWrapper";
import MobileContent from "./UtilComponents/MobileContent";
import MoveToTop from "@/lib/Frontend-utils/MoveToTop";

const ContentList = ({ contentList, tagId, page, totalPages }) => {
  const router = useRouter();

  return (
    <>
      <ListWrapper
        setPosition="relative"
        customClasses="lg:flex lg:flex-wrap lg:gap-x-[1.875rem]"
      >
        {contentList.map((item) => (
          <Link key={item._id} href={`/title?content_id=${item._id}`}>
            <div className="item-container mb-5 flex overflow-hidden lg:mb-[1.875rem] lg:block lg:w-[175px]">
              <div className="image relative h-[38.5vw] w-[32%] lg:h-[233px] lg:w-full">
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

              <MobileContent
                title={item.title}
                episodeCount={item.chapterCount}
                genreArray={item.populatedTags.map((genre) => genre.tagName)}
                likes={item.noOfViews}
              />

              <div className="desktop-content hidden lg:block">
                <Tooltip arrow title={capitalizeText(item.title)}>
                  <div className="title one-line-text mt-2 text-lg capitalize text-[var(--text-color-black)] dark:text-white">
                    <span>{item.title}</span>
                  </div>
                </Tooltip>

                <div className="ml-[2%] mt-2 flex items-center space-x-1.5 text-sm uppercase text-[var(--text-color)]">
                  <Favorite fontSize="inherit" />
                  <div>{numeral(item.noOfLikes).format("0.a")}</div>
                </div>

                <div
                  className="one-line-text mt-0.5 text-sm font-normal capitalize text-[var(--text-color-secondary)] dark:text-gray-100"
                  style={{ fontFamily: "Noto Sans SC" }}
                >
                  <span>
                    {item.populatedTags
                      .map((genre) => genre.tagName)
                      .join(" / ")}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {contentList.length === 0 && <div className="py-12"></div>}

        <MoveToTop className="-right-[80px] bottom-[210px]" />
      </ListWrapper>

      <div className="pagination mx-auto w-full max-w-[1200px] justify-between overflow-hidden border-t border-[var(--border-color-primary)] py-2.5 dark:border-gray-200 lg:-mt-[3.75rem] lg:flex lg:items-center lg:justify-center lg:border-none lg:pb-[1.5625rem] lg:pt-0">
        <button
          disabled={page <= 1}
          onClick={() => router.push(`/genre/tags/${tagId}?page=${page - 1}`)}
          className="pagination-button w-[49%] border-r border-[var(--border-color-primary)] dark:border-gray-200 lg:border-black"
        >
          Prev Page
        </button>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => {
            router.push(`/genre/tags/${tagId}?page=${page + 1}`);
          }}
          className="pagination-button lg w-[50%] dark:border-white lg:ml-5"
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export default ContentList;
