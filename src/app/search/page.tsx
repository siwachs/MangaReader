import Link from "next/link";
import Image from "next/image";

import HomeNav from "@/components/navigations/homeNav";
import { SearchGlass } from "@/components/icons";

const dummyContent = [
  "/dummyContent/1.webp",
  "/dummyContent/mp_poster.jpg",
  "/dummyContent/3.webp",
  "/dummyContent/4.webp",
  "/dummyContent/5.webp",
  "/dummyContent/6.webp",
];

const HaveResults: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="have-result mx-auto w-full max-w-[1200px]">
      <div className="comic-result">
        <div className="font-noto-sans-sc mt-[5%] md:mt-[30px]">
          <span className="text-xl/[36px] font-medium text-[var(--app-text-color-red)] md:text-2xl/[36px]">
            {title}
          </span>
          <span className="mx-[5%] text-sm md:mx-0 md:text-base">
            &nbsp;&nbsp;{dummyContent.length} results for &apos;martial&apos;
          </span>
        </div>

        <div className="my-[3%] flex flex-wrap gap-x-[2%] md:my-[30px] md:gap-x-[34px]">
          {dummyContent.map((content, index) => (
            <div key={content} className="mb-5 w-[32%] md:mb-[30px] md:w-auto">
              <Link href="/">
                <div className="h-[160px] w-full md:h-[214px] md:w-[160px]">
                  <Image
                    src={content}
                    alt={`content${index + 1}`}
                    height={240}
                    width={200}
                    className="h-[160px] w-full rounded object-cover md:h-[213px]"
                  />
                </div>
              </Link>

              <div className="hide-text h-[30px] w-[95%] px-[5px] text-left text-sm/[30px] md:w-[160px] md:text-base/[30px]">
                <span>Martial Arts Peak</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NoResults: React.FC = () => {
  return (
    <div className="no-results mx-auto w-full max-w-[1200px]">
      <div className="no-result-word font-noto-sans-sc py-[35px] text-center text-xs/[15px] font-normal text-[var(--app-text-color-medium-gray)] md:py-[130px] md:text-2xl">
        <Image
          priority
          src="/assets/nothing.png"
          alt="no-results"
          width={200}
          height={200}
          className="mx-auto h-[120px] w-[120px] md:h-[240px] md:w-[240px]"
        />

        <div>
          <p>
            Nothing found. Please change to another word or try again later!
          </p>
        </div>
        <Link href="/">
          <p className="text-[11px] text-[var(--app-text-color-red)] underline">
            Can&apos;t find the work you want? Ask help from MangaToon and we
            will get it for you.
          </p>
        </Link>
      </div>

      <div className="no-result-recommend-title font-noto-sans-sc mb-5 mt-[15px] text-xl font-medium leading-9 md:mb-[30px] md:mt-5 md:text-2xl">
        <span>Recommended For You</span>
      </div>

      <div className="no-result-recommend-comics flex flex-wrap gap-[3%] md:mb-[50px] md:gap-[18px]">
        {dummyContent.map((content, index) => (
          <div key={content} className="mb-[14px] w-[31%] md:w-[180px]">
            <Link href="/">
              <div className="h-[38vw] overflow-hidden md:h-[233px]">
                <Image
                  src={content}
                  alt={`content${index + 1}`}
                  height={240}
                  width={200}
                  className="h-full w-full rounded object-cover"
                />
              </div>
            </Link>

            <div className="recommend-comics-title hide-text mt-1.5 h-[30px] w-[95%] px-[5px] text-sm/[30px] md:w-[160px] md:text-base/[30px]">
              <span>Your Turn to Chase After Me</span>
            </div>

            <div className="comics-genres hide-text h-5 w-[95%] text-xs text-[var(--app-text-color-medium-gray)] md:w-[160px] md:text-sm">
              <span>
                Romance/CEO/Urban Romance/Girl
                Power/Rebirth/Revenge/Counterattack
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  const haveResult = false;

  return (
    <>
      <HomeNav />
      <div className="search-page-wrapper">
        <div className="search-box flex h-[100px] w-full items-center justify-center overflow-hidden md:mt-[120px] md:h-[150px]">
          <div className="box-content h-[33px] w-[90%] rounded-[500px] border border-[var(--app-text-color-red)] bg-[var(--app-text-color-very-light-gray)] md:h-[45px] md:w-[590px] md:border-2">
            <form className="flex h-full w-full items-center justify-between rounded-[500px]">
              <input
                type="text"
                placeholder="Enter manga name"
                className="ml-[11px] w-[85%] border-none bg-transparent text-xs/[25px] outline-none placeholder:text-[var(--app-text-color-charcoal-gray)] md:ml-[17px] md:w-[90%] md:text-sm/[30px]"
              />
              <button
                type="submit"
                className="flex h-full min-w-[55px] flex-shrink-0 items-center justify-center gap-1 rounded-[20px] bg-[var(--app-text-color-red)] px-3 text-xs text-white md:gap-2 md:rounded-[500px] md:px-5 md:text-base"
              >
                <SearchGlass
                  className="h-[14px] w-[14px] md:h-5 md:w-5"
                  strokeWidth={2.3}
                />
                <span>Search</span>
              </button>
            </form>
          </div>
        </div>

        <div className="search-page mx-[5%] w-[90%] md:mx-0 md:w-full">
          <HaveResults title="Internet search" />
          <HaveResults title="Comics" />
          <HaveResults title="Novels" />

          {haveResult && <NoResults />}
        </div>
      </div>
    </>
  );
}
