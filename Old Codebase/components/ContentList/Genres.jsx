import { useState, useEffect } from "react";
import Link from "next/link";

import { useTheme } from "next-themes";

import ContentHeader from "./Utils/ContentHeader";
import ContentWrapper from "../Wrappers/ContentWrapper";
import DisplayContent from "./Utils/DisplayContent";

const Genres = ({ genres, genreList, headingTitle, path }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="m-auto w-[90%] overflow-hidden lg:mb-[1.875rem] lg:w-full">
      <div
        className={`${
          currentTheme === "light" ? "genre-list-bg" : ""
        } m-auto max-w-[1380px]`}
      >
        <div className="m-auto my-5 max-w-[1200px] lg:my-[1.875rem]">
          <ContentHeader headingTitle={headingTitle} path={path} />
          <GenreListComponent genres={genres} />
          <ContentWrapper>
            {genreList.map((item) => (
              <DisplayContent
                key={item._id}
                image={item.displayImagePoster.image}
                type={item.displayImagePoster.type}
                title={item.title}
                likes={item.noOfLikes}
              />
            ))}
          </ContentWrapper>
        </div>
      </div>
    </div>
  );
};

const GenreListComponent = ({ genres }) => {
  return (
    <nav className="hide-scrollbar ml-[0.3125rem] mt-2.5 overflow-x-auto overflow-y-hidden whitespace-nowrap">
      {genres.map((item, index) => (
        <div
          key={item.tagId}
          className="mb-[0.3125rem] mr-2.5 inline-block px-[0.3125rem] lg:mr-5 lg:px-2.5"
        >
          <Link href={`/genre/tags/${item.tagId}`}>
            <span
              className={`text-sm capitalize leading-5 sm:text-[0.9375rem] md:text-base lg:text-lg lg:leading-[1.875rem] ${
                index === 0
                  ? "border-b-2 border-[var(--text-color)] font-bold text-[var(--text-color)]"
                  : "text-[var(--text-color-genre)] dark:text-[#CCCCCC]"
              }`}
            >
              {item.tagName}
            </span>
          </Link>
        </div>
      ))}
    </nav>
  );
};

const GenreImages = [
  {
    img: "/Genres/0.webp",
    type: "poster",
  },
  {
    img: "/Genres/1.webp",
    type: "poster",
  },
  {
    img: "/Genres/2.webp",
    type: "poster",
  },
  {
    img: "/Genres/3.webp",
    type: "poster",
  },
  {
    img: "/Genres/4.webp",
    type: "poster",
  },
  {
    img: "/Genres/5.webp",
    type: "poster",
  },
];

export default Genres;
