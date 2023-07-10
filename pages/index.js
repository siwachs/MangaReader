import Image from "next/image";

import Slider from "../components/Sliders";

import Axios from "@/lib/axiosConfig";
import { getCachedGenreList } from "@/lib/utils";

//Content-List...
import TopInternetSearch from "../components/ContentList/TopInternetSearch";
import MassUpdates from "../components/ContentList/MassUpdates";
import TrendingContent from "../components/ContentList/TrendingContent";
import LatestUpdates from "../components/ContentList/LatestUpdates";
import Genres from "../components/ContentList/Genres";
import NewContent from "../components/ContentList/NewContent";
import Completed from "../components/ContentList/Completed";
import ErrorComponent from "@/components/ErrorComponent";

//Images
import leftCircle from "../public/assetsImages/circle-left.png";
import rightCircle from "../public/assetsImages/circle-right.png";

export default function Home({
  sliderSlides,
  latestUpdates,
  topInternetSearch,
  trending,
  massUpdates,
  genres,
  genreList,
  recentlyAdded,
  completed,
  error,
  statusCode,
  message,
}) {
  return error ? (
    <ErrorComponent statusCode={statusCode} message={message} />
  ) : (
    <main className="relative">
      <Image
        src={leftCircle}
        alt="left-image"
        className="absolute left-0 top-[350px] hidden h-[376px] w-[152px] lg:block"
      />
      <Image
        src={rightCircle}
        alt="right-image"
        className="absolute right-0 top-[50px] hidden h-[365px] w-[60px] lg:block"
      />

      <Slider sliderSlides={sliderSlides} />
      <LatestUpdates
        headingTitle="Latest Updates"
        path="/genre/tags/recently-updates"
        latestUpdates={latestUpdates}
      />
      <TopInternetSearch
        headingTitle="Top Internet Search"
        path={"/genre/tags/top-internet-search"}
        topInternetSearch={topInternetSearch}
      />
      <TrendingContent
        headingTitle="Trending"
        path="/genre/tags/trending"
        trending={trending}
      />
      <MassUpdates headingTitle="Mass Updates" massUpdates={massUpdates} />
      <Genres
        genres={genres}
        genreList={genreList}
        headingTitle="Genres"
        path="/genre/tags/all"
      />
      <NewContent
        headingTitle="Recently Added"
        path="/genre/tags/recently-added"
        recentlyAdded={recentlyAdded}
      />
      <Completed
        headingTitle="Completed"
        path="/genre/tags/completed"
        completed={completed}
      />
    </main>
  );
}

export async function getServerSideProps(context) {
  const fetchedData = {
    title: "M Reader",
    genres: [],
    sliderSlides: [],
    latestUpdates: [],
    topInternetSearch: [],
    trending: [],
    massUpdates: [],
    genreList: [],
    recentlyAdded: [],
    completed: [],
  };

  try {
    const silderSlides = await Axios.get("/api/content", {
      params: {
        contentType: "sliderSlide",
        limit: 4,
        selectedFields: "displayImageThumbnail,title",
      },
    });
    const latestUpdates = await Axios.get("/api/content", {
      params: {
        contentType: "recently-updated",
        limit: 6,
        selectedFields: "displayImagePoster,title",
      },
    });
    const topInternetSearch = await Axios.get("/api/content", {
      params: {
        contentType: "topInternetSearch",
        limit: 6,
        selectedFields: "displayImagePoster,title",
      },
    });
    // const trending = await Axios.get("/api/content", {
    //   params: {
    //     contentType: "trending",
    //     limit: 8,
    //     selectedFields:
    //       "displayImagePoster,title,description,noOfViews,noOfLikes,populatedTags",
    //   },
    // });
    // const massUpdates = await Axios.get("/api/content", {
    //   params: {
    //     contentType: "massUpdate",
    //     limit: 8,
    //     selectedFields: "displayImageThumbnail,title",
    //   },
    // });
    // const genreList = await Axios.get("/api/content", {
    //   params: {
    //     tagId: "all",
    //     limit: 6,
    //     selectedFields: "displayImagePoster,title,noOfLikes",
    //   },
    // });
    // const recentlyAdded = await Axios.get("/api/content", {
    //   params: {
    //     contentType: "recently-added",
    //     limit: 12,
    //     selectedFields: "displayImagePoster,title",
    //   },
    // });
    // const completed = await Axios.get("/api/content", {
    //   params: {
    //     contentType: "completed",
    //     limit: 6,
    //     selectedFields: "displayImagePoster,title",
    //   },
    // });
    fetchedData.sliderSlides = silderSlides.data;
    fetchedData.latestUpdates = latestUpdates.data;
    fetchedData.topInternetSearch = topInternetSearch.data;
    // fetchedData.trending = trending.data;
    // fetchedData.massUpdates = massUpdates.data;
    // fetchedData.genres = await getCachedGenreList();
    // fetchedData.genreList = genreList.data?.contentList;
    // fetchedData.recentlyAdded = recentlyAdded.data;
    // fetchedData.completed = completed.data;

    return {
      props: {
        ...fetchedData,
      },
    };
  } catch (catchedError) {
    const statusCode = catchedError.response?.status || null;
    const message = catchedError.response?.data?.error || null;

    return {
      props: {
        ...fetchedData,
        error: true,
        statusCode,
        message,
      },
    };
  }
}
