import Link from "next/link";
import Image from "next/image";

import { contentCoverBlurDataImageURL } from "@/data/imageDataUrls";

const ContentList: React.FC<{
  title: string;
  seeAll?: string;
  contentList: { id: string; poster: string; title: string }[];
}> = ({ title, seeAll, contentList }) => {
  return (
    <div className="mx-auto w-[90%] overflow-hidden md:mb-[30px] md:w-full">
      <div className="relative mx-auto my-5 w-full max-w-[1200px] overflow-hidden md:my-[30px]">
        <h2 className="w-[70%] truncate text-[22px] font-bold md:text-[28px]">
          {title}
        </h2>

        {seeAll && (
          <Link href={seeAll}>
            <span className="absolute right-2.5 top-2.5 text-sm text-[var(--app-text-color-red)] md:right-0 md:text-lg">
              See all &gt;
            </span>
          </Link>
        )}

        <div className="mt-5 flex flex-wrap gap-[2%] overflow-hidden md:mt-[30px] md:gap-[30px]">
          {contentList.map((content, index) => (
            <div
              key={content.id}
              className="mb-5 w-[32%] md:mb-[30px] md:w-[175px]"
            >
              <Link
                href={`/${encodeURIComponent(content.title.toLowerCase().replaceAll(" ", "-"))}?content_id=${content.id}`}
              >
                <div className="h-[140px] w-full overflow-hidden md:h-[233px]">
                  <Image
                    placeholder="blur"
                    blurDataURL={contentCoverBlurDataImageURL}
                    src={content.poster}
                    alt={`content${index + 1}`}
                    height={240}
                    width={200}
                    className="h-full w-full rounded object-cover"
                  />
                </div>

                <div className="mt-[5px] overflow-hidden truncate text-xs/[13px] md:mt-2.5 md:text-lg/[22px]">
                  <span>{content.title}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentList;
