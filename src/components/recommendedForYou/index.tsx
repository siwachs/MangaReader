import Link from "next/link";
import Image from "next/image";

import { contentCoverBlurDataImageURL } from "@/data/imageDataUrls";
import ErrorMessage from "../messages/errorMessage";

import { Genre } from "@/types";
import getRecommendedContentList from "@/libs/dbCRUD/getRecommendedContentList";

const RecommendedForYou: React.FC = async () => {
  const recommendedContentListResponse = await getRecommendedContentList();
  const { error, errorMessage, contentList } = recommendedContentListResponse;

  return (
    <div>
      <div className="font-noto-sans-sc mb-5 mt-[15px] text-xl font-medium leading-9 md:mb-[30px] md:mt-5 md:text-2xl">
        <span>Recommended For You</span>
      </div>

      {error && (
        <ErrorMessage>{`Unable to load Recommendations because ${errorMessage}`}</ErrorMessage>
      )}

      <div className="no-result-recommend-comics flex flex-wrap gap-[3%] md:mb-[50px] md:gap-[18px]">
        {contentList.map((content, index) => (
          <div key={content.id} className="mb-3.5 w-[31%] md:w-[180px]">
            <Link
              href={`/${encodeURIComponent(content.title.toLowerCase().replaceAll(" ", "-"))}?content_id=${content.id}`}
            >
              <div className="h-[38vw] overflow-hidden md:h-[233px]">
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
            </Link>

            <div className="recommend-comics-title mt-1.5 h-[30px] w-[95%] truncate px-[5px] text-sm/[30px] md:w-[160px] md:text-base/[30px]">
              <span>{content.title}</span>
            </div>

            <div className="comics-genres h-5 w-[95%] truncate text-xs text-gray-500/70 md:w-[160px] md:text-sm">
              {(content.genres as Genre[]).map((genre) => genre.name).join("/")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedForYou;
