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

const ContentList: React.FC<{ title: string; dataUrl: string }> = ({
  title,
  dataUrl,
}) => {
  return (
    <div className="mx-auto w-[90%] overflow-hidden lg:mb-[30px] lg:w-full">
      <div className="my-[20px] w-full max-w-[1200px] overflow-hidden lg:mx-auto lg:my-[30px]">
        <h2 className="hide-text w-[70%] text-[22px] font-bold text-[var(--app-text-color-dark-gray)]">
          {title}
        </h2>

        <div className="mt-5 flex flex-wrap overflow-hidden">
          {dummyContent.map((content, index) => (
            <div
              key={content}
              className={`mb-5 ${(index + 1) % 3 === 0 ? "mr-0" : "mr-[2%]"} w-[32%] lg:mb-[30px] lg:w-[175px]`}
            >
              <Link href="">
                <div className="h-[140px] w-full overflow-hidden rounded lg:h-[233px]">
                  <Image
                    src={content}
                    alt={`content${index + 1}`}
                    height={240}
                    width={200}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="hide-text mt-[5px] overflow-hidden text-xs/[13px] text-[var(--app-text-color-dark-gray)]">
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
