import Link from "next/link";
import Image from "next/image";

import { GenrePageReqObj, GenresResponse } from "@/types";
import TabNavigation from "@/components/tabNavigation";
import BreadCrum from "@/components/breadcrum";
import Channels from "./_components/channels";

import getGenres from "@/libs/dbCRUD/getGenres";

import { View } from "@/components/icons";

const dummyContent = [
  "/dummyContent/1.webp",
  "/dummyContent/mp_poster.jpg",
  "/dummyContent/3.webp",
  "/dummyContent/4.webp",
  "/dummyContent/5.webp",
  "/dummyContent/6.webp",
];

const statusList = ["Hottest", "Updated", "Completed"];

export default async function GenrePage(req: Readonly<GenrePageReqObj>) {
  const genresResponse: GenresResponse = await getGenres();
  const genreNames =
    genresResponse?.genres?.map((genre) => genre.name.toLowerCase()) ?? [];
  genreNames.unshift("all");

  const { name, status } = req.params;

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
        <div className="items mx-auto w-[90%] md:flex md:w-full md:flex-wrap md:gap-[30px]">
          {dummyContent.map((content, index) => (
            <Link key={content} href="/">
              <div className="mb-5 grid grid-cols-[32%_60%] gap-[4%] overflow-hidden md:mb-0 md:block">
                <div className="md:w-[175px]">
                  <div className="content-image w-full md:h-[233px]">
                    <Image
                      src={content}
                      alt={`content${index + 1}`}
                      height={240}
                      width={200}
                      className="h-auto max-w-full rounded object-cover md:h-[233px]"
                    />
                  </div>

                  <div className="content-title mt-2.5 hidden truncate text-lg/[22px] md:block">
                    <span>Martial Peak</span>
                  </div>
                  <div className="content-icons mt-2.5 hidden items-center gap-[5px] text-[13px] text-[var(--app-text-color-red)] md:flex">
                    <View className="-mt-[1px] mr-[5px] h-[15px] w-[15px]" />
                    <span>30.4M</span>
                  </div>
                  <div className="content-genres font-noto-sans-sc mt-[5px] hidden truncate text-sm font-normal text-neutral-400 md:block">
                    <span>
                      School life/Romance/TimeTravel/Comedy/Urban Romance/Girl
                      Power/Game/Sweet/Counterattack/School Hunk
                    </span>
                  </div>
                </div>

                <div className="overflow-hidden md:hidden">
                  <div className="content-title truncate text-lg/[30px] font-bold">
                    <span>Martial Peak</span>
                  </div>
                  <div className="content-genres mt-2.5 truncate text-xs/[30px] text-gray-500/70">
                    <span>
                      School life/Romance/TimeTravel/Comedy/Urban Romance/Girl
                      Power/Game/Sweet/Counterattack/School Hunk
                    </span>
                  </div>
                  <div className="content-episodes-count truncate text-xs/[24px] text-gray-500/70">
                    Up to Ep.463
                  </div>
                  <div className="content-icons mt-[30px] flex items-center gap-0.5 text-[13px] text-[var(--app-text-color-red)]">
                    <View className="-mt-[1px] h-3 w-3" />
                    <span>30.4M</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="page mx-auto my-[25px] flex max-w-[1200px] overflow-hidden border-y border-gray-300 py-2.5 md:justify-center md:gap-5 md:border-none">
          <Link
            aria-disabled={true}
            href="/"
            className="pointer-events-none flex h-[50px] w-[50%] items-center justify-center border-r border-gray-300 text-center text-sm text-gray-300 md:w-[180px] md:rounded-[25px] md:border md:border-gray-300"
          >
            <span>Last Page</span>
          </Link>
          <Link
            href="/"
            className="flex h-[50px] w-[50%] items-center justify-center text-center text-sm md:w-[180px] md:rounded-[25px] md:border md:border-[var(--app-text-color-dim-gray)]"
          >
            <span>Next Page</span>
          </Link>
        </div>
      </div>
    </>
  );
}
