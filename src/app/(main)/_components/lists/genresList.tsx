import Link from "next/link";
import Image from "next/image";
import { Heart } from "../../../../components/icons";

import { CONTENT_LIST_LIMIT } from "@/constants";
import { contentCoverBlurDataImageURL } from "@/data/imageDataUrls";
import { Content, GenresResponse } from "@/types";
import getGenres from "@/libs/dbCRUD/getGenres";

import getContentList from "@/libs/dbCRUD/getContentList";

const GernresList: React.FC<{
  title: string;

  seeAll?: string;
}> = async ({ title, seeAll }) => {
  const genresResponse: GenresResponse = await getGenres();
  const genre = genresResponse?.genres?.[0].name ?? "all";
  const genreList: Content[] = await getContentList(
    { filterBy: "genres", genres: [genre] },
    CONTENT_LIST_LIMIT,
  );

  return (
    <div className="mx-auto w-[90%] overflow-hidden md:mb-[30px] md:w-full">
      <div className="mx-auto w-full max-w-[1380px] bg-[url('/assets/genre-bg.png')] bg-[length:100%_100%]">
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

          {/* Genres List */}
          <div className="hide-scrollbar ml-[5px] mt-2.5 overflow-auto whitespace-nowrap">
            {genresResponse?.genres?.map((genre, index) => (
              <div
                key={genre.id}
                className="mb-[5px] mr-2.5 inline-block px-[5px] md:mr-5 md:px-2.5"
              >
                <Link
                  data-active={index === 0}
                  className="block h-5 text-sm text-[var(--app-text-color-muted)] data-[active=true]:border-b-2 data-[active=true]:border-[var(--app-text-color-red)] data-[active=true]:font-bold data-[active=true]:text-[var(--app-text-color-red)] md:h-[30px] md:text-lg/[30px]"
                  href={`/genre/${genre.id}`}
                >
                  {genre.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-[2%] overflow-hidden md:mt-[30px] md:gap-[30px]">
            {genreList?.map((content, index) => (
              <div
                key={content.id}
                className="mb-5 w-[32%] md:mb-[30px] md:w-[175px]"
              >
                <Link
                  href={`${content.title.toLocaleLowerCase().replaceAll(" ", "-")}?content_id=${content.id}`}
                >
                  <div className="h-[140px] w-full overflow-hidden rounded md:h-[233px]">
                    <Image
                      placeholder="blur"
                      blurDataURL={contentCoverBlurDataImageURL}
                      src={content.poster}
                      alt={`content${index + 1}`}
                      height={240}
                      width={200}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="font-noto-sans-sc mt-[5px] overflow-hidden truncate text-xs/[13px] md:mt-2.5 md:text-lg/[22px]">
                    <span>{content.title}</span>
                  </div>

                  <div className="mt-[5px] flex items-center truncate text-xs/[20px] text-[var(--app-text-color-red)] md:mt-[10px] md:text-sm">
                    <Heart className="mx-[5px] inline-block h-[14px] w-[14px] md:h-4 md:w-4" />
                    <span>668.8K</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GernresList;
