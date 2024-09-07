import { LinkObject } from "@/types";

import {
  FaHome,
  FaHistory,
  FaBook,
  FaTrophy,
  FaEdit,
  FaGamepad,
  FaCoins,
} from "react-icons/fa";

export const navLinks: LinkObject[] = [
  { key: "home", Icon: FaHome, label: "Home", link: "/" },
  {
    key: "history",
    Icon: FaHistory,
    label: "History",
    link: "/history",
    sidebarOnly: true,
  },
  { key: "comics", Icon: FaBook, label: "Comics", link: "/genre/all/0" },
  {
    key: "novelToon",
    Icon: FaBook,
    label: "NovelToon",
    link: "/noveltoon",
  },
  { key: "booklist", Icon: FaBook, label: "Booklist", link: "/book/list" },
  {
    key: "contribute",
    Icon: FaTrophy,
    label: "Contribute",
    link: "/contribute/info",
  },
  {
    key: "publish",
    Icon: FaEdit,
    label: "Publish",
    link: "/contribute",
    sidebarOnly: true,
  },
  { key: "games", Icon: FaGamepad, label: "Games", link: "/games" },
  {
    key: "purchaseCoins",
    Icon: FaCoins,
    label: "Purchase Coins",
    link: "/purchase",
  },
];
