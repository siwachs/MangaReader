import Link from "next/link";
import Image from "next/image";

const NoResults = () => {
  return (
    <div className="font-noto-sans-sc py-[35px] text-center text-xs/[15px] font-normal text-gray-500/70 md:py-[130px] md:text-2xl">
      <Image
        priority
        src="/assets/nothing.png"
        alt="no-results"
        width={242}
        height={242}
        className="mx-auto size-[120px] md:size-[240px]"
      />

      <div>
        <p>Nothing found. Please change to another word or try again later!</p>
      </div>

      <Link href="">
        <p className="text-[11px] text-[var(--app-text-color-red)] underline">
          Can&apos;t find the work you want? Ask help from MangaToon and we will
          get it for you.
        </p>
      </Link>
    </div>
  );
};

export default NoResults;
