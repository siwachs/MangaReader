import TabNavigation from "@/components/tabNavigation";

import Banner from "@/app/(main)/_components/banner";
import ContentList from "@/app/(main)/_components/lists/contentList";
import HottestComics from "@/app/(main)/_components/lists/hottestComics";
import GernresList from "@/app/(main)/_components/lists/genresList";

import { CONTENT_LIST_PAGE_SIZE } from "@/constants";
import getContentList from "@/libs/dbCRUD/getContentList";

export default async function HomePage() {
  const [
    bannerList,
    readWithEditor,
    completedClassicList,
    weeklyNovelList,
    freeReadList,
    newComicsList,
    completedList,
    allMangaList,
    mangaUpdateTodayList,
  ] = await Promise.all([
    getContentList(
      { filterBy: "tags", sortBy: "updatedToday", tags: ["BannerContent"] },
      CONTENT_LIST_PAGE_SIZE,
    ),
    getContentList(
      { filterBy: "tags", sortBy: "updatedToday", tags: ["ReadWithEditor"] },
      CONTENT_LIST_PAGE_SIZE,
    ),
    getContentList(
      {
        filterBy: "tags",
        sortBy: "trending",
        tags: ["CompletedClassic"],
      },
      CONTENT_LIST_PAGE_SIZE,
    ),
    getContentList(
      { filterBy: "tags", sortBy: "trending", tags: ["WeeklyNovel"] },
      CONTENT_LIST_PAGE_SIZE,
    ),
    getContentList(
      { filterBy: "tags", sortBy: "updatedToday", tags: ["FreeRead"] },
      CONTENT_LIST_PAGE_SIZE,
    ),
    getContentList({ sortBy: "new" }, CONTENT_LIST_PAGE_SIZE),
    getContentList(
      { filterBy: "status", status: "Completed" },
      CONTENT_LIST_PAGE_SIZE,
    ),
    getContentList({}, CONTENT_LIST_PAGE_SIZE),
    getContentList({ sortBy: "updatedToday" }, CONTENT_LIST_PAGE_SIZE),
  ]);

  return (
    <>
      <TabNavigation />
      <Banner bannerList={bannerList} />
      <ContentList contentList={readWithEditor} title="👏🏻 Read with Editor" />
      <ContentList
        contentList={completedClassicList}
        title="Completed Classics👍🏻"
      />
      <ContentList contentList={weeklyNovelList} title="✨Weekly Novel✨" />
      <ContentList
        contentList={freeReadList}
        title="free read Manga|Anime|comics|manhwa|manhua|online"
      />
      <HottestComics />
      <GernresList title="Genres" />
      <ContentList
        contentList={newComicsList}
        title="New Comics"
        seeAll="/api/list"
      />
      <ContentList
        contentList={completedList}
        title="Completed"
        seeAll="/api/list"
      />
      <ContentList
        contentList={allMangaList}
        title="AllManga"
        seeAll="/api/list"
      />
      <ContentList
        contentList={mangaUpdateTodayList}
        title="Manga Update Today"
        seeAll="/api/list"
      />
    </>
  );
}
