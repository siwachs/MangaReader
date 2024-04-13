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
interface Navlink {
  key: string;
  Icon?: any;
  mobileOnly?: boolean;
  label: string;
  link: string;
}

export const navLinks: Navlink[] = [
  { key: "home", Icon: Home, label: "Home", link: "/" },
  {
    key: "history",
    Icon: Clock,
    label: "History",
    link: "/history",
    mobileOnly: true,
  },
  { key: "comics", Icon: Book, label: "Comics", link: "/comics" },
  {
    key: "novelToon",
    Icon: Book,
    label: "NovelToon",
    link: "/noveltoon",
  },
  { key: "allManga", Icon: Book, label: "AllManga", link: "/allmanga" },
  {
    key: "contribute",
    Icon: Trophy,
    label: "Contribute",
    link: "/contribute/info",
  },
  { key: "publish", Icon: NotePad, label: "Publish", link: "/contribute" },
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
  },
];
