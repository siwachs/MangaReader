import Link from "next/link";
import Image from "next/image";
import { Like, View } from "../icons";

const dummyContent = ["/dummyContent/3.webp", "/dummyContent/4.webp"];

const HottestComics: React.FC = () => {
  return (
    <div className="mx-auto w-[90%] overflow-hidden lg:mb-[30px] lg:w-full">
      <div className="relative mx-auto my-5 w-full max-w-[1200px] overflow-hidden lg:my-[30px]">
        <h2 className="hide-text w-[70%] text-[22px] font-bold text-[var(--app-text-color-dark-gray)] lg:text-[28px]">
          Hottest Comics
        </h2>

        <Link href="/api/seeAll">
          <span className="absolute right-2.5 top-2.5 text-sm text-[var(--app-text-color-red)] lg:right-0 lg:text-lg">
            See all &gt;
          </span>
        </Link>

        <div className="mx-auto my-2.5 w-full overflow-hidden lg:flex">
          {dummyContent.map((image, index) => (
            <Link
              key={image}
              href={`${"Your Turn to Chase After Me".toLocaleLowerCase().replaceAll(" ", "-")}?content_id=1753528`}
            >
              <div className="mb-[2%] mr-[15px] box-border h-[190px] w-[150%] overflow-hidden bg-[url('/assets/hot-content-bg.png')] bg-[length:100%_100%] p-[2%] lg:mb-0 lg:h-[275px] lg:w-[590px] lg:p-[15px]">
                <div className="float-left h-full w-1/4 lg:h-[245px] lg:w-[185px]">
                  <Image
                    src={image}
                    alt={`content${index + 1}`}
                    height={250}
                    width={200}
                    className="h-full w-full rounded"
                  />
                </div>

                <div className="float-left ml-[3%] w-1/2 overflow-hidden lg:m-[10px_30px_20px_17px] lg:w-[328px]">
                  <div
                    className="hide-text h-[29px] w-[70%] text-base/[29px] font-[500] text-[var(--app-text-color-black)] lg:text-xl/[29px]"
                    style={{ fontFamily: "Noto Sans SC" }}
                  >
                    <span>Your Turn to Chase After Me</span>
                  </div>

                  <div
                    className="hide-text h-5 w-[80%] text-sm/[20px] font-[400] text-[var(--app-text-color-slate-gray)]"
                    style={{ fontFamily: "Noto Sans SC" }}
                  >
                    <span>
                      School life / Romance / TimeTravel / Comedy / Urban /
                      Romance / Game
                    </span>
                  </div>

                  <div className="mt-2.5 flex h-5 w-full items-center">
                    <View className="mr-0.5 h-4 w-4" />
                    <span className="mr-[15px] inline-block text-xs text-[var(--app-text-color-slate-gray)] lg:text-base">
                      34M
                    </span>

                    <Like className="mr-0.5 h-4 w-4" />
                    <span className="text-xs text-[var(--app-text-color-slate-gray)] lg:text-base">
                      3.5M
                    </span>
                  </div>

                  <div
                    className="mt-5 line-clamp-4 w-[70%] text-xs/[18px] font-[400] text-[var(--app-text-color-slate-gray)] lg:w-full lg:text-sm"
                    style={{ fontFamily: "Noto Sans SC" }}
                  >
                    <span>
                      {`Qu Yan is a well-known charming and “willful” beauty among
                      the transmigration agents. She never failed a single
                      mission. No matter how arrogant and unruly a man is, he
                      will eventually turn obedient under her discipline. The
                      bossy president, "My dear, I’m sorry.” The playboy, "Yan,
                      I promise I will never even glance at other girls.” The
                      cruel villain, "Whoever dares to bully you will be killed
                      by me!” The emperor, “I share the country with you, and I
                      will abolish my harem for you." The bloodthirsty demon
                      lord, “Be my wife, the world will be yours.”`}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HottestComics;
