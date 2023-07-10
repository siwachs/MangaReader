import Image from "next/image";
import Link from "next/link";

import { Favorite } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { capitalizeText } from "@/lib/utils";

import numeral from "numeral";

const DisplayContent = ({ contentId, image, type, title, likes }) => {
  return (
    <div className="lg:w-[175px]">
      <Link href={`/${title.replaceAll(" ", "-")}?content_id=${contentId}`}>
        <div
          className={`relative lg:h-[233px] ${
            type === "poster" ? "h-[42vw]" : "h-[24vw]"
          }`}
        >
          <Image
            src={image}
            alt={title}
            sizes="(max-width: 640px) 80vw, (max-width: 768px) 90vw, 100vw"
            fill
            className={`h-auto max-w-full rounded-[4px] brightness-95 dark:brightness-90 ${
              type === "poster"
                ? "object-cover"
                : "object-cover md:border md:object-contain"
            }`}
          />
        </div>

        <Tooltip arrow title={capitalizeText(title)}>
          <div className="one-line-text mt-1.5 text-xs capitalize text-[var(--text-color-black)] dark:text-white sm:mt-2 sm:text-sm md:text-lg">
            <span>{title}</span>
          </div>
        </Tooltip>

        {likes !== undefined && (
          <div className="ml-[2%] mt-1 flex items-center gap-2 text-sm text-[var(--text-color)] lg:text-base">
            <Favorite fontSize="inherit" />
            <span className="uppercase">{numeral(likes).format("0.a")}</span>
          </div>
        )}
      </Link>
    </div>
  );
};

export default DisplayContent;
