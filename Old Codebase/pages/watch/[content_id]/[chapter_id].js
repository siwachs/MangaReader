import { useEffect } from "react";

import Axios from "@/lib/axiosConfig";
import { capitalizeText } from "@/lib/utils";
import { chapterPageProps } from "@/CONSTANT_DATA";

import NavigationButtons from "@/components/WatchPage/NavigationButtons";
import ErrorComponent from "@/components/ErrorComponent";

const Chapter = ({
  populatedChapters,
  currentChapter,
  content_id,
  chapter_id,
  error,
  statusCode,
  message,
}) => {
  useEffect(() => {
    localStorage.setItem(content_id, chapter_id);
  }, [content_id, chapter_id]);

  return error ? (
    <ErrorComponent statusCode={statusCode} message={message} />
  ) : (
    <div className="flex min-h-screen flex-col">
      <NavigationButtons
        setThemeSwitch
        content_id={content_id}
        chapter_id={chapter_id}
        index={populatedChapters.findIndex((item) => item._id === chapter_id)}
        populatedChapters={populatedChapters}
        totalChapters={populatedChapters.length}
      />

      <main className="pictures mx-auto grid max-w-[1200px] flex-grow place-items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {currentChapter.chapterImages.map((item, index) => (
          <img
            key={index}
            src={item}
            alt={`Image ${index}`}
            loading="eager"
            className={`h-auto max-w-full border-x border-black ${
              index === currentChapter.chapterImages.length - 1
                ? "border-b"
                : ""
            } ${index === 0 ? "border-t" : ""}`}
          />
        ))}
      </main>

      <div className="mt-auto">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="watchPage-pagination-button watchPage-pagination-button-enable mx-auto mt-5 block max-w-[18.75rem]"
        >
          Move To Top
        </button>

        <NavigationButtons
          content_id={content_id}
          chapter_id={chapter_id}
          addMargin
          index={populatedChapters.findIndex((item) => item._id === chapter_id)}
          populatedChapters={populatedChapters}
          totalChapters={populatedChapters.length}
        />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const content_id = context.query.content_id || null;
  const chapter_id = context.query.chapter_id || null;

  const fetchedData = {
    ...chapterPageProps,
    content_id,
    chapter_id,
  };

  try {
    const contentResponse = await Axios.get(`/api/content`, {
      params: {
        content_id,
        selectedFields: "title",
      },
    });
    const currentChapterResponse = await Axios.get(`/api/chapter`, {
      params: { chapter_id, selectedFields: "chapterTitle,chapterImages" },
    });
    const { title, populatedChapters } = contentResponse.data;
    const { chapterTitle } = currentChapterResponse.data;
    fetchedData.populatedChapters = populatedChapters || [];
    fetchedData.currentChapter = currentChapterResponse.data;
    fetchedData.title = `${capitalizeText(chapterTitle)} - ${capitalizeText(
      title
    )} - MangaToon`;
    fetchedData.contentTitle = capitalizeText(title);
    fetchedData.chapterTitle = capitalizeText(chapterTitle);

    return {
      props: {
        ...fetchedData,
      },
    };
  } catch (catchedError) {
    const statusCode = catchedError.response?.status;
    const message = catchedError.response?.data?.error || null;

    return {
      props: {
        ...chapterPageProps,
        title: "Chapter Page Error",
        populatedChapters: [],
        error: true,
        statusCode,
        message,
      },
    };
  }
}

export default Chapter;
