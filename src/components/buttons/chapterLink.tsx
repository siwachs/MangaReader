import { memo } from "react";
import Link from "next/link";

import { format, formatDistanceToNow, parseISO } from "date-fns";

import { FaChevronDown } from "react-icons/fa6";

const ChapterLink: React.FC<{
  id?: string;
  dataActive?: string;
  title: string;
  releaseDate: string;
  href: string;
  callback?: () => void;
}> = memo(({ id, dataActive, title, releaseDate, href, callback }) => {
  const date = parseISO(releaseDate);
  const formattedDate = format(date, "d MMM yyyy");
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });
  const formattedReleaseDate = `${formattedDate} . ${timeAgo}`;

  return (
    <div
      id={id}
      data-active={dataActive !== undefined && dataActive === id}
      className="mx-4 my-2 rounded-lg bg-gray-100 px-4 py-3 data-[active=true]:pointer-events-none data-[active=true]:bg-gray-300 md:m-0 md:mb-4 md:w-80"
    >
      <div className="flex items-center justify-between">
        <Link onClick={callback} href={href}>
          <p className="text-sm/[18px] font-normal">{title}</p>
          <p className="mt-2.5 text-xs font-normal text-gray-500/70">
            release on {formattedReleaseDate}
          </p>
        </Link>

        <FaChevronDown
          tabIndex={0}
          role="button"
          aria-label="Expand Chapter Sources"
          className="size-3.5 text-gray-500/70"
        />
      </div>
    </div>
  );
});

ChapterLink.displayName = "ChapterLink";

export default ChapterLink;
