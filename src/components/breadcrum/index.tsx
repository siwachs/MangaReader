import Link from "next/link";

const BreadCrum: React.FC<{
  homeTitle?: string;
  homeLink?: string;
  middleTitle: string;
  middleLink: string;
  currentPageTitle: string;
}> = ({
  homeTitle = "Home",
  homeLink = "/",
  middleTitle,
  middleLink,
  currentPageTitle,
}) => {
  return (
    <div className="box-content hidden h-[50px] overflow-hidden pt-2.5 md:block">
      <ul className="mx-auto box-content flex h-[50px] max-w-[1200px] items-center gap-[5px]">
        <li className="hover:text-[var(--app-text-color-bright-pink)]">
          <Link href={homeLink}>{homeTitle}</Link>
        </li>

        <li className="before:text-gray-500/70 before:content-['_/_'] hover:text-[var(--app-text-color-bright-pink)]">
          <Link href={middleLink}>{middleTitle}</Link>
        </li>

        <li className="text-gray-500/70 before:text-gray-500/70 before:content-['_/_']">
          {currentPageTitle}
        </li>
      </ul>
    </div>
  );
};

export default BreadCrum;
