import Link from "next/link";
import Image from "next/image";

const paginationButtonClasses =
  "box-content flex h-[25px] w-[40%] items-center justify-center rounded-[500px] border border-[var(--app-border-color-medium-gray)] text-xs/[1.5] text-[var(--app-text-color-medium-gray)] data-[active=false]:pointer-events-none data-[active=true]:border-[var(--app-text-color-crimson)] data-[active=true]:text-[var(--app-text-color-crimson)]";

export default function WatchPage() {
  return (
    <>
      <ChaptersPagination />
      <div className="pictures grid">
        {[...new Array(11)].map((_, index) => (
          <Image
            priority
            key={index}
            src={`/chapter/${index + 1}.jpg`}
            alt={`image-${index + 1}`}
            width={900}
            height={900}
            className="w-full"
          />
        ))}
      </div>
      <ChaptersPagination />
      <div className="mb-[60px]" />
    </>
  );
}

const ChaptersPagination: React.FC = () => {
  return (
    <div className="box-content h-[50px] w-full">
      <div className="flex h-full items-center justify-around px-[10%]">
        <Link data-active={false} href="/" className={paginationButtonClasses}>
          <span>Previous Episode</span>
        </Link>
        <Link data-active={true} href="/" className={paginationButtonClasses}>
          <span>Next Episode</span>
        </Link>
      </div>
    </div>
  );
};
