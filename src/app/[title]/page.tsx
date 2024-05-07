import Image from "next/image";
import Link from "next/link";

import {
  Calender,
  Star,
  StarSolid,
  HalfStarSolid,
  BellSolid,
  ChevronDown,
  InformationCircle,
} from "@/components/icons";
import { Content } from "./_types";

const data: Content = {
  poster: "/dummyContent/mp_poster.jpg",
  title: "Martial Peak",
  genres: [
    "All",
    "Shonen",
    "Shojo",
    "Seinen",
    "Josei",
    "Isekai",
    "Slice of Life",
  ],
  status: "Ongoing",
  rating: 8.1,
  author: "Momo",
  synonyms: ["Wǔ Liàn Diān Fēng"],
  reminderText: "A new chapter is coming",
  chapters: [
    {
      _id: "3738",
      title: "Martial Peak Ch.3738",
      releaseDate: "05/05/2024",
    },
    {
      _id: "3737",
      title: "Martial Peak Ch.3737",
      releaseDate: "04/05/2024",
    },
    {
      _id: "3736",
      title: "Martial Peak Ch.3736",
      releaseDate: "03/05/2024",
    },
    {
      _id: "1",
      title: "Martial Peak Ch.1",
      releaseDate: "01/05/2023",
    },
    {
      _id: "2",
      title: "Martial Peak Ch.2",
      releaseDate: "02/05/2023",
    },
    {
      _id: "3",
      title: "Martial Peak Ch.3",
      releaseDate: "03/05/2023",
    },
    {
      _id: "4",
      title: "Martial Peak Ch.4",
      releaseDate: "06/05/2023",
    },
  ],
  totalChapters: 6,
  description: `Martial Peak Manga is a Chinese Manhua series adapted from a novel, set in a fantastical world full of powerful warriors and mystic martial arts. The story follows Yang Kai, a humble youth born into lower society, who unexpectedly discovers the "Nine Yang Divine Technique." This ancient manuscript grants him incredible martial prowess and a chance for a cultivation journey.

  Main Character: Ren Zhi Bai is a character in Martial.Peak Manga. He belongs to the Dawn Squad, under the leadership of Yang Kai, and stands out as one of the most gifted young cultivators in the Blue Sky Pass.`,
  galleryImages: [
    "/dummyContent/mp_poster.jpg",
    "/dummyContent/1.webp",
    "/dummyContent/2.webp",
    "/dummyContent/3.webp",
    "/dummyContent/4.webp",
    "/dummyContent/5.webp",
    "/dummyContent/6.webp",
    "/dummyContent/thumbnail.webp",
  ],
  newsList: [
    { title: "Meng Wu Ya Martial Peak", link: "/" },
    { title: "Su Yan Martial Peak", link: "/" },
    { title: "Yang Kai Martial Peak", link: "/" },
  ],
  latestUpdates: [
    { title: "One Piece", link: "https://www.mangago.me/read-manga/one_piece" },
    { title: "Naruto", link: "https://www.mangago.me/read-manga/naruto" },
    {
      title: "Attack on Titan",
      link: "https://www.mangago.me/read-manga/attack_on_titan",
    },
    {
      title: "My Hero Academia",
      link: "https://www.mangago.me/read-manga/my_hero_academia",
    },
    {
      title: "Death Note",
      link: "https://www.mangago.me/read-manga/death_note",
    },
    {
      title: "Demon Slayer: Kimetsu no Yaiba",
      link: "https://www.mangago.me/read-manga/demon_slayer_kimetsu_no_yaiba",
    },
    {
      title: "Dragon Ball",
      link: "https://www.mangago.me/read-manga/dragon_ball",
    },
    {
      title: "Fullmetal Alchemist",
      link: "https://www.mangago.me/read-manga/fullmetal_alchemist",
    },
  ],
};

export default function TitlePage() {
  return (
    <>
      <div className="breadcrum box-content hidden h-[50px] overflow-hidden pt-2.5 md:block">
        <ul className="mx-auto box-content flex h-[50px] max-w-[1200px] items-center">
          <li className="hover:text-[var(--app-text-color-bright-pink)]">
            <Link href="/">Home</Link>
          </li>
          <li className="ml-[5px] before:text-[var(--app-text-color-medium-gray)] before:content-['_/_'] hover:text-[var(--app-text-color-bright-pink)]">
            <Link href="/">{data.genres[0]}</Link>
          </li>
          <li className="ml-[5px] text-[var(--app-text-color-medium-gray)] before:text-[var(--app-text-color-medium-gray)] before:content-['_/_']">
            {data.title}
          </li>
        </ul>
      </div>

      <div className="detail-wrapper overflow-hidden">
        <div className="detail-image relative min-h-[208px] w-screen md:py-8 lg:bg-[var(--app-text-color-almost-white)]">
          <Image
            fill
            src={data.poster}
            alt={data.title}
            className="absolute left-0 top-0 h-full w-full object-cover object-center lg:hidden"
          />
          <div className="absolute top-0 h-full w-full bg-[var(--app-background-overlay-transparent-black)] backdrop-blur-[10px] lg:hidden" />

          <div className="detail-header-content-box relative mx-auto flex w-full max-w-[1200px] gap-4 p-[24px_16px] text-xs text-white md:gap-5 md:p-0 lg:text-[var(--app-text-color-dark-gray)]">
            <Image
              src={data.poster}
              alt={data.title}
              width={200}
              height={200}
              className="h-[140px] w-[106px] flex-shrink-0 rounded-lg object-cover md:h-[320px] md:w-[235px]"
            />

            <div className="flex flex-col md:flex-grow md:justify-between">
              <div className="mb-2.5 hidden items-center gap-[15px] md:flex">
                <p className="text-2xl font-[700]">{data.title}</p>
                <div className="flex items-center gap-1">
                  <Calender className="h-[14px] w-[14px]" />
                  <span>{data.status}</span>
                </div>
              </div>

              <p className="mb-2 text-lg md:hidden">{data.title}</p>

              <div className="mb-2.5 flex items-center gap-1 md:hidden">
                <Calender className="h-[14px] w-[14px]" />
                <span>{data.status}</span>
              </div>

              <div className="mb-2 flex items-center md:hidden">
                <span className="text-base font-[700]">{data.rating}</span>
                <span className="-mt-[1px] text-sm text-[var(--app-text-color-gray-light)]">
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

              <div className="mb-1 md:mb-0 md:text-sm/[18px]">
                <p className="line-clamp-1 break-all">Author: {data.author}</p>
              </div>

              <div>
                <span className="line-clamp-1 font-[400] leading-[15px] md:text-sm/[18px]">
                  Synonyms: {data.synonyms.join(", ")}
                </span>
              </div>

              <div className="relative hidden max-w-[800px] md:block">
                <p className="font-noto-sans-sc line-clamp-5 whitespace-pre-line break-words text-sm font-[400] lg:text-[var(--app-text-color-slate-gray)]">
                  {data.description}
                </p>

                <ChevronDown
                  className="absolute bottom-1 right-0 h-4 w-4 cursor-pointer rounded-[100px] bg-[var(--app-text-color-medium-gray)] text-white"
                  strokeWidth={2.6}
                />
              </div>

              <div className="mb-2 hidden items-center md:mb-0 md:flex">
                <span className="mr-3 text-lg font-[400] lg:text-[var(--app-text-color-standard-gray)]">
                  {data.rating}
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
                      className="h-[18px] w-[18px] text-[var(--app-text-color-vibrant-golden)]"
                      key={uniqueKey}
                    />
                  );
                })}
              </div>

              <div className="mt-2.5 flex items-center">
                <Link href="/">
                  <div className="box-content flex h-[30px] max-w-80 items-center justify-center break-words rounded-[20px] bg-[var(--app-text-color-bright-pink)] px-[15px] md:h-[33px] md:px-5 md:py-1.5 md:text-base lg:text-white">
                    Read Latest Chapter
                    <span className="hidden md:inline">
                      : Chapter {data.totalChapters}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-episodes mt-[30px]">
          <div className="detail-title mx-auto mt-2 flex max-w-[1200px] justify-between px-4 md:mt-3 md:justify-start md:px-0">
            <p className="ml-4 text-lg font-[700] text-[var(--app-text-color-dark-gray)] md:text-2xl">
              {data.title} Chapters
            </p>
            <div className="detail-subscribe ml-2.5 hidden cursor-pointer items-center gap-0.5 text-sm font-[400] text-[var(--app-text-color-bright-pink)] md:flex">
              <BellSolid className="h-3 w-3" />
              <span>Update reminder</span>
            </div>

            <div className="flex items-center text-[13px] leading-4 md:hidden">
              <span
                className="cursor-pointer data-[active=true]:text-[var(--app-text-color-vibrant-pink)]"
                data-active={true}
              >
                Reverse
              </span>
              <span className="mx-1 text-[var(--app-text-color-pale-silver)]">
                |
              </span>
              <span className="cursor-pointer">Positive</span>
            </div>
          </div>

          <div className="mx-auto mb-6 hidden max-w-[1200px] items-center justify-end text-lg font-[400] text-[var(--app-text-color-dark-gray)] md:flex">
            <p
              className="cursor-pointer data-[active=true]:text-[var(--app-text-color-vibrant-pink)]"
              data-active={true}
            >
              Reverse
            </p>
            <p className="text-[var(--app-text-color-pale-silver)]">   |  </p>
            <p className="cursor-pointer">Positive</p>
          </div>

          <div className="detail-subscribe mx-4 my-2 flex items-center justify-between rounded-lg bg-[var(--app-text-color-very-light-gray)] px-4 py-3 md:hidden">
            <p className="text-sm/[18px] font-[400] text-[var(--app-text-color-medium-gray)]">
              {data.reminderText}
            </p>
            <div className="flex cursor-pointer items-center gap-0.5 text-right text-xs text-[var(--app-text-color-bright-pink)]">
              <BellSolid className="h-3 w-3" />
              <span>Update reminder</span>
            </div>
          </div>

          <div className="detail-episodes-continer mx-auto max-w-[1200px] flex-wrap justify-between md:flex">
            {data.chapters.map((chapter, index) => (
              <div
                key={chapter._id}
                className={`${index + 1 > 3 && ""} mx-4 my-2 rounded-lg bg-[var(--app-text-color-very-light-gray)] px-4 py-3 md:m-0 md:mb-4 md:w-80`}
              >
                <div className="flex items-center justify-between">
                  <Link href="/">
                    <p className="text-sm/[18px] font-[400] text-[var(--app-text-color-dark-gray)]">
                      {chapter.title}
                    </p>
                    <p className="mt-2.5 text-xs font-[400] text-[var(--app-text-color-medium-gray)]">
                      release date {chapter.releaseDate}
                    </p>
                  </Link>

                  <ChevronDown
                    className="h-4 w-4 cursor-pointer text-[var(--app-text-color-medium-gray)]"
                    strokeWidth={2.6}
                  />
                </div>
              </div>
            ))}

            <div className="mx-4 my-2 flex cursor-pointer items-center justify-center rounded-lg bg-[var(--app-text-color-very-light-gray)] px-4 py-3 text-[var(--app-text-color-medium-gray)] md:m-0 md:mb-4 md:w-80 md:gap-1">
              View All Chapters
              <span className="md:hidden"> &nbsp; &gt;&gt;&gt;</span>
              <ChevronDown
                className="hidden h-4 w-4 text-[var(--app-text-color-medium-gray)] md:inline-block"
                strokeWidth={2.6}
              />
            </div>
          </div>
        </div>

        <div className="detail-description mt-8 px-4 md:hidden">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-lg font-[700] text-[var(--app-text-color-dark-gray)]">
              {data.title} Introduction
            </p>
          </div>

          <div className="relative">
            <p className="line-clamp-3 whitespace-pre-line break-words text-[13px]/[18px] font-[400] text-[var(--app-text-color-dark-gray)]">
              {data.description}
            </p>

            <ChevronDown
              className="absolute bottom-0 right-0 h-4 w-4 cursor-pointer bg-white text-[var(--app-text-color-medium-gray)]"
              strokeWidth={2.6}
            />
          </div>
        </div>

        <div className="detail-gallery mt-8">
          <Link href="/">
            <div className="flex items-center justify-between px-4 text-lg">
              <p className="font-[700] text-[var(--app-text-color-dark-gray)]">
                {data.title} Images/Wallpapers
              </p>
              <ChevronDown
                className="h-5 w-5 -rotate-90 cursor-pointer text-[var(--app-text-color-medium-gray)]"
                strokeWidth={2.6}
              />
            </div>
          </Link>

          <div className="hidden-scrollbar mt-2.5 flex overflow-auto pl-4">
            {data.galleryImages.map((galleryImage, index) => (
              <Link key={galleryImage} href="/" className="flex-shrink-0">
                <div className="mr-3 w-[71px]">
                  <Image
                    src={galleryImage}
                    alt={`image${index + 1}`}
                    width={200}
                    height={200}
                    className="h-[100px] w-full object-cover"
                  />

                  <p className="line-clamp-1 break-words text-center text-[var(--app-text-color-dark-gray)]">
                    {data.title} - piece {index + 1}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="detail-news mt-8">
          <Link href="/">
            <div className="flex items-center justify-between px-4 text-lg">
              <p className="font-[700] text-[var(--app-text-color-dark-gray)]">
                {data.title} News
              </p>
              <ChevronDown
                className="h-5 w-5 -rotate-90 cursor-pointer text-[var(--app-text-color-medium-gray)]"
                strokeWidth={2.6}
              />
            </div>
          </Link>

          {data.newsList.map((news) => (
            <Link key={news.title} href={news.link}>
              <div className="mx-4 mt-3 flex items-center border-b border-[var(--app-border-color-light-gray)] pb-3">
                <Image
                  src="/assets/internet-searchinformation-icon.png"
                  alt="internet-searchinformation"
                  height={20}
                  width={20}
                  className="mr-1 h-4 w-4"
                />
                <p className="line-clamp-1 break-words text-[13px] text-[var(--app-text-color-dark-gray)]">
                  {news.title}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="details-latest-updates mt-8">
          <Link href="/">
            <div className="flex items-center justify-between px-4 text-lg">
              <p className="font-[700] text-[var(--app-text-color-dark-gray)]">
                Latest Updates
              </p>
              <ChevronDown
                className="h-5 w-5 -rotate-90 cursor-pointer text-[var(--app-text-color-medium-gray)]"
                strokeWidth={2.6}
              />
            </div>
          </Link>

          <div className="flex flex-wrap items-center justify-between px-4">
            {data.latestUpdates.map((content) => (
              <Link
                key={content.title}
                href={content.link}
                className="mt-3 line-clamp-1 w-[48%] break-words text-[13px] font-[400] text-[var(--app-text-color-dark-gray)]"
              >
                <p>{content.title}</p>
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/"
          className="mb-[30px] mt-8 flex items-center justify-center text-[var(--app-text-color-medium-gray)]"
        >
          <p className="mr-2 text-xs font-[400] underline">
            Have problems with reading?
          </p>
          <InformationCircle className="h-[13px] w-[13px]" strokeWidth={2.6} />
        </Link>
      </div>
    </>
  );
}
