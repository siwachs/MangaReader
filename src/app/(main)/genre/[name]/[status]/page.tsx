import Link from "next/link";
import Image from "next/image";

import { GenrePageReqObj, GenresResponse, Genre } from "@/types";
import Error from "@/components/messages/error";
import TabNavigation from "@/components/tabNavigation";
import BreadCrum from "@/components/breadcrum";
import Channels from "./_components/channels";

import numeral from "@/libs/numeral";
import getContentList, {
  ContentListFilter,
} from "@/libs/dbCRUD/getContentList";
import getGenres from "@/libs/dbCRUD/getGenres";

import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const statusList = ["Hottest", "Updated", "Completed"];

const paginationButtonClasses =
  "flex h-[50px] w-[50%] items-center justify-center text-center text-sm aria-disabled:pointer-events-none aria-disabled:border-gray-300 aria-disabled:text-gray-300 md:w-[180px] md:rounded-[25px] md:border md:border-gray-600";

export default async function GenrePage(req: Readonly<GenrePageReqObj>) {
  const genresResponse: GenresResponse = await getGenres();
  const genreNames =
    genresResponse?.genres?.map((genre) => genre.name.toLowerCase()) ?? [];
  genreNames.unshift("all");

  const { name: encodedName, status: statusParam } = req.params;
  const { page: pageParam } = req.searchParams;

  const name = decodeURI(encodedName);
  const page = parseInt(decodeURI(pageParam ?? "1"));
  const status = parseInt(statusParam);

  const getSortByOrFilterByOnStatus = (): Partial<ContentListFilter> => {
    switch (status) {
      case 0:
        return { sortBy: "hottest" };
      case 1:
        return { sortBy: "updatedToday" };
      case 2:
        return { status: "Completed" };
      default:
        return {};
    }
  };

  const { error, errorMessage, totalPages, contentList } = await getContentList(
    {
      filterBy: "genresPageList",
      genres: [name],
      ...getSortByOrFilterByOnStatus(),
      populate: [
        {
          from: "Genres",
          localField: "genres",
          as: "genres",
          project: "name",
        },
      ],
    },
    page,
  );

  return (
    <>
      <TabNavigation />
      <BreadCrum titleOne="Genres" titleOneLink="/genre/all" titleTwo="All" />

      <div className="w-full overflow-hidden border-b border-gray-300 bg-purple-50 md:border-none">
        <Channels
          title="Genres"
          channels={genreNames}
          currentGenre={name}
          currentStatus={status}
        />

        <Channels
          title="Status"
          channels={statusList}
          currentGenre={name}
          currentStatus={status}
        />
      </div>

      <div className="mx-auto mt-5 w-full max-w-[1200px] overflow-hidden md:mb-5 md:mt-[50px]">
        <div className="items mx-auto min-h-[calc(100vh-355px)] w-[90%] md:flex md:w-full md:flex-wrap md:gap-[30px]">
          {error ? (
            <Error>{`Unable to load the Genre list because ${errorMessage}`}</Error>
          ) : (
            contentList.map((content, index) => (
              <Link
                key={content.id}
                href={`/${encodeURIComponent(content.title.toLowerCase().replaceAll(" ", "-"))}?content_id=${content.id}`}
              >
                <div className="mb-5 grid grid-cols-[32%_60%] gap-[4%] overflow-hidden md:mb-0 md:block">
                  <div className="md:w-[175px]">
                    <div className="content-image w-full md:h-[233px]">
                      <Image
                        src={content.poster}
                        alt={`content${index + 1}`}
                        height={240}
                        width={200}
                        className="h-auto max-w-full rounded object-cover md:h-[233px]"
                      />
                    </div>

                    <div className="content-title mt-2.5 hidden truncate text-lg/[22px] md:block">
                      <span>{content.title}</span>
                    </div>

                    <div className="content-icons mt-2.5 hidden items-center gap-[5px] text-[13px] text-[var(--app-text-color-red)] md:flex">
                      <FaHeart className="-mt-[1px] mr-[5px] size-3.5" />
                      <span>{numeral(content.noOfSubscribers)}</span>
                    </div>

                    <div className="content-genres font-noto-sans-sc mt-[5px] hidden truncate text-sm font-normal text-neutral-400 md:block">
                      {(content.genres as Genre[])
                        .map((genre) => genre.name)
                        .join("/")}
                    </div>
                  </div>

                  <div className="overflow-hidden md:hidden">
                    <div className="content-title truncate text-lg/[30px] font-bold">
                      <span>{content.title}</span>
                    </div>

                    <div className="content-genres mt-2.5 truncate text-xs/[30px] text-gray-500/70">
                      {(content.genres as Genre[])
                        .map((genre) => genre.name)
                        .join("/")}
                    </div>

                    <div className="content-episodes-count truncate text-xs/[24px] text-gray-500/70">
                      {content.chaptersCount
                        ? ` Up to Ep.${content.chaptersCount}`
                        : "No chapters yet."}
                    </div>

                    <div className="content-icons mt-[30px] flex items-center gap-1.5 text-[13px] text-[var(--app-text-color-red)]">
                      <FaEye className="-mt-[1px] size-3" />
                      <span>{numeral(content.noOfViews)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="page mx-auto my-[25px] flex max-w-[1200px] overflow-hidden border-y border-gray-300 py-2.5 md:justify-center md:gap-5 md:border-none">
          <Link
            aria-disabled={page <= 1}
            href={`/genre/${name}/${status}?page=${page - 1}`}
            className={`${paginationButtonClasses} border-r`}
          >
            Last Page
          </Link>

          <Link
            aria-disabled={page >= totalPages}
            href={`/genre/${name}/${status}?page=${page + 1}`}
            className={`${paginationButtonClasses} `}
          >
            Next Page
          </Link>
        </div>
      </div>
    </>
  );
}
