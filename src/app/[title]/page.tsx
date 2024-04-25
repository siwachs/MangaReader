import React from "react";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  Like,
  StarSolid,
  View,
  CommentSolid,
  Share,
  Bookmark,
  BookOpen,
} from "@/components/icons";
import EditRating from "@/app/[title]/_components/editRating";
import DetailDescription from "./_components/detailDescription";
import ChaptersAndComments from "./_components/chaptersAndComments";

const data = {
  thumbnail: "/dummyContent/thumbnail.webp",
  poster: "/dummyContent/3.webp",
  title: "The Beginner's Guide to Be A Princess",
  status: "on going",
  genres: [
    "Shonen",
    "Shojo",
    "Seinen",
    "Josei",
    "Isekai",
    "Slice of Life",
    "Fantasy",
    "Sci-Fi",
    "Horror",
    "Mystery",
    "Romance",
    "Action",
  ],
  noOfViews: "6.2M",
  numberOfLikes: "345k",
  rating: 4.5,
  authonName: "Xiaomingtaiji",
  description: `All the infant girls countrywide drift downstream from the beginning of the fosse. Whoever reaches the terminal point first will be adopted by the emperor.
  Excuse me??? Who think of such ridiculous idea?! Whoa! I want to go back to my original world!
  What an awful time travel!

  MangaToon got authorization from Xiaomingtaiji to publish this work, the content is the author's own point of view, and does not represent the stand of MangaToon.`,
  noOfChapters: 256,
  chapters: [
    {
      _id: "1",
      title: "Chapter 1",
      releaseDate: "2022-04-19",
      noOfLike: 849,
      noOfComments: 923,
    },
    {
      _id: "2",
      title: "Chapter 2",
      releaseDate: "2022-04-19",
      noOfLike: 849,
      noOfComments: 923,
    },
    {
      _id: "3",
      title: "Chapter 3",
      releaseDate: "2022-04-19",
      noOfLike: 849,
      noOfComments: 923,
    },
    {
      _id: "4",
      title: "Chapter 4",
      releaseDate: "2022-04-19",
      noOfLike: 849,
      noOfComments: 923,
    },
    {
      _id: "5",
      title: "Chapter 5",
      releaseDate: "2022-04-19",
      noOfLike: 849,
      noOfComments: 923,
    },
    {
      _id: "6",
      title: "Chapter 6",
      releaseDate: "2022-04-19",
      noOfLike: 849,
      noOfComments: 923,
    },
  ],
};

export const metadata: Metadata = {
  title: `${data.title} - Manga Reader`,
  description: data.description,
};

export default function TitlePage() {
  return (
    <>
      <div className="breadcrum hidden h-[50px] w-full pt-2.5 md:block">
        <ul className="mx-auto h-[50px] max-w-[1200px] leading-[50px] text-[var(--app-text-color-dark-gray)]">
          <li className="inline-block hover:text-[var(--app-text-color-red)]">
            <Link href="/">Home</Link>
          </li>

          <li className="ml-[5px] inline-block before:text-[var(--app-text-color-medium-gray)] before:content-['_/_'] hover:text-[var(--app-text-color-red)]">
            <Link href="/genre/tags/8">{data.genres[0]}</Link>
          </li>

          <li className="ml-[5px] inline-block text-[var(--app-text-color-medium-gray)] before:text-[var(--app-text-color-medium-gray)] before:content-['_/_']">
            {data.title}
          </li>
        </ul>
      </div>

      <div className="details-wrapper mx-[5%] w-[90%] max-w-[1200px] pt-[5%] md:mx-auto md:w-full md:pt-[45px]">
        <div className="details-top-info mx-[1px] mb-[1px] h-[27%] w-full overflow-visible md:h-[345px]">
          <div className="detail-image relative h-[54.5vw] w-full md:mr-[22px] md:inline-block md:h-[345px] md:w-[260px] lg:mr-[45px]">
            <picture>
              <source media="(min-width: 800px)" srcSet={data.poster} />
              <Image
                quality={100}
                height={700}
                width={600}
                src={data.thumbnail}
                alt={data.title}
                className="h-full w-full rounded object-cover object-center"
              />
            </picture>

            <span className="absolute bottom-[15%] right-0 h-1/4 w-[35%] md:hidden">
              <Image
                height={100}
                width={300}
                src="/assets/read-for-free.webp"
                alt="read-for-free"
                className="h-full w-full rounded object-cover"
              />
            </span>
          </div>

          <div className="detail-info inline-block w-full max-w-[880px] overflow-hidden md:h-[345px] md:w-[calc(100%-305px)]">
            <div className="detail-title flex items-center overflow-hidden py-2.5 md:mb-[4px] md:h-[29px] md:py-0">
              <span className="hide-text font-noto-sans-sc mr-[80px] w-full text-lg/[24px] font-[500] md:mr-[15px] md:h-[29px] md:w-auto md:text-xl/[29px]">
                {data.title}
              </span>

              <div className="absolute right-[5%] box-content h-[18px] whitespace-nowrap rounded-xl bg-[var(--app-text-color-red-orange)] px-[9px] pb-[3px] pt-[2px] text-center text-xs/[18px] text-white md:static md:h-5 md:text-sm">
                {data.status}
              </div>
            </div>

            <div className="detail-genres font-noto-sans-sc hidden-scrollbar mb-[5px] h-5 max-w-[700px] overflow-auto whitespace-nowrap text-xs/[20px] font-normal text-[var(--app-text-color-darker-gray)] md:mb-[15px] md:text-sm md:text-[var(--app-text-color-slate-gray)]">
              {data.genres.map((genre, index) => (
                <React.Fragment key={genre}>
                  <Link href={"/"} key={genre}>
                    {genre}
                  </Link>
                  {index + 1 !== data.genres.length && " / "}
                </React.Fragment>
              ))}
            </div>

            <div className="detail-stats flex items-center text-[13px] text-[var(--app-text-color-darker-gray)] md:text-base md:text-[var(--app-text-color-black)]">
              <View className="-mt-0.5 mr-0.5 h-[13px] w-[13px] md:mr-1 md:h-[18px] md:w-[18px]" />
              <span>{data.noOfViews}</span>

              <Like className="-mt-0.5 ml-2.5 mr-0.5 h-[14px] w-[14px] md:ml-[25px] md:mr-1 md:h-[22px] md:w-[22px]" />
              <span>{data.numberOfLikes}</span>

              <div className="-mt-0.5 ml-2.5 flex items-center">
                {[...new Array(5)].map((star, index) => {
                  const uniqueKey = `star${index}`;
                  const inverse = Math.floor(data.rating) <= index;
                  return (
                    <StarSolid
                      key={uniqueKey}
                      inverse={inverse}
                      className="h-[17px] w-[17px] md:mr-[3px] md:h-5 md:w-5"
                    />
                  );
                })}

                <span className="-mb-[1px] ml-[4px] mt-[1px] text-sm md:text-lg">
                  {data.rating}
                </span>
                <EditRating />
              </div>
            </div>

            <div className="detail-author font-noto-sans-sc mt-[5px] text-xs/[20px] font-normal text-[var(--app-text-color-standard-gray)] md:mt-2.5 md:text-base">
              <span>{`Author Name: ${data.authonName}`}</span>
            </div>

            <DetailDescription description={data.description} />
          </div>
        </div>

        <ChaptersAndComments />
      </div>

      <div className="mx-auto mb-5 w-full max-w-[1200px]">
        <div className="ml-[6%] w-[94%] overflow-hidden md:w-full">
          {data.chapters.map((chapter, index) => (
            <Link
              href="/"
              key={chapter._id}
              className="m-[8px_8px_0_0] inline-block min-h-10 w-[45.8%] rounded-[10px] bg-[var(--app-text-color-near-white)] pb-2.5 pl-2.5 pt-[6px] text-[var(--app-text-color-black)] md:min-h-[60px] md:w-[270px] md:p-[6px_0_8px_15px]"
            >
              <div className="h-[24px] text-xs md:text-sm">
                <span className="mr-5">{index + 1}</span>
                <span className="hide-text">{chapter.title}</span>
              </div>

              <div className="text-xs text-[var(--app-text-color-medium-gray)] md:text-sm">
                <span>{chapter.releaseDate}</span>
                <div className="flex items-center gap-[5px]">
                  <Like className="h-[12px] w-[12px]" fill="#999" />
                  <span>{chapter.noOfLike}</span>
                  <CommentSolid className="h-[10px] w-[10px]" fill="#999" />
                  <span>{chapter.noOfComments}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto mb-[80px] h-[42px] w-[80%] rounded-lg bg-[var(--app-text-color-near-white)] text-center leading-[42px] text-[var(--app-text-color-medium-gray)] md:hidden">
        See all
      </div>

      <div className="soft-edge-shadow fixed bottom-0 left-0 z-30 flex h-[60px] w-full items-center justify-between bg-white px-[5%] md:hidden">
        <button className="flex h-[36px] w-[15%] items-center justify-center rounded-[100px] border border-[var(--app-text-color-crimson)] text-[var(--app-text-color-crimson)]">
          <Share className="h-[13px] w-[13px]" strokeWidth={2.1} />
        </button>

        <button className="flex h-[36px] w-[15%] items-center justify-center rounded-[100px] border border-[var(--app-text-color-crimson)] text-[var(--app-text-color-crimson)]">
          <Bookmark className="h-[13px] w-[13px]" strokeWidth={2.1} />
        </button>

        <Link
          href="/"
          className="flex h-[36px] w-[60%] items-center justify-center rounded-[100px] bg-[var(--app-text-color-crimson)] text-[var(--app-text-color-near-white)]"
        >
          <BookOpen className="h-[14px] w-[14px]" strokeWidth={2.1} />
          <span className="font-noto-sans-sc ml-2.5 inline-block text-[13px]/[37px] font-[500]">
            Read Now
          </span>
        </Link>
      </div>
    </>
  );
}
