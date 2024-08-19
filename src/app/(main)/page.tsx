import TabNavigation from "@/components/tabNavigation";

import Banner from "@/app/(main)/_components/banner";
import ContentList from "@/app/(main)/_components/lists/contentList";
import HottestComics from "@/app/(main)/_components/lists/hottestComics";
import GernresList from "@/app/(main)/_components/lists/genresList";

import { CONTENT_LIST_LIMIT } from "@/constants";
import getContentList from "@/libs/dbCRUD/getContentList";

export default async function HomePage() {
  // const [bannerList, completedClassicList, weeklyNovelList, freeReadList] =
  //   await Promise.all([
  //     getContentList(["BannerContent"], CONTENT_LIST_LIMIT),
  //     getContentList(["CompletedClassic"], CONTENT_LIST_LIMIT),
  //     getContentList(["WeeklyNovel"], CONTENT_LIST_LIMIT),
  //     getContentList(["FreeRead"], CONTENT_LIST_LIMIT),
  //   ]);

  return (
    <>
      <TabNavigation />
      <Banner />
      <ContentList title="👏🏻 Read with Editor" />
      <ContentList title="Completed Classics👍🏻" />
      <ContentList title="✨Weekly Novel✨" />
      <ContentList title="free read Manga|Anime|comics|manhwa|manhua|online" />
      <HottestComics />
      <GernresList
        title="Genres"
        dataUrl="/api/content-list"
        seeAll="/api/list"
      />
      <ContentList title="New Comics" seeAll="/api/list" />
      <ContentList title="Completed" seeAll="/api/list" />
      <ContentList title="AllManga" seeAll="/api/list" />
      <ContentList title="Manga Update Today" seeAll="/api/list" />
    </>
  );
}
