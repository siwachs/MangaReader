import Link from "next/link";
import Image from "next/image";

const dummyContent = [
  "/dummyContent/1.webp",
  "/dummyContent/2.webp",
  "/dummyContent/3.webp",
  "/dummyContent/4.webp",
  "/dummyContent/5.webp",
  "/dummyContent/6.webp",
];

const ContentList: React.FC<{
  title: string;
  dataUrl: string;
  seeAll?: string;
}> = ({ title, dataUrl, seeAll }) => {
  return (
    <div className="mx-auto w-[90%] overflow-hidden md:mb-[30px] md:w-full">
      <div className="relative mx-auto my-5 w-full max-w-[1200px] overflow-hidden md:my-[30px]">
        <h2 className="hide-text w-[70%] text-[22px] font-bold text-[var(--app-text-color-dark-gray)] md:text-[28px]">
          {title}
        </h2>

        {seeAll && (
          <Link href={seeAll}>
            <span className="absolute right-2.5 top-2.5 text-sm text-[var(--app-text-color-red)] md:right-0 md:text-lg">
              See all &gt;
            </span>
          </Link>
        )}

        <div className="mt-5 flex flex-wrap gap-[2%] overflow-hidden md:mt-[30px] md:gap-[30px]">
          {dummyContent.map((content, index) => (
            <div
              key={content}
              className="mb-5 w-[32%] md:mb-[30px] md:w-[175px]"
            >
              <Link
                href={`${"Your Turn to Chase After Me".toLocaleLowerCase().replaceAll(" ", "-")}?content_id=1753528`}
              >
                <div className="h-[140px] w-full overflow-hidden md:h-[233px]">
                  <Image
                    src={content}
                    alt={`content${index + 1}`}
                    height={240}
                    width={200}
                    className="h-full w-full rounded object-cover"
                  />
                </div>

                <div className="hide-text mt-[5px] overflow-hidden text-xs/[13px] text-[var(--app-text-color-dark-gray)] md:mt-2.5 md:text-lg/[22px]">
                  <span>Your Turn to Chase After Me</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentList;
