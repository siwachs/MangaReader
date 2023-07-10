import Link from "next/link";

import { useSession } from "next-auth/react";

const Links = [
  {
    title: "Genre",
    href: "/genre/tags/all",
  },
  {
    title: "Trending",
    href: "/genre/tags/trending",
  },
  {
    title: "Novels",
    href: "/genre/tags/novels",
  },
  {
    title: "Contribute",
    href: "/contribute",
    color: true,
  },
];

const NavLinks = () => {
  const { status, data } = useSession();

  return (
    <nav className="ml-10 flex-1 space-x-5 whitespace-nowrap font-bold text-[var(--navlink-color)] dark:text-white">
      {Links.map((item, index) => (
        <Link href={item.href} key={index}>
          <span
            className={
              item.color
                ? "text-[var(--text-color)]"
                : "hover:text-[var(--text-color)]"
            }
          >
            {item.title}
          </span>
        </Link>
      ))}
      {status === "authenticated" && data?.user.isAdmin && (
        <Link href="/admin">
          <span className="text-[var(--text-color)]">Admin Dashboard</span>
        </Link>
      )}
    </nav>
  );
};

export default NavLinks;
