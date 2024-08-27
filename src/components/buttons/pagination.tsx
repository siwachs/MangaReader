import Link from "next/link";

const paginationButtonClasses =
  "flex h-[50px] w-[50%] items-center justify-center text-center text-sm aria-disabled:pointer-events-none aria-disabled:border-gray-300 aria-disabled:text-gray-300 md:w-[180px] md:rounded-[25px] md:border md:border-gray-600";

const Pagination: React.FC<{
  lastPageAriaDisabled: boolean;
  lastPageLink: string;
  nextPageAriaDisabled: boolean;
  nextPageLink: string;
}> = ({
  lastPageAriaDisabled,
  lastPageLink,
  nextPageAriaDisabled,
  nextPageLink,
}) => {
  return (
    <div className="mx-auto my-[25px] flex max-w-[1200px] overflow-hidden border-y border-gray-300 py-2.5 md:justify-center md:gap-5 md:border-none">
      <Link
        aria-disabled={lastPageAriaDisabled}
        href={lastPageLink}
        className={`${paginationButtonClasses} border-r`}
      >
        Last Page
      </Link>

      <Link
        aria-disabled={nextPageAriaDisabled}
        href={nextPageLink}
        className={`${paginationButtonClasses} `}
      >
        Next Page
      </Link>
    </div>
  );
};

export default Pagination;
