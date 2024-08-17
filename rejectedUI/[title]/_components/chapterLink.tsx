import React from "react";
import Link from "next/link";

import { Like, CommentSolid } from "@/components/icons";
import { Chapter } from "../_types";

const ChapterLink: React.FC<{
  chapter: Chapter;
  chaptersOrder: ChaptersOrder;
  index: number;
  totalChapters: number;
}> = React.memo(({ chapter, chaptersOrder, index, totalChapters }) => {
  return (
    <Link
      href="/"
      className="m-[8px_8px_0_0] inline-block min-h-10 w-[45.8%] rounded-[10px] bg-[var(--app-text-color-near-white)] pb-2.5 pl-2.5 pt-[6px] text-black md:min-h-[60px] md:w-[285px] md:p-[6px_0_8px_15px]"
    >
      <div className="h-[24px] text-xs md:text-sm">
        <span className="mr-5">
          {chaptersOrder === "positive" ? index + 1 : totalChapters - index}
        </span>
        <span className="truncate">{chapter.title}</span>
      </div>

      <div className="text-xs text-[var(--app-text-color-medium-gray)] md:text-sm">
        <span>{chapter.releaseDate}</span>

        <div className="flex items-center gap-[5px]">
          <Like className="h-[12px] w-[12px]" fill="#999" />
          <span>{chapter.noOfLike}</span>
          <CommentSolid className="h-[10px] w-[10px]" fill="#999" />
          <span>{chapter.noOfComments}</span>
        </div>
      </div>
    </Link>
  );
});

ChapterLink.displayName = "Chapter";

export default ChapterLink;
