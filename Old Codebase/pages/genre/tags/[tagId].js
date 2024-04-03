import Axios from "@/lib/axiosConfig";

import { capitalizeText, getCachedGenreList } from "@/lib/utils";

import ListNav from "../../../components/GenreComponents/ListNav";
import GenreList from "../../../components/GenreComponents/GenreList";
import ContentList from "../../../components/GenreComponents/ContentList";
import ErrorComponent from "@/components/ErrorComponent";

const Genre = ({
  currentTagName,
  genres,
  tagId,
  contentList,
  page,
  totalPages,
  error,
  statusCode,
  message,
}) => {
  return error ? (
    <ErrorComponent statusCode={statusCode} message={message} />
  ) : (
    <main>
      <ListNav genre={currentTagName} />
      <GenreList genres={genres} tagId={tagId} />
      <ContentList
        contentList={contentList}
        tagId={tagId}
        page={page}
        totalPages={totalPages}
      />
    </main>
  );
};

export default Genre;

export async function getServerSideProps(context) {
  const fetchedData = {
    tagId: context.query.tagId,
    page: parseInt(context.query.page) || 1,
    genres: [],
    contentList: [],
  };

  try {
    fetchedData.genres = await getCachedGenreList();

    const contentList = await Axios.get("api/content", {
      params: {
        tagId: fetchedData.tagId,
        page: fetchedData.page,
        limit: 18,
        selectedFields:
          "displayImagePoster,title,populatedTags,noOfViews,noOfLikes,chapterCount",
      },
    });

    fetchedData.contentList = contentList.data?.contentList;
    fetchedData.totalPages = contentList.data?.totalPages;

    const currentTagName = capitalizeText(
      fetchedData.genres.find((item) => item.tagId === fetchedData.tagId)
        .tagName
    );

    fetchedData.title = `${currentTagName} | M Reader`;

    return {
      props: {
        ...fetchedData,
        currentTagName,
      },
    };
  } catch (catchedError) {
    const statusCode = catchedError.response?.status || 404;
    const message =
      catchedError.response?.data?.error ||
      "This Page is currently not available.";

    return {
      props: {
        title: "Genre Page",
        error: true,
        statusCode,
        message,
      },
    };
  }
}
