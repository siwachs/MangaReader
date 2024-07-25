import React from "react";
import Link from "next/link";

import { IoChevronDownOutline } from "react-icons/io5";

const ChapterLink: React.FC<{
  title: string;
  releaseDate: string;
  href: string;
}> = React.memo(({ title, releaseDate, href }) => {
  return (
    <div className="mx-4 my-2 rounded-lg bg-[var(--app-text-color-very-light-gray)] px-4 py-3 md:m-0 md:mb-4 md:w-80">
      <div className="flex items-center justify-between">
        <Link href={href}>
          <p className="text-sm/[18px] font-normal">{title}</p>
          <p className="mt-2.5 text-xs font-normal text-[var(--app-text-color-medium-gray)]">
            release date {releaseDate}
          </p>
        </Link>

        <IoChevronDownOutline
          tabIndex={0}
          role="button"
          className="size-[18px] text-[var(--app-text-color-medium-gray)]"
        />
      </div>
    </div>
  );
});

ChapterLink.displayName = "ChapterLink";

export default ChapterLink;
