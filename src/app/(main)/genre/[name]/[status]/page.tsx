import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { GenrePageReqObj, Genre } from "@/types";
import TabNavigation from "@/components/tabNavigation";
import BreadCrum from "@/components/breadcrum";
import Channels from "./_components/channels";
import ErrorMessage from "@/components/messages/errorMessage";
import Pagination from "@/components/buttons/pagination";

import { getCapitalizedWord } from "@/libs/stringTransformations";
import numeral from "@/libs/numeral";

import getContentList, {
  ContentListFilter,
} from "@/libs/dbCRUD/getContentList";
import getGenres, { getDescriptionByName } from "@/libs/dbCRUD/getGenres";

import { FaHeart, FaEye } from "react-icons/fa";

const statusList = ["Hottest", "Updated", "Completed", "New"];

export async function generateMetadata(
  { params, searchParams }: GenrePageReqObj,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { name: encodedName } = params;
  const name = decodeURI(encodedName);
  const description = await getDescriptionByName(name);

  return {
    title: `${getCapitalizedWord(name)} - Read Manga, Anime, Manhua, and Donghua Online - Manga Reader`,
    description,
  };
}

export default async function GenrePage(req: Readonly<GenrePageReqObj>) {
  const genresResponse = await getGenres({
    nameInLowercase: true,
  });
  const genreNames = genresResponse?.genres?.map((genre) => genre.name) ?? [];
  genreNames.unshift("all");

  const { name: encodedName, status: statusParam } = req.params;
  const { page: pageParam } = req.searchParams;

  const name = decodeURI(encodedName);
  const capitalizedName = getCapitalizedWord(name);
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
      case 3:
        return { sortBy: "new" };
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
      <BreadCrum
        middleTitle="Genres"
        middleLink="/genre/all/0"
        currentPageTitle={capitalizedName}
      />

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

      {error && (
        <ErrorMessage>{`Unable to load Genre list because ${errorMessage}`}</ErrorMessage>
      )}

      <div className="mx-auto mt-5 w-full max-w-[1200px] overflow-hidden md:mb-5 md:mt-[50px]">
        <div className="items mx-auto min-h-[calc(100vh-355px)] w-[90%] md:flex md:w-full md:flex-wrap md:gap-[30px]">
          {contentList.map((content, index) => (
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
          ))}
        </div>

        <Pagination
          lastPageAriaDisabled={page <= 1}
          lastPageLink={`/genre/${name}/${status}?page=${page - 1}`}
          nextPageAriaDisabled={page >= totalPages}
          nextPageLink={`/genre/${name}/${status}?page=${page + 1}`}
        />
      </div>
    </>
  );
}
