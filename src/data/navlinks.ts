import {
  Home,
  Clock,
  Book,
  Trophy,
  NotePad,
  Game,
  Star,
  SignIn,
} from "@/components/icons";

type NavLink = {
  key: string;
  Icon?: any;
  sidebarOnly?: boolean;
  label: string;
  link: string;
};

export const navLinks: NavLink[] = [
  { key: "home", Icon: Home, label: "Home", link: "/" },
  {
    key: "history",
    Icon: Clock,
    label: "History",
    link: "/history",
    sidebarOnly: true,
  },
  { key: "comics", Icon: Book, label: "Comics", link: "/genre/all" },
  {
    key: "novelToon",
    Icon: Book,
    label: "NovelToon",
    link: "/noveltoon",
  },
  { key: "allManga", Icon: Book, label: "AllManga", link: "/allmanga" },
  { key: "booklist", Icon: Book, label: "Booklist", link: "/book/list" },
  {
    key: "contribute",
    Icon: Trophy,
    label: "Contribute",
    link: "/contribute/info",
  },
  {
    key: "publish",
    Icon: NotePad,
    label: "Publish",
    link: "/contribute",
    sidebarOnly: true,
  },
  { key: "games", Icon: Game, label: "Games", link: "/games" },
  {
    key: "purchaseCoins",
    Icon: Star,
    label: "Purchase Coins",
    link: "/purchase",
  },
  {
    key: "signin",
    Icon: SignIn,
    label: "Sign In",
    link: "/signin",
    sidebarOnly: true,
  },
];

export const homeNavLinks: NavLink[] = [
  { key: "home", label: "Home", link: "/" },
  { key: "comics", label: "Comics", link: "/genre/all" },
  { key: "search", label: "Search", link: "/search" },
  { key: "booklist", label: "Booklist", link: "/book/list" },
  {
    key: "signin",
    label: "Sign In",
    link: "/signin",
  },
];
