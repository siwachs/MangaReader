import Link from "next/link";

const paginationButtonClasses =
  "box-content flex h-[25px] w-[40%] items-center justify-center rounded-[500px] border border-[var(--app-text-color-crimson)] leading-normal text-[var(--app-text-color-crimson)] aria-disabled:pointer-events-none aria-disabled:border-gray-500 aria-disabled:text-gray-500/70";

const Pagination: React.FC<{
  prevChapter?: string;
  nextChapter?: string;
  contentId: string;
}> = ({ prevChapter, contentId, nextChapter }) => {
  return (
    <div className="box-content h-[50px] w-full md:-mt-5 md:h-[100px]">
      <div className="mx-auto box-content flex h-full items-center justify-around px-[10%] md:w-[500px]">
        <Link
          aria-disabled={!prevChapter}
          href={`/watch/${contentId}/${prevChapter}`}
          className={paginationButtonClasses}
        >
          <span className="text-xs md:text-xl">Previous Episode</span>
        </Link>

        <Link
          aria-disabled={!nextChapter}
          href={`/watch/${contentId}/${nextChapter}`}
          className={paginationButtonClasses}
        >
          <span className="text-xs md:text-xl">Next Episode</span>
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
