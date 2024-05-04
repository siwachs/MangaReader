import Image from "next/image";

import { Calender, Star, StarSolid, HalfStarSolid } from "@/components/icons";
import Link from "next/link";

const data = {
  poster: "/dummyContent/mp_poster.jpg",
  title: "Martial Peak",
  status: "Ongoing",
  rating: 8.1,
  author: "Momo",
  synonyms: ["Wǔ Liàn Diān Fēng"],
};

export default function TitlePage() {
  return (
    <div className="detail-wrapper overflow-hidden">
      <div className="detail-image relative min-h-[208px] w-screen">
        <Image
          fill
          src={data.poster}
          alt={data.title}
          className="absolute left-0 top-0 h-full w-full object-cover object-center"
        />
        <div className="absolute top-0 h-full w-full bg-[var(--app-background-overlay-transparent-black)] backdrop-blur-[10px]" />

        <div className="detail-header-content-box relative flex w-full gap-4 p-[24px_16px] text-xs text-white">
          <Image
            src={data.poster}
            alt={data.title}
            width={200}
            height={200}
            className="h-[140px] w-[106px] flex-shrink-0 rounded-lg object-cover"
          />

          <div className="flex flex-col">
            <div>
              <p className="mb-2 text-lg">{data.title}</p>

              <div className="mb-2.5 flex items-center gap-1">
                <Calender className="h-[14px] w-[14px]" />
                <span>{data.status}</span>
              </div>

              <div className="mb-2 flex items-center">
                <span className="text-base font-[700]">{data.rating}</span>
                <span className="-mt-[1px] text-sm text-[var(--app-text-color-silver-gray)]">
                    | 
                </span>

                {[...new Array(5)].map((_, index) => {
                  const uniqueKey = `star${index}`;
                  const { rating } = data;
                  const effectiveRating = index * 2;
                  let StarIcon;

                  if (Math.floor(rating) > effectiveRating)
                    StarIcon = StarSolid;
                  else if (rating > effectiveRating) StarIcon = HalfStarSolid;
                  else StarIcon = Star;

                  return (
                    <StarIcon
                      className="h-[15px] w-[15px] text-[var(--app-text-color-vibrant-golden)]"
                      key={uniqueKey}
                    />
                  );
                })}
              </div>

              <div className="mb-1">
                <p className="line-clamp-1 break-all">Author: {data.author}</p>
              </div>

              <div className="relative">
                <span className="font-[400] leading-[15px]">
                  Synonyms: {data.synonyms.join(", ")}
                </span>
                <span className="absolute -right-3 bottom-0 cursor-pointer text-black"></span>
              </div>
            </div>

            <div className="mt-2.5 flex items-center">
              <Link href="/">
                <div className="flex h-[30px] items-center justify-center rounded-[20px] bg-[var(--app-text-color-right-pink)] px-[15px]">
                  Read Latest Chapter
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
