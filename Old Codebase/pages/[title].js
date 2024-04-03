import { useEffect } from "react";

import Axios from "@/lib/axiosConfig";
import { contentPageError, titlePageProps } from "@/CONSTANT_DATA";
import { capitalizeText, getRecommended } from "@/lib/utils";
import { getData, setData } from "@/lib/localStorageUtil";

import MiniNavbar from "@/components/TitlePage/MiniNavbar";
import BannerAndTitleInfo from "@/components/TitlePage/BannerAndContentInfo";
import ReadChaptersMobile from "@/components/TitlePage/UtilComponents/ReadChaptersMobile";
import RecommendedForYou from "../components/SearchResults/RecommendedForYou";
import ErrorComponent from "@/components/ErrorComponent";

const ContentPage = ({
  recommended,
  content_id,
  content,
  error,
  statusCode,
  message,
}) => {
  useEffect(() => {
    const increaseViewCount = async () => {
      try {
        await Axios.put(
          `/api/content/increase-view-count?content_id=${content_id}`
        );
      } catch (error) {}
    };

    const expireTimeAvail = getData(content_id);
    if (!expireTimeAvail) {
      increaseViewCount();
      setData(content_id, 0.5);
    }
  }, [content_id]);

  return error ? (
    <ErrorComponent statusCode={statusCode} message={message} />
  ) : (
    <>
      <main className="overflow-hidden">
        <MiniNavbar
          title={content.title}
          genre={content.populatedTags[0]?.tagName}
          genreId={content.populatedTags[0]?.tagId}
        />

        <BannerAndTitleInfo
          mobileBannerImage={content.displayImageThumbnail}
          desktopBannerImage={content.displayImagePoster}
          title={content.title}
          status={content.status}
          genreArray={content.populatedTags.map((genre) => genre.tagName)}
          rating={content.rating}
          likes={content.noOfLike}
          views={content.noOfViews}
          author={content.authorName}
          description={content.description}
          totalChapters={content.chaptersCount}
          totalComments={content.commentsCount}
          chapters={content.populatedChapters}
          content_id={content_id}
        />

        <RecommendedForYou contentPage recommended={recommended} />
      </main>
      <ReadChaptersMobile
        isDisabled={content.chaptersCount === 0}
        content_id={content_id}
        chapter_id={content.populatedChapters[0]?._id}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  const content_id = context.query.content_id || null;
  if (!content_id) {
    return {
      props: {
        title: "Content Page",
        ...contentPageError,
        ...titlePageProps,
      },
    };
  }

  const fetchedData = {
    content_id,
    recommended: [],
    content: {},
  };

  try {
    fetchedData.recommended = await getRecommended();

    const content = await Axios.get(`/api/content`, {
      params: {
        content_id,
        selectedFields:
          "title,displayImageThumbnail,displayImagePoster,status,authorName,description,noOfViews,noOfLikes,populatedTags,chaptersCount,commentsCount,rating",
      },
    });
    fetchedData.content = content.data;
    fetchedData.title = `${capitalizeText(
      fetchedData.content.title
    )} - Manga|comics|manhwa|Anime|manhua| online read`;

    return {
      props: {
        ...titlePageProps,
        ...fetchedData,
      },
    };
  } catch (catchedError) {
    const statusCode = catchedError.response?.status;
    const message = catchedError.response?.data?.error || null;

    return {
      props: {
        ...titlePageProps,
        title: "Content Page",
        error: true,
        statusCode,
        message,
      },
    };
  }
}

export default ContentPage;
