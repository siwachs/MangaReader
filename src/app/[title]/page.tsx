import type { Metadata } from "next";
import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Like, StarSolid, View } from "@/components/icons";

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
  description: `All the infant girls countrywide drift downstream from the beginning of the fosse. Whoever reaches the terminal point first will be adopted by the emperor.
  Excuse me??? Who think of such ridiculous idea?! Whoa! I want to go back to my original world!
  What an awful time travel!
  MangaToon got authorization from Xiaomingtaiji to publish this work, the content is the author's own point of view, and does not represent the stand of MangaToon.`,
};

export const metadata: Metadata = {
  title: `${data.title} - Manga Reader`,
  description: data.description,
};

export default function TitlePage() {
  return (
    <>
      <div className="details-wrapper mx-[5%] w-[90%] max-w-[1200px] pt-[5%] lg:mx-auto lg:pt-[45px]">
        <div className="details-top-info mx-[1px] mb-[1px] h-[27%] w-full overflow-visible lg:h-[345px] lg:overflow-hidden">
          <div className="detail-image relative mr-[45px] h-[54.5vw] w-full lg:inline-block lg:h-[345px] lg:w-[260px]">
            <Image
              quality={100}
              src={data.thumbnail}
              alt={data.title}
              fill
              className="h-full w-full rounded object-cover object-center lg:hidden"
              sizes="(max-width: 1024px) 60vw, 54vw"
            />
            <Image
              quality={100}
              src={data.poster}
              alt={data.title}
              fill
              className="hidden h-full w-full rounded object-cover object-center lg:block"
              sizes="(max-width: 1024px) 60vw, 54vw"
            />
          </div>

          <div className="detail-info inline-block w-full overflow-hidden lg:h-[345px] lg:w-[880px]">
            <div className="detail-title flex overflow-hidden py-2.5">
              <span
                style={{ fontFamily: "Noto Sans SC" }}
                className="hide-text mr-[80px] w-full text-lg/[24px] font-[500]"
              >
                {data.title}
              </span>
              <div className="absolute right-[5%] box-content h-[18px] whitespace-nowrap rounded-xl bg-[var(--app-text-color-red-orange)] px-[9px] pb-[3px] pt-[2px] text-center text-xs/[18px] text-white">
                {data.status}
              </div>
            </div>

            <div
              style={{ fontFamily: "Noto Sans SC" }}
              className="detail-genres mb-[5px] h-5 overflow-auto whitespace-nowrap text-xs/[20px] font-normal text-[var(--app-text-color-darker-gray)] lg:mb-[15px] lg:w-[700px] lg:text-sm lg:text-[var(--app-text-color-slate-gray)]"
            >
              {data.genres.map((genre, index) => (
                <React.Fragment key={genre}>
                  <Link href={"/"} key={genre}>
                    {genre}
                  </Link>
                  {index + 1 !== data.genres.length && " / "}
                </React.Fragment>
              ))}
            </div>

            <div className="detail-stats flex items-center text-[13px] text-[var(--app-text-color-darker-gray)]">
              <View className="-mt-0.5 mr-0.5 h-[13px] w-[13px]" />
              <span>{data.noOfViews}</span>

              <Like className="-mt-0.5 ml-2.5 mr-0.5 h-[14px] w-[14px]" />
              <span>{data.numberOfLikes}</span>

              <div className="-mt-0.5 ml-2.5 flex items-center overflow-hidden">
                {[...new Array(5)].map((star, index) => {
                  const uniqueKey = `star${index}`;
                  const inverse = Math.floor(data.rating) <= index;
                  return (
                    <StarSolid
                      key={uniqueKey}
                      inverse={inverse}
                      className="h-[17px] w-[17px] lg:mr-[3px]"
                    />
                  );
                })}

                <span className="-mb-[1px] ml-[4px] mt-[1px] text-sm">
                  {data.rating}
                </span>
              </div>
            </div>

            <div className="detail-author"></div>

            <div className="detail-description"></div>
          </div>
        </div>
      </div>

      <div></div>
    </>
  );
}
