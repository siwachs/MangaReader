import Link from "next/link";

import numeral from "numeral";
import moment from "moment";
import { capitalizeText } from "@/lib/utils";

import { Tooltip } from "@mui/material";
import { ThumbUp, Comment, Visibility } from "@mui/icons-material";

const ChapterLinkContent = (
  {
    content_id,
    chapter_id,
    order,
    index,
    totalChapters,
    chapterTitle,
    createdAt,
    noOfLikes,
    noOfViews,
    noOfComments,
    noTooltip,
    setOpenDropDown,
    fromDropDown,
    currentChapter,
    forwardedRef,
  },
  ref
) => {
  return (
    <Link
      ref={forwardedRef}
      href={`/watch/${content_id}/${chapter_id}`}
      onClick={setOpenDropDown ? () => setOpenDropDown(false) : undefined}
    >
      <div
        className={`content-container min-h-[2.5rem] rounded-[0.625rem] p-2 lg:pb-3 lg:pl-[0.9375rem] ${
          currentChapter === chapter_id
            ? "cursor-default bg-[#e2e2e2]"
            : "bg-[var(--bg-chapters)]"
        } ${fromDropDown ? "" : "dark:brightness-95"}`}
      >
        <div className="item-top flex text-xs text-black sm:text-sm lg:mt-2 lg:text-base">
          <div className="mr-[6%]">
            {order === "positive" ? index + 1 : totalChapters - index}
          </div>
          {noTooltip ? (
            <div className="one-line-text capitalize">{chapterTitle}</div>
          ) : (
            <Tooltip arrow title={capitalizeText(chapterTitle)}>
              <div className="one-line-text capitalize">{chapterTitle}</div>
            </Tooltip>
          )}
        </div>

        <div className="item-bottom mt-1.5 items-center text-xs text-[var(--text-color-content)] dark:text-black sm:text-sm lg:mt-2.5 lg:flex">
          <span className="publish-date">
            {moment(createdAt).format("lll")}
          </span>

          <div className="mt-[0.125rem] flex items-center md:mt-[0.1875rem] lg:ml-[0.625rem] lg:mt-0">
            <Visibility fontSize="inherit" />
            <span className="ml-[0.15625rem] mr-[0.3125rem] sm:mr-[0.375rem] lg:ml-[0.21875rem] lg:mr-[0.625rem]">
              {numeral(noOfViews).format("0.a")}
            </span>
            <ThumbUp fontSize="inherit" />
            <span className="ml-[0.15625rem] mr-[0.3125rem] sm:mr-[0.375rem] lg:ml-[0.21875rem] lg:mr-[0.625rem]">
              {numeral(noOfLikes).format("0.a")}
            </span>
            <Comment fontSize="inherit" />
            <span className="ml-[0.15625rem] lg:ml-[0.21875rem]">
              {numeral(noOfComments).format("0.a")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChapterLinkContent;
