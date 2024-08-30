import Link from "next/link";

import { FaChevronRight } from "react-icons/fa6";

const DetailTitleBox: React.FC<{
  title: string;
  subTitle: string;
  href: string;
}> = ({ title, subTitle, href }) => {
  return (
    <div className="mx-auto mt-8 max-w-[1200px] md:mb-6 md:mt-12 md:flex md:items-center md:justify-between">
      <Link href={href} className="md:hidden">
        <div className="flex items-center justify-between px-4 text-lg">
          <p className="font-bold">{title}</p>
          <FaChevronRight className="size-5 text-gray-500/70" />
        </div>
      </Link>

      <p className="hidden text-2xl font-bold md:block">{title}</p>

      <Link
        href={href}
        className="hidden items-center gap-[5px] text-[var(--app-text-color-bright-pink)] md:inline-flex"
      >
        <span>{subTitle}</span>
        <FaChevronRight className="size-4" />
      </Link>
    </div>
  );
};

export default DetailTitleBox;
