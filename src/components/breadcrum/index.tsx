import Link from "next/link";

const BreadCrum: React.FC<{
  titleOne: string;
  titleOneLink: string;
  titleTwo: string;
}> = ({ titleOne, titleOneLink, titleTwo }) => {
  return (
    <div className="breadcrum box-content hidden h-[50px] overflow-hidden pt-2.5 md:block">
      <ul className="mx-auto box-content flex h-[50px] max-w-[1200px] items-center gap-[5px]">
        <li className="hover:text-[var(--app-text-color-bright-pink)]">
          <Link href="/">Home</Link>
        </li>
        <li className="before:text-gray-500/70 before:content-['_/_'] hover:text-[var(--app-text-color-bright-pink)]">
          <Link href={titleOneLink}>{titleOne}</Link>
        </li>
        <li className="text-gray-500/70 before:text-gray-500/70 before:content-['_/_']">
          {titleTwo}
        </li>
      </ul>
    </div>
  );
};

export default BreadCrum;
