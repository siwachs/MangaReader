import Link from "next/link";
import Image from "next/image";

import { Tooltip } from "@mui/material";

import { capitalizeText } from "@/lib/utils";

const RecommendedForYou = ({ contentPage, recommended }) => {
  return (
    <div
      className={`mx-[5%] w-[90%] lg:mx-0 lg:w-full ${
        contentPage ? "hidden sm:block" : ""
      }`}
    >
      <div className="m-auto w-full max-w-[1200px]">
        <div>
          <div
            className={`mb-5 text-xl font-medium leading-9 text-[var(--text-color-black)] dark:text-white lg:mb-[1.875rem] lg:text-2xl ${
              contentPage ? "font-extrabold" : ""
            }`}
            style={{ fontFamily: "Noto Sans SC" }}
          >
            <span>Recommended For You</span>
          </div>

          <div className="mx-[1.8%] mb-3.5 grid grid-cols-2 gap-x-[7.9%] gap-y-3.5 lg:mx-0 lg:mb-[3.125rem] lg:flex lg:flex-wrap lg:gap-x-[1.4375rem]">
            {recommended.map((item) => (
              <Link
                key={item._id}
                href={`/${item.title}?content_id=${item._id}`}
              >
                <div className={`relative h-[54vw] lg:h-[240px] lg:w-[180px]`}>
                  <Image
                    src={item.displayImagePoster.image}
                    alt={item.title}
                    sizes="(max-width: 640px) 80vw, (max-width: 768px) 90vw, 100vw"
                    fill
                    className={`h-auto max-w-full rounded-[4px] brightness-95 dark:brightness-90 ${
                      item.displayImagePoster.type === "poster"
                        ? "object-cover"
                        : "border object-contain"
                    }`}
                  />
                </div>

                <Tooltip arrow title={capitalizeText(item.title)}>
                  <div className="one-line-text ml-[2%] mt-[3%] w-[95%] text-sm capitalize text-[var(--text-color-black)] dark:text-white sm:text-base lg:mt-1 lg:w-[160px]">
                    <span>{item.title}</span>
                  </div>
                </Tooltip>

                <div className="one-line-text w-[95%] text-xs capitalize text-[var(--text-color-content)] dark:text-gray-100 sm:mt-1 sm:text-sm lg:mt-0 lg:w-[160px]">
                  <span>
                    {item.populatedTags.map((genre) => genre.tagName).join("/")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedForYou;

const UpdatedToday = [
  {
    img: "/UpdatedToday/0.webp",
    type: "poster",
  },
  {
    img: "/UpdatedToday/1.webp",
    type: "poster",
  },
  {
    img: "/UpdatedToday/2.webp",
    type: "poster",
  },
  {
    img: "/UpdatedToday/3.webp",
    type: "poster",
  },
  {
    img: "/UpdatedToday/4.webp",
    type: "poster",
  },
  // {
  //   img: "/Images/4.webp",
  //   type: "backdrop",
  // },
  {
    img: "/UpdatedToday/5.webp",
    type: "poster",
  },
];
