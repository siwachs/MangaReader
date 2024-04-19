import Link from "next/link";
import Image from "next/image";
import { Heart } from "../icons";

const dummyContent = [
  "/dummyContent/1.webp",
  "/dummyContent/2.webp",
  "/dummyContent/3.webp",
  "/dummyContent/4.webp",
  "/dummyContent/5.webp",
  "/dummyContent/6.webp",
];

const mangaGenres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Psychological",
  "Thriller",
  "Historical",
  "Martial Arts",
  "School Life",
  "Shounen",
  "Shoujo",
  "Seinen",
  "Josei",
  "Harem",
  "Ecchi",
  "Isekai",
  "Tragedy",
  "Yaoi",
  "Yuri",
  "Gender Bender",
  "Music",
  "Game",
  "Space",
  "Police",
  "Samurai",
  "Demons",
  "Vampire",
  "Gore",
  "Super Power",
  "Military",
  "Magic",
  "Parody",
  "Kids",
  "Medical",
  "Reverse Harem",
  "Dementia",
  "Hentai",
];

const GernresList: React.FC<{
  title: string;
  dataUrl: string;
  seeAll?: string;
}> = ({ title, dataUrl, seeAll }) => {
  return (
    <div className="mx-auto w-[90%] overflow-hidden lg:mb-[30px] lg:w-full">
      <div className="mx-auto w-full max-w-[1380px] bg-[url('/assets/genre-bg.png')] bg-[length:100%_100%]">
        <div className="relative mx-auto my-5 w-full max-w-[1200px] overflow-hidden lg:my-[30px]">
          <h2 className="hide-text w-[70%] text-[22px] font-bold text-[var(--app-text-color-dark-gray)] lg:text-[28px]">
            {title}
          </h2>

          {seeAll && (
            <Link href={seeAll}>
              <span className="absolute right-2.5 top-2.5 text-sm text-[var(--app-text-color-red)] lg:right-0 lg:text-lg">
                See all &gt;
              </span>
            </Link>
          )}

          <div className="hidden-scrollbar ml-[5px] mt-2.5 overflow-auto whitespace-nowrap">
            {mangaGenres.map((genre, index) => (
              <div
                key={genre}
                className="mb-[5px] mr-2.5 inline-block px-[5px] lg:mr-5 lg:px-2.5"
              >
                <Link
                  className={`${index === 0 ? "border-b-2 border-[var(--app-text-color-red)] font-bold text-[var(--app-text-color-red)]" : "text-[var(--app-text-color-muted)]"} block h-5 text-sm lg:h-[30px] lg:text-lg/[30px]`}
                  href="/"
                >
                  {genre}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-[2%] overflow-hidden lg:mt-[30px] lg:gap-[30px]">
            {dummyContent.map((content, index) => (
              <div
                key={content}
                className="mb-5 w-[32%] lg:mb-[30px] lg:w-[175px]"
              >
                <Link
                  href={`${"Your Turn to Chase After Me".toLocaleLowerCase().replaceAll(" ", "-")}?content_id=1753528`}
                >
                  <div className="h-[140px] w-full overflow-hidden rounded lg:h-[233px]">
                    <Image
                      src={content}
                      alt={`content${index + 1}`}
                      height={240}
                      width={200}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="hide-text font-noto-sans-sc mt-[5px] overflow-hidden text-xs/[13px] text-[var(--app-text-color-dark-gray)] lg:mt-2.5 lg:text-lg/[22px]">
                    <span>Your Turn to Chase After Me</span>
                  </div>

                  <div className="hide-text mt-[5px] flex items-center text-xs/[20px] text-[var(--app-text-color-red)] lg:mt-[10px] lg:text-sm">
                    <Heart className="mx-[5px] inline-block h-[14px] w-[14px] lg:h-4 lg:w-4" />
                    <span>668.8K</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GernresList;
