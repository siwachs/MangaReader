import Image from "next/image";

import TabNavigation from "@/components/tabNavigation";

import Banner from "./_components/banner";
import ContentList from "./_components/lists/contentList";
import HottestComics from "./_components/lists/hottestComics";
import GernresList from "./_components/lists/genresList";

import {
  FREE_READ_CONTENT_LIST_PAGE_SIZE,
  CONTENT_LIST_PAGE_SIZE,
  CONTENT_LIST_DEFAULT_PAGE_NUMBER,
} from "@/constants";
import getContentList from "@/libs/dbCRUD/getContentList";

// Static Assets
import circleLeft from "@/../public/assets/circle-left.png";
import circleRight from "@/../public/assets/circle-right.png";

export const revalidate = 80;

export default async function HomePage() {
  const [
    bannerListResponse,
    readWithEditorResponse,
    completedClassicListResponse,
    weeklyNovelListResponse,
    freeReadListResponse,
    newComicsListResponse,
    completedListResponse,
    mangaUpdateTodayListResponse,
  ] = await Promise.all([
    getContentList(
      { filterBy: "tags", sortBy: "updatedToday", tags: ["BannerContent"] },
      CONTENT_LIST_DEFAULT_PAGE_NUMBER,
      CONTENT_LIST_PAGE_SIZE,
    ),
    getContentList(
      { filterBy: "tags", sortBy: "updatedToday", tags: ["ReadWithEditor"] },
      CONTENT_LIST_DEFAULT_PAGE_NUMBER,
      CONTENT_LIST_PAGE_SIZE,
    ),
    getContentList(
      {
        filterBy: "tags",
        sortBy: "trending",
        tags: ["CompletedClassic"],
      },
      CONTENT_LIST_DEFAULT_PAGE_NUMBER,
      CONTENT_LIST_PAGE_SIZE,
    ),
    getContentList(
      { filterBy: "tags", sortBy: "trending", tags: ["WeeklyNovel"] },
      CONTENT_LIST_DEFAULT_PAGE_NUMBER,
      CONTENT_LIST_PAGE_SIZE,
    ),
    getContentList(
      { filterBy: "tags", sortBy: "updatedToday", tags: ["FreeRead"] },
      CONTENT_LIST_DEFAULT_PAGE_NUMBER,
      FREE_READ_CONTENT_LIST_PAGE_SIZE,
    ),
    getContentList(
      { sortBy: "new" },
      CONTENT_LIST_DEFAULT_PAGE_NUMBER,
      CONTENT_LIST_PAGE_SIZE,
    ),
    getContentList(
      { filterBy: "status", status: "Completed" },
      CONTENT_LIST_DEFAULT_PAGE_NUMBER,
      CONTENT_LIST_PAGE_SIZE,
    ),
    getContentList(
      { sortBy: "updatedToday" },
      CONTENT_LIST_DEFAULT_PAGE_NUMBER,
      CONTENT_LIST_PAGE_SIZE,
    ),
  ]);

  return (
    <>
      <Image
        src={circleLeft}
        alt="circle-left"
        className="absolute left-0 top-[350px] hidden h-[376px] w-[152px] md:inline"
      />
      <Image
        src={circleRight}
        alt="circle-right"
        className="absolute right-0 top-[50px] hidden h-[365px] w-[60px] md:inline"
      />

      <TabNavigation />
      <Banner bannerListResponse={bannerListResponse} />
      <ContentList
        contentListResponse={readWithEditorResponse}
        title="👏🏻 Read with Editor"
      />
      <ContentList
        contentListResponse={completedClassicListResponse}
        title="Completed Classics👍🏻"
      />
      <ContentList
        contentListResponse={weeklyNovelListResponse}
        title="✨Weekly Novel✨"
      />
      <ContentList
        contentListResponse={freeReadListResponse}
        title="free read Manga|Anime|comics|manhwa|manhua|online"
      />
      <HottestComics title="Hottest Comics" seeAll="/genre/all/0" />
      <GernresList title="Genres" seeAll="/genre/all/0" />
      <ContentList
        contentListResponse={newComicsListResponse}
        title="New Comics"
        seeAll="/genre/all/3"
      />
      <ContentList
        contentListResponse={completedListResponse}
        title="Completed"
        seeAll="/genre/all/2"
      />
      <ContentList
        contentListResponse={mangaUpdateTodayListResponse}
        title="Manga Update Today"
        seeAll="/genre/all/1"
      />
    </>
  );
}
