import Link from "next/link";

const ContentHeader = ({ headingTitle, path }) => {
  return (
    <div className="flex items-end justify-between">
      <h2 className="text-[1.375rem] font-bold text-[var(--text-color-black)] dark:text-white sm:text-2xl lg:text-[1.75rem]">
        {headingTitle}
      </h2>
      {path && (
        <Link href={path}>
          <div className="text-sm text-[var(--text-color)] sm:text-base md:text-lg">
            See All &gt;
          </div>
        </Link>
      )}
    </div>
  );
};

export default ContentHeader;
