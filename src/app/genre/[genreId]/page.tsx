import Link from "next/link";
import Image from "next/image";

import HomeNav from "@/components/navigations/homeNav";
import { View } from "@/components/icons";
import BreadCrum from "@/components/breadcrum";

const genres = [
  "All",
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "Crime",
  "Animation",
  "Documentary",
  "Biography",
  "Historical",
  "Musical",
  "Western",
  "War",
  "Family",
  "Sport",
  "School Life",
  "AI",
  "Martial Arts",
  "Wars",
  "Games",
  "Space Travel",
  "K Art",
];

const dummyContent = [
  "/dummyContent/1.webp",
  "/dummyContent/mp_poster.jpg",
  "/dummyContent/3.webp",
  "/dummyContent/4.webp",
  "/dummyContent/5.webp",
  "/dummyContent/6.webp",
];

const status = ["Hottest", "Updated", "Completed"];

export default function GenrePage() {
  return (
    <>
      <HomeNav />
      <BreadCrum titleOne="Genres" titleOneLink="/genre/all" titleTwo="All" />
      <div className="w-full overflow-hidden border-b border-[var(--app-border-color-gray)] bg-[var(--app-text-color-lavender-offwhite)] md:border-none">
        <Channels title="Genres" channels={genres} />
        <Channels title="Status" channels={status} />
      </div>

      <div className="mx-auto mt-5 w-full max-w-full overflow-hidden md:mb-5 md:mt-[50px]">
        <div className="items mx-auto w-[90%]">
          {dummyContent.map((content, index) => (
            <Link key={content} href="/">
              <div className="mb-5 overflow-hidden">
                <div className="float-left w-[32%]">
                  <div className="content-image w-full">
                    <Image
                      src={content}
                      alt={`content${index + 1}`}
                      height={240}
                      width={200}
                      className="h-auto max-w-full rounded object-cover" // height 150px
                    />
                  </div>

                  <div className="content-title"></div>
                  <div className="content-icons"></div>
                  <div className="content-genres"></div>
                </div>

                <div className="float-left ml-[4%] w-[60%] overflow-hidden">
                  <div className="content-title hide-text text-lg/[30px] font-bold">
                    <span>Martial Peak</span>
                  </div>
                  <div className="content-genres hide-text mt-2.5 text-xs/[30px] text-[var(--app-text-color-medium-gray)]">
                    <span>
                      School life/Romance/TimeTravel/Comedy/Urban Romance/Girl
                      Power/Game/Sweet/Counterattack/School Hunk
                    </span>
                  </div>
                  <div className="content-episodes-count hide-text text-xs/[24px] text-[var(--app-text-color-medium-gray)]">
                    Up to Ep.463
                  </div>
                  <div className="content-icons mt-[30px] flex items-center gap-0.5 text-[13px] text-[var(--app-text-color-red)]">
                    <View className="-mt-[1px] h-3 w-3" />
                    <span>30.4M</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="page"></div>
      </div>
    </>
  );
}

const Channels: React.FC<{ title: string; channels: string[] }> = ({
  title,
  channels,
}) => {
  return (
    <div className="my-2.5 ml-5 w-full max-w-[1200px] overflow-hidden whitespace-nowrap md:mx-auto md:mb-[35px]">
      <div className="flex items-center justify-between overflow-hidden md:items-start">
        <div className="my-[5px] w-[50px] py-[5px] text-sm text-[var(--app-text-color-stone-gray)] md:mr-[50px] md:w-[80px] md:text-lg">
          <span>{title}</span>
        </div>

        <div className="hidden-scrollbar flex w-[85%] max-w-[1060px] overflow-auto md:w-full md:flex-wrap">
          {channels.map((channel, index) => (
            <Link key={channel} href="/" className="last:mr-[10%]">
              <div
                data-active={index === 0}
                className="m-[5px] py-[5px] text-sm data-[active=true]:rounded-xl data-[active=true]:bg-[var(--app-text-color-red)] data-[active=true]:px-2.5 data-[active=true]:text-white md:m-[5px_20px_5px_0] md:text-base data-[active=true]:md:rounded-2xl data-[active=true]:md:px-5"
              >
                <span>{channel}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
