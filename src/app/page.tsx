import HomeNav from "@/components/navigations/homeNav";
import Banner from "@/components/banner";
import ContentList from "@/components/lists/contentList";
import HottestComics from "@/components/lists/hottestComics";
import GernresList from "@/components/lists/genresList";

export default function Home() {
  return (
    <>
      <HomeNav />
      <Banner />
      <ContentList title="👏🏻 Read with Editor" dataUrl="/api/content-list" />
      <ContentList title="Completed Classics👍🏻" dataUrl="/api/content-list" />
      <ContentList title="✨Weekly Novel✨" dataUrl="/api/content-list" />
      <ContentList
        title="free read Manga|Anime|comics|manhwa|manhua|online"
        dataUrl="/api/content-list"
      />
      <HottestComics />
      <GernresList
        title="Genres"
        dataUrl="/api/content-list"
        seeAll="/api/list"
      />
      <ContentList
        title="New Comics"
        dataUrl="/api/content-list"
        seeAll="/api/list"
      />
      <ContentList
        title="Completed"
        dataUrl="/api/content-list"
        seeAll="/api/list"
      />
      <ContentList
        title="AllManga"
        dataUrl="/api/content-list"
        seeAll="/api/list"
      />
      <ContentList
        title="Manga Update Today"
        dataUrl="/api/content-list"
        seeAll="/api/list"
      />
    </>
  );
}
