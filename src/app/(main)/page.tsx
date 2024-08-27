import TabNavigation from "@/components/tabNavigation";

import Banner from "@/app/(main)/_components/banner";
import ContentList from "@/app/(main)/_components/lists/contentList";
import HottestComics from "@/app/(main)/_components/lists/hottestComics";
import GernresList from "@/app/(main)/_components/lists/genresList";

import {
  FREE_READ_CONTENT_LIST_PAGE_SIZE,
  CONTENT_LIST_PAGE_SIZE,
  CONTENT_LIST_DEFAULT_PAGE_NUMBER,
} from "@/constants";
import getContentList from "@/libs/dbCRUD/getContentList";

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
      <HottestComics />
      <GernresList title="Genres" seeAll="/genre/all/0" />
      <ContentList
        contentListResponse={newComicsListResponse}
        title="New Comics"
        seeAll="/api/list"
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
