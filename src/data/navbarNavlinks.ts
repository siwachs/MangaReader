interface Navlink {
  key: string;
  label: string;
  link: string;
}

export const desktopNavLinks: Navlink[] = [
  { key: "home", label: "Home", link: "" },
  { key: "comics", label: "Comics", link: "/comics" },
  { key: "novelToon", label: "NovelToon", link: "/noveltoon" },
  { key: "allManga", label: "AllManga", link: "/allmanga" },
  { key: "booklist", label: "Booklist", link: "/booklist" },
  { key: "contribute", label: "Contribute", link: "/contribute" },
  { key: "games", label: "Games", link: "/games" },
  { key: "purchaseCoins", label: "Purchase Coins", link: "/purchase" },
];
