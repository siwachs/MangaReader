import Link from "next/link";
import Image from "next/image";

import { Content } from "@/types";
import { contentCoverBlurDataImageURL } from "@/data/imageDataUrls";

const HaveResults: React.FC<{
  title: string;
  contentList: Content[];
  word: string;
}> = ({ title, contentList, word }) => {
  return (
    <div>
      <div className="font-noto-sans-sc mt-[5%] md:mt-[30px]">
        <span className="text-xl/[36px] font-medium text-[var(--app-text-color-red)] md:text-2xl/[36px]">
          {title}
        </span>

        <span className="mx-[5%] text-sm md:mx-0 md:text-base">
          &nbsp;&nbsp;{contentList.length} results for &apos;{word}&apos;
        </span>
      </div>

      <div className="my-[3%] flex flex-wrap gap-x-[2%] md:my-[30px] md:gap-x-[34px]">
        {contentList.map((content, index) => (
          <div key={content.id} className="mb-5 w-[32%] md:mb-[30px] md:w-auto">
            <Link
              href={`/${encodeURIComponent(content.title.toLowerCase().replaceAll(" ", "-"))}?content_id=${content.id}`}
            >
              <div className="h-[160px] w-full md:h-[214px] md:w-[160px]">
                <Image
                  placeholder="blur"
                  blurDataURL={contentCoverBlurDataImageURL}
                  src={content.poster}
                  alt={`content${index + 1}`}
                  height={240}
                  width={200}
                  className="h-[160px] w-full rounded object-cover md:h-[213px]"
                />
              </div>
            </Link>

            <div className="h-[30px] w-[95%] truncate px-[5px] text-left text-sm/[30px] md:w-[160px] md:text-base/[30px]">
              <span>{content.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HaveResults;
