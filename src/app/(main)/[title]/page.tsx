import type { Metadata, ResolvingMetadata } from "next";
import React from "react";

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

import {
  CONTENT_LIST_DEFAULT_PAGE_NUMBER,
  LATEST_UPDATES_CONTENT_LIST_PAGE_SIZE,
} from "@/constants";

import getContent, {
  getContentTitleAndDescription,
} from "@/libs/dbCRUD/getContent";
import getContentList from "@/libs/dbCRUD/getContentList";

import { ChevronDown, InformationCircle } from "@/components/icons";
import { FaRegCalendarCheck } from "react-icons/fa";

export async function generateMetadata(
  { params, searchParams }: ContentPageReqObj,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const contentId = (searchParams.content_id ?? "").trim();
  const contentResponse = await getContentTitleAndDescription(contentId);
  const { title, description } = contentResponse;

  return {
    title: `${title} - Manga Reader`,
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

  const contentResponse = await getContent(contentId, { forContentPage: true });
  const { error, errorMessage, content } = contentResponse;

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

  const genres = content.genres as Genre[];
  const currentGenreName = genres?.[0].name ?? "All";
  const currentGenreLink = `/genre/${encodeURIComponent(currentGenreName.toLowerCase())}/0`;

  const { chapters } = content;

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
              placeholder="blur"
              blurDataURL={contentCoverBlurDataImageURL}
              src={content.poster}
              alt={content.title}
              width={240}
              height={330}
              className="h-[140px] w-[106px] flex-shrink-0 rounded-lg object-cover md:h-[320px] md:w-[235px]"
            />

            <div className="flex flex-grow flex-col md:justify-between">
              <div className="mb-2 items-center gap-[15px] md:mb-2.5 md:flex">
                <p className="text-lg md:text-2xl md:font-bold">
                  {content.title}
                </p>

                <div className="hidden items-center gap-1 md:flex">
                  <FaRegCalendarCheck className="size-[14px]" />
                  <span>{content.status}</span>
                </div>
              </div>

              <div className="mb-2.5 flex items-center gap-1 md:hidden">
                <FaRegCalendarCheck className="size-3" />
                <span>{content.status}</span>
              </div>

              <Rating rating={content.rating} mobileOnly />

              <div className="mb-1 md:mb-0 md:text-sm/[18px]">
                <p className="line-clamp-1">Author: {content.author}</p>
              </div>

              <p className="line-clamp-1 font-normal leading-[15px] md:text-sm/[18px]">
                {content.synonyms.length === 0
                  ? "Synonyms: NA"
                  : `Synonyms: ${content.synonyms.join(", ")}`}
              </p>

              <Description description={content.description} />

              <Rating rating={content.rating} />

              {chapters.length > 0 && (
                <div className="mt-2.5 flex items-center">
                  <Link href={``}>
                    <div className="box-content flex h-[30px] max-w-80 items-center justify-center break-words rounded-[20px] bg-[var(--app-text-color-bright-pink)] px-[15px] md:h-[33px] md:px-5 md:py-1.5 md:text-base lg:text-white">
                      Read Latest Chapter{" "}
                      <span className="hidden md:inline">
                        : Chapter {content.chaptersCount}
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <ChaptersList
          title={content.title}
          reminderText={"TODO: Update Text"}
          chapters={chapters}
        />

        <div className="detail-description mt-8 px-4 md:hidden">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-lg font-bold">{content.title} Introduction</p>
          </div>

          <Description description={content.description} mobileOnly />
        </div>

        <TitleBox
          title={`${content.title} Images/Wallpapers`}
          subTitle={`${content.imagesAndWallpapers.length} Pictures`}
          href="/"
        />

        <div className="detail-gallery mx-auto mt-2.5 max-w-[1200px] md:mt-0">
          <div className="hide-scrollbar mt-2.5 flex overflow-auto pl-4 md:flex-wrap md:overflow-auto md:pl-0">
            {content.imagesAndWallpapers.map((image, index) => (
              <Link key={image} href="/" className="flex-shrink-0">
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

                  <p className="line-clamp-1 break-words text-center md:mt-2">
                    {content.title} - Piece {index + 1}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <TitleBox
          title={`${content.title} News`}
          subTitle={`${content.news.length} Articles`}
          href="/"
        />

        <div className="mx-auto flex max-w-[1200px] flex-col">
          {content.news.map((news) => (
            <Link key={news.title} href="/">
              <div className="mx-4 mt-3 flex items-center gap-1 border-b border-[var(--app-border-color-light-gray)] pb-3 md:hidden">
                <Image
                  src="/assets/internet-searchinformation-icon.png"
                  alt="internet-searchinformation"
                  height={20}
                  width={20}
                  className="h-4 w-4"
                />

                <p className="line-clamp-1 break-words text-[13px]">
                  {news.title}
                </p>
              </div>

              <div className="hidden border-b border-[var(--app-text-color-pale-silver)] py-3 md:block">
                <div className="mb-2.5 flex items-center gap-2">
                  <Image
                    src="/assets/internet-searchinformation-icon.png"
                    alt="internet-searchinformation"
                    height={20}
                    width={20}
                    className="h-[18px] w-[18px]"
                  />
                  <p className="line-clamp-1 break-words text-left text-lg">
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

        <TitleBox
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
              className="mt-3 w-[48%] break-words text-[13px] font-normal md:hidden"
            >
              <span className="md:hidden">{latestUpdate.title}</span>

              <div className="mb-5 mr-6 box-content hidden h-[50px] items-center border border-[var(--app-border-color-light-gray)] px-4 font-normal text-gray-600 md:flex">
                {latestUpdate.title}
              </div>
            </Link>
          ))}
        </div>

        <Link
          href=""
          className="mb-[30px] mt-8 flex items-center justify-center text-gray-500/70"
        >
          <p className="mr-2 text-xs font-normal underline">
            Have problems with reading?
          </p>
          <InformationCircle className="h-[13px] w-[13px]" strokeWidth={2.6} />
        </Link>
      </div>
    </>
  );
}

const TitleBox: React.FC<{ title: string; subTitle: string; href: string }> = ({
  title,
  subTitle,
  href,
}) => {
  return (
    <div className="detail-title-box mx-auto mt-8 max-w-[1200px] md:mb-6 md:mt-12 md:flex md:items-center md:justify-between">
      <Link href="/" className="md:hidden">
        <div className="flex items-center justify-between px-4 text-lg">
          <p className="font-bold">{title}</p>
          <ChevronDown
            className="h-5 w-5 -rotate-90 cursor-pointer text-gray-500/70"
            strokeWidth={2.6}
          />
        </div>
      </Link>

      <p className="hidden text-2xl font-bold md:block">{title}</p>

      <Link
        href={href}
        className="hidden items-center gap-[5px] text-[var(--app-text-color-bright-pink)] md:inline-flex"
      >
        <span>{subTitle}</span>
        <ChevronDown className="h-4 w-4 -rotate-90" strokeWidth={2.6} />
      </Link>
    </div>
  );
};
