import Image from "next/image";
import Link from "next/link";

import { Tooltip } from "@mui/material";
import { Visibility, ThumbUp } from "@mui/icons-material";

import numeral from "numeral";

const TrendingMangaRow = ({
  content_id,
  image,
  type,
  desc,
  title,
  genreArray,
  views,
  likes,
}) => {
  return (
    <Link href={`/${title.replaceAll(" ", "-")}?content_id=${content_id}`}>
      <div className="trending-content-bg mb-[2%] flex h-[52vw] w-[150%] overflow-hidden p-[2%] lg:mr-[15px] lg:box-border lg:h-[275px] lg:w-[590px] lg:p-[15px]">
        <div className="relative w-[25%] lg:h-[245px] lg:w-[185px]">
          <Image
            src={image}
            alt={title}
            sizes="(max-width: 640px) 80vw, (max-width: 768px) 90vw, 100vw"
            fill
            className={`h-auto max-w-full rounded-[4px] brightness-95 dark:brightness-90 ${
              type === "poster" ? "object-cover" : "border object-contain"
            }`}
          />
        </div>

        <div className="ml-[3%] w-1/2 lg:mb-5 lg:ml-[17px] lg:mr-[30px] lg:mt-2.5 lg:w-[328px]">
          <Tooltip arrow title={title}>
            <div
              className="one-line-text w-[70%] text-base font-[500] capitalize text-[var(--text-color-black-secondary)] sm:text-lg lg:h-[29px] lg:w-full lg:text-xl lg:leading-[29px]"
              style={{ fontFamily: "Noto Sans SC" }}
            >
              <span>{title}</span>
            </div>
          </Tooltip>

          <div
            className="one-line-text mt-0.5 h-5 w-[80%] text-sm capitalize leading-5 text-[var(--text-color-secondary)] sm:mt-1.5 md:text-base lg:w-full"
            style={{ fontFamily: "Noto Sans SC" }}
          >
            <span>{genreArray.join(" / ")}</span>
          </div>

          <Stats likes={likes} views={views} />

          <div
            className="mt-5 line-clamp-4 w-[70%] text-xs leading-[18px] text-[var(--text-color-secondary)] sm:mt-[40px] md:text-sm lg:mt-5 lg:w-full lg:leading-5"
            style={{ fontFamily: "Noto Sans SC" }}
          >
            <span>{desc}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Stats = ({ likes, views }) => {
  return (
    <div className="mt-[10px] h-5 w-full text-[var(--text-color)] md:mt-[16px]">
      <span className="mr-[2px] sm:mr-[4px] md:mr-[6px] md:text-lg">
        <Visibility fontSize="inherit" />
      </span>
      <span className="mr-[15px] text-xs uppercase text-[var(--text-color-content)] sm:text-sm md:text-base">
        {numeral(views).format("0.a")}
      </span>

      <span className="mr-[2px] sm:mr-[4px] md:mr-[6px] md:text-lg">
        <ThumbUp fontSize="inherit" />
      </span>
      <span className="text-xs uppercase text-[var(--text-color-content)] sm:text-sm md:text-base">
        {numeral(likes).format("0.a")}
      </span>
    </div>
  );
};

export default TrendingMangaRow;
