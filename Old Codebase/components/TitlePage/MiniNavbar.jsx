import Link from "next/link";

const MiniNavbar = ({ genre, genreId, title }) => {
  return (
    <div className="mt-2 hidden h-[3.125rem] overflow-hidden lg:block">
      <ul className="mx-auto flex h-[3.125rem] max-w-[1200px] items-center gap-x-1 text-lg capitalize">
        <li className="hover:text-[var(--text-color)]">
          <Link href="/">Home</Link>
        </li>

        <li className="list-style text-[var(--text-color-black)] hover:text-[var(--text-color)]">
          <Link href={`/genre/tags/${genreId}`}>{genre}</Link>
        </li>

        <li className="list-style">{title}</li>
      </ul>
    </div>
  );
};

export default MiniNavbar;
