import Link from "next/link";

const ListNav = ({ genre }) => {
  return (
    <div className="hidden h-[3.125rem] w-full items-center lg:flex">
      <ul className="m-auto flex max-w-[1200px] flex-1 gap-x-1.5 text-[var(--text-color-black)] dark:text-white">
        <li className="hover:text-[var(--text-color)]">
          <Link href="/">Home</Link>
        </li>
        <li className="list-style">Genres</li>
        <li className="list-style capitalize">{genre}</li>
      </ul>
    </div>
  );
};

export default ListNav;
