import type { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { contentCoverBlurDataImageURL } from "@/data/imageDataUrls";
import { Genre } from "@/types";

import ErrorMessage from "@/components/messages/errorMessage";
import BreadCrum from "@/components/breadcrum";
import Rating from "./_components/rating";
import Description from "./_components/description";
import ChaptersList from "./_components/chaptersList";
import DetailTitleBox from "./_components/titleHeader";
import { ToastContainerProvider } from "@/providers/toastContainerProvider";
import { NestedCommentProvider } from "@/providers/nestedCommentProvider";
import LazyLoadComponent from "@/components/utils/lazyLoadComponent";

import {
  CONTENT_LIST_DEFAULT_PAGE_NUMBER,
  ERROR_404_PAGE_HEADER_TITLE,
  LATEST_UPDATES_CONTENT_LIST_PAGE_SIZE,
} from "@/constants";

import { Content } from "@/models";
import getContent, {
  getContentTitleAndDescription,
} from "@/libs/dbCRUD/getContent";
import getContentList from "@/libs/dbCRUD/getContentList";

import { FaRegCalendarCheck } from "react-icons/fa";
import { MdError } from "react-icons/md";

export async function generateMetadata(
  { params, searchParams }: ContentPageReqObj,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const contentId = (searchParams.content_id ?? "").trim();
  const contentResponse = await getContentTitleAndDescription(contentId);
  const { title = ERROR_404_PAGE_HEADER_TITLE, description } = contentResponse;

  return {
    title: `${title} - MangaReader`,
    description,
  };
}

type ContentPageReqObj = {
  params: { title: string };
  searchParams: {
    content_id?: string;
  };
};

export default async function TitlePage(req: Readonly<ContentPageReqObj>) {
  const contentId = (req.searchParams.content_id ?? "").trim();
  if (!contentId) return notFound();

  const { status, error, errorMessage, content } = await getContent(contentId, {
    forContentPage: true,
  });

  if (status === 404) return notFound();
  if (error)
    return (
      <ErrorMessage>{`Unable to load Content page because ${errorMessage}`}</ErrorMessage>
    );

  const latestUpdatesContentListResponse = await getContentList(
    { sortBy: "updatedToday" },
    CONTENT_LIST_DEFAULT_PAGE_NUMBER,
    LATEST_UPDATES_CONTENT_LIST_PAGE_SIZE,
  );
  const {
    error: latestUpdatesError,
    errorMessage: latestUpdatesErrorMessage,
    contentList: latestUpdates,
  } = latestUpdatesContentListResponse;

  if (!content) return notFound();
  await Content.updateOne({ _id: contentId }, { $inc: { noOfViews: 1 } });

  const genres = content.genres as Genre[];
  const currentGenreName = genres?.[0].name ?? "All";
  const currentGenreLink = `/genre/${encodeURIComponent(currentGenreName.toLowerCase())}/0`;

  const { chapters = [] } = content;
  const latestChapterId = chapters[0]?.id;

  return (
    <>
      <BreadCrum
        middleTitle={currentGenreName}
        middleLink={currentGenreLink}
        currentPageTitle={content.title}
      />

      <div className="detail-wrapper overflow-hidden">
        <div className="detail-image relative min-h-[208px] w-full md:py-8 lg:bg-gray-100">
          <Image
            priority
            placeholder="blur"
            blurDataURL={contentCoverBlurDataImageURL}
            fill
            src={content.thumbnail}
            alt={content.title}
            sizes="70vw"
            className="absolute left-0 top-0 h-full w-full object-cover object-center lg:hidden"
          />

          <div className="absolute left-0 top-0 h-full w-full bg-[var(--app-background-overlay-transparent-black)] backdrop-blur-[10px] lg:hidden" />

          <div className="detail-header relative mx-auto flex w-full max-w-[1200px] gap-4 p-[24px_16px] text-xs text-white md:gap-5 md:p-0 lg:text-[var(--app-text-color-primary)]">
            <Image
              priority
              placeholder="blur"
              blurDataURL={contentCoverBlurDataImageURL}
              src={content.poster}
              alt={content.title}
              width={240}
              height={325}
              className="h-[140px] w-[106px] flex-shrink-0 rounded-lg object-cover md:h-[320px] md:w-[235px]"
            />

            <div className="flex flex-grow flex-col md:justify-between">
              <div className="mb-2 items-center gap-[15px] md:mb-2.5 md:flex">
                <p className="text-lg md:text-2xl md:font-bold">
                  {content.title}
                </p>

                <div className="hidden items-center gap-1 md:flex">
                  <FaRegCalendarCheck className="size-3.5" />
                  <span>{content.status}</span>
                </div>
              </div>

              <div className="mb-2.5 flex items-center gap-1 md:hidden">
                <FaRegCalendarCheck className="size-3" />
                <span>{content.status}</span>
              </div>

              <Rating rating={content.rating} mobileOnly />

              <div className="mb-1 md:mb-0 md:text-sm/[18px]">
                <p className="truncate">Author: {content.author}</p>
              </div>

              <p className="font-normal leading-[15px] md:text-sm/[18px]">
                {content.synonyms.length === 0
                  ? "Synonyms: NA"
                  : `Synonyms: ${content.synonyms.join(", ")}`}
              </p>

              <Description description={content.description} />

              <Rating rating={content.rating} />

              {chapters.length > 0 && (
                <div className="mt-2.5 flex items-center">
                  <Link href={`/watch/${content.id}/${latestChapterId}`}>
                    <div className="box-content flex h-[30px] max-w-80 items-center justify-center break-words rounded-[20px] bg-[var(--app-text-color-bright-pink)] px-[15px] md:h-[33px] md:px-5 md:py-1.5 md:text-base lg:text-white">
                      <span className="md:hidden">Read Latest Chapter</span>
                      <span className="hidden md:inline">
                        Read Latest Chapter : Chapter {content.chaptersCount}
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <ChaptersList
          contentId={content.id}
          title={content.title}
          updatedOn={content.chaptersUpdatedOn}
          chapters={chapters}
        />

        <div className="detail-description mt-8 px-4 md:hidden">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-lg font-bold">{content.title} Introduction</p>
          </div>

          <Description description={content.description} mobileOnly />
        </div>

        <DetailTitleBox
          title={`${content.title} Images/Wallpapers`}
          subTitle={`${content.imagesAndWallpapers.length} Pictures`}
          href=""
        />

        <div className="detail-gallery mx-auto mt-2.5 max-w-[1200px] md:mt-0">
          {content.imagesAndWallpapers.length === 0 && (
            <div className="m-4 select-none font-bold md:mx-0 md:text-lg">
              No Images yet.
            </div>
          )}

          <div className="hide-scrollbar mt-2.5 flex overflow-auto pl-4 md:flex-wrap md:overflow-auto md:pl-0">
            {content.imagesAndWallpapers.map((image, index) => (
              <Link key={image} href="" className="flex-shrink-0">
                <div className="mr-3 w-24 md:mr-5">
                  <Image
                    placeholder="blur"
                    blurDataURL={contentCoverBlurDataImageURL}
                    src={image}
                    alt={`image${index + 1}`}
                    width={120}
                    height={146}
                    className="h-32 w-full rounded object-cover object-center"
                  />

                  <p className="truncate break-words text-center md:mt-2">
                    {content.title} - Piece {index + 1}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <DetailTitleBox
          title={`${content.title} News`}
          subTitle={`${content.news.length} Articles`}
          href={`/${encodeURIComponent(content.title.toLowerCase().replaceAll(" ", "-"))}/news?content_id=${content.id}`}
        />

        <div className="mx-auto flex max-w-[1200px] flex-col">
          {content.news.length === 0 && (
            <div className="m-4 select-none font-bold md:mx-0 md:text-lg">
              No News yet.
            </div>
          )}

          {content.news.map((news) => (
            <Link
              key={news.title}
              href={`${encodeURIComponent(content.title.toLowerCase().replaceAll(" ", "-"))}/news?content_id=${content.id}&news_id=${news.id}`}
            >
              <div className="mx-4 mt-3 flex items-center gap-1 border-b border-gray-200 pb-3 md:hidden">
                <Image
                  src="/assets/internet-searchinformation-icon.png"
                  alt="internet-searchinformation"
                  height={20}
                  width={20}
                  className="h-4 w-4"
                />

                <p className="truncate break-words text-[13px]">{news.title}</p>
              </div>

              <div className="hidden border-b border-gray-300 py-3 md:block">
                <div className="mb-2.5 flex items-center gap-2">
                  <Image
                    src="/assets/internet-searchinformation-icon.png"
                    alt="internet-searchinformation"
                    height={20}
                    width={20}
                    className="h-[18px] w-[18px]"
                  />
                  <p className="truncate break-words text-left text-lg">
                    {news.title}
                  </p>
                </div>

                <p className="line-clamp-2 break-words text-sm font-[300] text-gray-600">
                  {news.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <DetailTitleBox
          title="Latest Updates"
          subTitle="More Updates"
          href="/genre/all/1"
        />

        {latestUpdatesError && (
          <ErrorMessage>{`Unable to load Latest Updated because ${latestUpdatesErrorMessage}`}</ErrorMessage>
        )}

        <div className="details-latest-updates mx-auto flex min-h-[144px] max-w-[1200px] flex-wrap justify-between overflow-hidden px-4 md:justify-start md:px-0">
          {latestUpdates.map((latestUpdate) => (
            <Link
              key={latestUpdate.id}
              href={`/${encodeURIComponent(latestUpdate.title.toLowerCase().replaceAll(" ", "-"))}?content_id=${latestUpdate.id}`}
              className="mt-3 w-[48%] break-words text-[13px] font-normal md:text-sm"
            >
              <span className="md:hidden">{latestUpdate.title}</span>

              <div className="mb-5 mr-6 box-content hidden h-[50px] items-center border border-gray-200 px-4 font-normal text-gray-600 md:flex">
                {latestUpdate.title}
              </div>
            </Link>
          ))}
        </div>

        <button className="mx-auto mb-[30px] mt-8 flex items-center justify-center text-gray-500/70">
          <p className="mr-2 text-xs font-normal underline md:mr-2.5 md:text-base">
            Have problems with reading?
          </p>

          <MdError className="size-[13px] md:size-4" />
        </button>

        <ToastContainerProvider>
          <NestedCommentProvider>
            <LazyLoadComponent component="NestedCommentSystem" />
          </NestedCommentProvider>
        </ToastContainerProvider>
      </div>
    </>
  );
}
