import Link from "next/link";
import Image from "next/image";

const dummyContent = [
  "/dummyContent/1.webp",
  "/dummyContent/mp_poster.jpg",
  "/dummyContent/3.webp",
  "/dummyContent/4.webp",
  "/dummyContent/5.webp",
  "/dummyContent/6.webp",
];

const RecommendedForYou: React.FC = () => {
  return (
    <div>
      <div className="font-noto-sans-sc mb-5 mt-[15px] text-xl font-medium leading-9 md:mb-[30px] md:mt-5 md:text-2xl">
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

            <div className="recommend-comics-title mt-1.5 h-[30px] w-[95%] truncate px-[5px] text-sm/[30px] md:w-[160px] md:text-base/[30px]">
              <span>Your Turn to Chase After Me</span>
            </div>

            <div className="comics-genres h-5 w-[95%] truncate text-xs text-gray-500/70 md:w-[160px] md:text-sm">
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

export default RecommendedForYou;
