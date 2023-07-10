import { useState } from "react";

import Image from "next/image";

import { useSession } from "next-auth/react";

import HeaderTitle from "./UtilComponents/HeaderTitle";
import Stats from "./UtilComponents/Stats";
import Description from "./UtilComponents/Description";
import ReadChaptersTablet from "./UtilComponents/ReadChaptersTablet";
import ChapterAndCommentSwitcher from "./UtilComponents/ChapterAndCommentSwitcher";
import ChaptersList from "./UtilComponents/ChaptersList";
import AdminComponent from "./UtilComponents/AdminComponent";

const BannerAndContentInfo = ({
  mobileBannerImage,
  desktopBannerImage,
  title,
  status,
  genreArray,
  rating,
  likes,
  views,
  author,
  description,
  totalChapters,
  totalComments,
  chapters,
  content_id,
}) => {
  const { data, status: authStatus } = useSession();

  const [order, setOrder] = useState("positive");

  const changeOrder = (curOrder) => {
    if (curOrder === order) return;
    chapters.reverse();
    setOrder(curOrder);
  };

  return (
    <div className="mx-[5%] mt-[5%] w-[90%] max-w-[1200px] lg:mx-auto lg:mt-4 lg:w-full">
      <div className="image-and-info-container w-full lg:flex lg:min-h-[21.5625rem] lg:gap-x-11">
        <div className="img-container relative h-[54.5vw] sm:h-[345px] sm:w-[260px]">
          <Image
            src={mobileBannerImage.image}
            alt={title}
            fill
            sizes="(max-width: 640px) 90vw"
            className={`h-auto max-w-full rounded-[4px] brightness-95 dark:brightness-90 sm:hidden ${
              mobileBannerImage.type === "poster"
                ? "border object-contain"
                : "object-cover"
            }`}
          />
          <Image
            src={desktopBannerImage.image}
            alt={title}
            fill
            sizes="(max-width: 786px) 90vw, 100vw"
            className={`hidden h-auto max-w-full rounded-[4px] object-cover brightness-95 dark:brightness-90 sm:block`}
          />
        </div>

        <div className="info-container w-full overflow-hidden lg:max-w-[880px]">
          <HeaderTitle title={title} status={status} />
          <div
            className="tags mb-1.5 w-full text-xs font-[400] capitalize text-[var(--text-color-stats)] dark:text-gray-100 sm:mb-2 sm:text-sm md:text-base lg:mb-[0.75rem] lg:mt-[0.5rem] lg:max-w-[700px]"
            style={{ fontFamily: "Noto Sans SC" }}
          >
            <span>{genreArray.join(" / ")}</span>
          </div>

          <Stats rating={rating || 0} likes={likes} views={views} />

          <div
            className="author-name mt-1.5 text-sm font-[400] text-[var(--pagination-nav-color)] dark:text-gray-100 sm:text-base lg:mt-5 lg:text-[1.0625rem]"
            style={{ fontFamily: "Noto Sans SC" }}
          >
            <span className="capitalize">Author Name: {author}</span>
          </div>

          {authStatus === "authenticated" && data.user?.isAdmin && (
            <AdminComponent content_id={content_id} contentTitle={title} />
          )}

          <Description description={description} />
        </div>
      </div>

      <ReadChaptersTablet
        isDisabled={totalChapters === 0}
        content_id={content_id}
        chapter_id={chapters[0]?._id}
      />

      <ChapterAndCommentSwitcher
        order={order}
        changeOrder={changeOrder}
        totalChapters={totalChapters}
        totalComments={totalComments}
      />

      <div
        className="mt-2.5 text-xs font-[400] text-[var(--text-color-secondary)] dark:text-gray-100 sm:hidden"
        style={{ fontFamily: "Noto Sans SC" }}
      >
        <span>Updated up to Chapter {totalChapters}</span>
      </div>

      {totalChapters !== 0 ? (
        <ChaptersList
          isAdmin={
            authStatus === "authenticated" && data.user?.isAdmin ? true : false
          }
          contentTitle={title}
          chapters={chapters}
          order={order}
          content_id={content_id}
          totalChapters={totalChapters}
        />
      ) : (
        <div className="my-5 h-48 text-base text-[var(--text-color-secondary)] sm:text-lg md:text-xl">
          No chapters added yet.
        </div>
      )}
    </div>
  );
};

export default BannerAndContentInfo;
