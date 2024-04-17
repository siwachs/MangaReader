import Banner from "@/components/banner";
import ContentList from "@/components/contentList";
import HomeNav from "@/components/navigations/homeNav";

export default function Home() {
  return (
    <>
      <HomeNav />
      <Banner />
      <ContentList title="👏🏻 Read with Editor" dataUrl="/api/content-list" />
    </>
  );
}
