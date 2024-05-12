import type { Metadata } from "next";
import React from "react";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
  Calender,
  Star,
  StarSolid,
  HalfStarSolid,
  ChevronDown,
  InformationCircle,
} from "@/components/icons";
import { Content } from "./_types";
import Description from "./_components/description";
import ChaptersList from "./_components/chaptersList";

const data: Content = {
  poster: "/dummyContent/mp_poster.jpg",
  title: "Martial Peak",
  genres: [
    "All",
    "Shonen",
    "Shojo",
    "Seinen",
    "Josei",
    "Isekai",
    "Slice of Life",
  ],
  status: "Ongoing",
  rating: 8.1,
  author: "Momo",
  synonyms: ["Wǔ Liàn Diān Fēng"],
  reminderText: "A new chapter is coming",
  chapters: [
    {
      _id: "98",
      title: "AI Ascendancy VIII",
      releaseDate: "14/08/2033",
    },
    {
      _id: "99",
      title: "Robotic Revolution VIII",
      releaseDate: "25/09/2033",
    },
    {
      _id: "100",
      title: "Future Frontiers V",
      releaseDate: "07/11/2033",
    },
    {
      _id: "101",
      title: "Cybernetic Symphony V",
      releaseDate: "19/12/2033",
    },
    {
      _id: "102",
      title: "Virtual Vanguard V",
      releaseDate: "31/01/2034",
    },
    {
      _id: "103",
      title: "Digital Dynasty V",
      releaseDate: "13/03/2034",
    },
    {
      _id: "104",
      title: "Neural Nexus V",
      releaseDate: "25/04/2034",
    },
    {
      _id: "105",
      title: "Quantum Quandary V",
      releaseDate: "07/06/2034",
    },
    {
      _id: "106",
      title: "Technological Triumph V",
      releaseDate: "19/07/2034",
    },
    {
      _id: "107",
      title: "AI Ascendancy IX",
      releaseDate: "31/08/2034",
    },
    {
      _id: "108",
      title: "Robotic Revolution IX",
      releaseDate: "12/10/2034",
    },
    {
      _id: "109",
      title: "Future Fables V",
      releaseDate: "24/11/2034",
    },
    {
      _id: "110",
      title: "Cybernetic Convergence V",
      releaseDate: "06/01/2035",
    },
    {
      _id: "111",
      title: "Virtual Versatility V",
      releaseDate: "18/02/2035",
    },
    {
      _id: "112",
      title: "Digital Dominion V",
      releaseDate: "02/04/2035",
    },
    {
      _id: "113",
      title: "Neural Nirvana V",
      releaseDate: "14/05/2035",
    },
    {
      _id: "114",
      title: "Quantum Quest VI",
      releaseDate: "26/06/2035",
    },
    {
      _id: "115",
      title: "Techno Triumph VI",
      releaseDate: "08/08/2035",
    },
    {
      _id: "116",
      title: "AI Ascendancy X",
      releaseDate: "20/09/2035",
    },
    {
      _id: "117",
      title: "Robotic Revolution X",
      releaseDate: "02/11/2035",
    },
    {
      _id: "118",
      title: "Future Frontiers VI",
      releaseDate: "14/12/2035",
    },
    {
      _id: "119",
      title: "Cybernetic Symphony VI",
      releaseDate: "26/01/2036",
    },
    {
      _id: "120",
      title: "Virtual Vanguard VI",
      releaseDate: "08/03/2036",
    },
    {
      _id: "121",
      title: "Digital Dynasty VI",
      releaseDate: "19/04/2036",
    },
    {
      _id: "122",
      title: "Neural Nexus VI",
      releaseDate: "01/06/2036",
    },
    {
      _id: "123",
      title: "Quantum Quandary VI",
      releaseDate: "13/07/2036",
    },
    {
      _id: "124",
      title: "Technological Triumph VI",
      releaseDate: "25/08/2036",
    },
    {
      _id: "125",
      title: "AI Ascendancy XI",
      releaseDate: "06/10/2036",
    },
    {
      _id: "126",
      title: "Robotic Revolution XI",
      releaseDate: "18/11/2036",
    },
    {
      _id: "127",
      title: "Future Fables VI",
      releaseDate: "30/12/2036",
    },
    {
      _id: "128",
      title: "Cybernetic Convergence VI",
      releaseDate: "11/02/2037",
    },
    {
      _id: "129",
      title: "Virtual Versatility VI",
      releaseDate: "25/03/2037",
    },
    {
      _id: "130",
      title: "Digital Dominion VI",
      releaseDate: "06/05/2037",
    },
    {
      _id: "131",
      title: "Neural Nirvana VI",
      releaseDate: "18/06/2037",
    },
    {
      _id: "132",
      title: "Quantum Quest VII",
      releaseDate: "30/07/2037",
    },
    {
      _id: "133",
      title: "Techno Triumph VII",
      releaseDate: "11/09/2037",
    },
    {
      _id: "134",
      title: "AI Ascendancy XII",
      releaseDate: "23/10/2037",
    },
    {
      _id: "135",
      title: "Robotic Revolution XII",
      releaseDate: "04/12/2037",
    },
    {
      _id: "136",
      title: "Future Frontiers VII",
      releaseDate: "15/01/2038",
    },
    {
      _id: "137",
      title: "Cybernetic Symphony VII",
      releaseDate: "27/02/2038",
    },
    {
      _id: "138",
      title: "Virtual Vanguard VII",
      releaseDate: "11/04/2038",
    },
    {
      _id: "139",
      title: "Digital Dynasty VII",
      releaseDate: "23/05/2038",
    },
    {
      _id: "140",
      title: "Neural Nexus VII",
      releaseDate: "04/07/2038",
    },
    {
      _id: "141",
      title: "Quantum Quandary VII",
      releaseDate: "15/08/2038",
    },
    {
      _id: "142",
      title: "Technological Triumph VII",
      releaseDate: "26/09/2038",
    },
    {
      _id: "143",
      title: "AI Ascendancy XIII",
      releaseDate: "07/11/2038",
    },
    {
      _id: "144",
      title: "Robotic Revolution XIII",
      releaseDate: "19/12/2038",
    },
    {
      _id: "145",
      title: "Future Fables VII",
      releaseDate: "30/01/2039",
    },
    {
      _id: "78",
      title: "Quantum Quest IV",
      releaseDate: "20/04/2031",
    },
    {
      _id: "79",
      title: "Techno Triumph IV",
      releaseDate: "02/06/2031",
    },
    {
      _id: "80",
      title: "AI Ascendancy VI",
      releaseDate: "14/07/2031",
    },
    {
      _id: "81",
      title: "Robotic Revolution VI",
      releaseDate: "25/08/2031",
    },
    {
      _id: "82",
      title: "Future Frontiers IV",
      releaseDate: "06/10/2031",
    },
    {
      _id: "83",
      title: "Cybernetic Symphony IV",
      releaseDate: "18/11/2031",
    },
    {
      _id: "84",
      title: "Virtual Vanguard IV",
      releaseDate: "30/12/2031",
    },
    {
      _id: "85",
      title: "Digital Dynasty IV",
      releaseDate: "11/02/2032",
    },
    {
      _id: "86",
      title: "Neural Nexus IV",
      releaseDate: "24/03/2032",
    },
    {
      _id: "87",
      title: "Quantum Quandary IV",
      releaseDate: "05/05/2032",
    },
    {
      _id: "88",
      title: "Technological Triumph IV",
      releaseDate: "17/06/2032",
    },
    {
      _id: "89",
      title: "AI Ascendancy VII",
      releaseDate: "29/07/2032",
    },
    {
      _id: "90",
      title: "Robotic Revolution VII",
      releaseDate: "10/09/2032",
    },
    {
      _id: "91",
      title: "Future Fables IV",
      releaseDate: "22/10/2032",
    },
    {
      _id: "92",
      title: "Cybernetic Convergence IV",
      releaseDate: "03/12/2032",
    },
    {
      _id: "93",
      title: "Virtual Versatility IV",
      releaseDate: "15/01/2033",
    },
    {
      _id: "94",
      title: "Digital Dominion IV",
      releaseDate: "26/02/2033",
    },
    {
      _id: "95",
      title: "Neural Nirvana IV",
      releaseDate: "10/04/2033",
    },
    {
      _id: "96",
      title: "Quantum Quest V",
      releaseDate: "22/05/2033",
    },
    {
      _id: "97",
      title: "Techno Triumph V",
      releaseDate: "03/07/2033",
    },
    {
      _id: "58",
      title: "Digital Dominion II",
      releaseDate: "18/12/2028",
    },
    {
      _id: "59",
      title: "Neural Nirvana II",
      releaseDate: "29/01/2029",
    },
    {
      _id: "60",
      title: "Quantum Quest III",
      releaseDate: "12/03/2029",
    },
    {
      _id: "61",
      title: "Techno Triumph III",
      releaseDate: "24/04/2029",
    },
    {
      _id: "62",
      title: "AI Ascendancy IV",
      releaseDate: "06/06/2029",
    },
    {
      _id: "63",
      title: "Robotic Revolution IV",
      releaseDate: "18/07/2029",
    },
    {
      _id: "64",
      title: "Future Frontiers III",
      releaseDate: "30/08/2029",
    },
    {
      _id: "65",
      title: "Cybernetic Symphony III",
      releaseDate: "11/10/2029",
    },
    {
      _id: "66",
      title: "Virtual Vanguard III",
      releaseDate: "23/11/2029",
    },
    {
      _id: "67",
      title: "Digital Dynasty III",
      releaseDate: "05/01/2030",
    },
    {
      _id: "68",
      title: "Neural Nexus III",
      releaseDate: "17/02/2030",
    },
    {
      _id: "69",
      title: "Quantum Quandary III",
      releaseDate: "01/04/2030",
    },
    {
      _id: "70",
      title: "Technological Triumph III",
      releaseDate: "13/05/2030",
    },
    {
      _id: "71",
      title: "AI Ascendancy V",
      releaseDate: "25/06/2030",
    },
    {
      _id: "72",
      title: "Robotic Revolution V",
      releaseDate: "07/08/2030",
    },
    {
      _id: "73",
      title: "Future Fables III",
      releaseDate: "19/09/2030",
    },
    {
      _id: "74",
      title: "Cybernetic Convergence III",
      releaseDate: "01/11/2030",
    },
    {
      _id: "75",
      title: "Virtual Versatility III",
      releaseDate: "13/12/2030",
    },
    {
      _id: "76",
      title: "Digital Dominion III",
      releaseDate: "24/01/2031",
    },
    {
      _id: "77",
      title: "Neural Nirvana III",
      releaseDate: "08/03/2031",
    },
    {
      _id: "38",
      title: "Cybernetic Convergence",
      releaseDate: "19/08/2026",
    },
    {
      _id: "39",
      title: "Virtual Versatility",
      releaseDate: "01/10/2026",
    },
    {
      _id: "40",
      title: "Digital Dominion",
      releaseDate: "13/11/2026",
    },
    {
      _id: "41",
      title: "Neural Nirvana",
      releaseDate: "25/12/2026",
    },
    {
      _id: "42",
      title: "Quantum Quest II",
      releaseDate: "05/02/2027",
    },
    {
      _id: "43",
      title: "Techno Triumph II",
      releaseDate: "19/03/2027",
    },
    {
      _id: "44",
      title: "AI Ascendancy II",
      releaseDate: "01/05/2027",
    },
    {
      _id: "45",
      title: "Robotic Revolution II",
      releaseDate: "13/06/2027",
    },
    {
      _id: "46",
      title: "Future Frontiers II",
      releaseDate: "25/07/2027",
    },
    {
      _id: "47",
      title: "Cybernetic Symphony II",
      releaseDate: "06/09/2027",
    },
    {
      _id: "48",
      title: "Virtual Vanguard II",
      releaseDate: "18/10/2027",
    },
    {
      _id: "49",
      title: "Digital Dynasty II",
      releaseDate: "30/11/2027",
    },
    {
      _id: "50",
      title: "Neural Nexus II",
      releaseDate: "12/01/2028",
    },
    {
      _id: "51",
      title: "Quantum Quandary II",
      releaseDate: "24/02/2028",
    },
    {
      _id: "52",
      title: "Technological Triumph II",
      releaseDate: "06/04/2028",
    },
    {
      _id: "53",
      title: "AI Ascendancy III",
      releaseDate: "18/05/2028",
    },
    {
      _id: "54",
      title: "Robotic Revolution III",
      releaseDate: "30/06/2028",
    },
    {
      _id: "55",
      title: "Future Fables II",
      releaseDate: "12/08/2028",
    },
    {
      _id: "56",
      title: "Cybernetic Convergence II",
      releaseDate: "24/09/2028",
    },
    {
      _id: "57",
      title: "Virtual Versatility II",
      releaseDate: "06/11/2028",
    },
    {
      _id: "19",
      title: "Space Odyssey",
      releaseDate: "12/08/2024",
    },
    {
      _id: "20",
      title: "The Last Frontier",
      releaseDate: "05/09/2024",
    },
    {
      _id: "21",
      title: "Virtual Realities",
      releaseDate: "17/10/2024",
    },
    {
      _id: "22",
      title: "Digital Dystopia",
      releaseDate: "29/11/2024",
    },
    {
      _id: "23",
      title: "Neural Network Chronicles",
      releaseDate: "03/12/2024",
    },
    {
      _id: "24",
      title: "Quantum Quest",
      releaseDate: "22/01/2025",
    },
    {
      _id: "25",
      title: "Techno Revolution",
      releaseDate: "14/02/2025",
    },
    {
      _id: "26",
      title: "AI Apocalypse",
      releaseDate: "29/03/2025",
    },
    {
      _id: "27",
      title: "Robotic Resurgence",
      releaseDate: "08/05/2025",
    },
    {
      _id: "28",
      title: "Future Frontiers",
      releaseDate: "20/06/2025",
    },
    {
      _id: "29",
      title: "Cybernetic Symphony",
      releaseDate: "02/08/2025",
    },
    {
      _id: "30",
      title: "Virtual Vanguard",
      releaseDate: "15/09/2025",
    },
    {
      _id: "31",
      title: "Digital Dynasty",
      releaseDate: "27/10/2025",
    },
    {
      _id: "32",
      title: "Neural Nexus",
      releaseDate: "08/12/2025",
    },
    {
      _id: "33",
      title: "Quantum Quandary",
      releaseDate: "20/01/2026",
    },
    {
      _id: "34",
      title: "Technological Triumph",
      releaseDate: "03/03/2026",
    },
    {
      _id: "35",
      title: "AI Ascendancy",
      releaseDate: "15/04/2026",
    },
    {
      _id: "36",
      title: "Robotic Revolution",
      releaseDate: "27/05/2026",
    },
    {
      _id: "37",
      title: "Future Fables",
      releaseDate: "08/07/2026",
    },
    {
      _id: "18",
      title: "Cybernetic Warriors Ch.40",
      releaseDate: "25/06/2024",
    },
    {
      _id: "17",
      title: "Space Odyssey Vol.7",
      releaseDate: "20/06/2024",
    },
    {
      _id: "16",
      title: "Wizard's Chronicle Ch.20",
      releaseDate: "15/06/2024",
    },
    {
      _id: "15",
      title: "Dragon's Blood Vol.4",
      releaseDate: "10/06/2024",
    },
    {
      _id: "14",
      title: "Fantasy Kingdom Ch.5",
      releaseDate: "05/06/2024",
    },
    {
      _id: "13",
      title: "Samurai Saga Vol.2",
      releaseDate: "30/05/2024",
    },
    {
      _id: "12",
      title: "Space Guardians Ch.30",
      releaseDate: "25/05/2024",
    },
    {
      _id: "11",
      title: "Magical Academy Vol.3",
      releaseDate: "20/05/2024",
    },
    {
      _id: "10",
      title: "Ninja Legends Ch.15",
      releaseDate: "15/05/2024",
    },
    {
      _id: "9",
      title: "Dragon's Quest Vol.1",
      releaseDate: "10/05/2024",
    },
    {
      _id: "8",
      title: "Martial Peak Ch.8",
      releaseDate: "03/05/2024",
    },
    {
      _id: "7",
      title: "Martial Peak Ch.7",
      releaseDate: "03/05/2024",
    },
    {
      _id: "6",
      title: "Martial Peak Ch.6",
      releaseDate: "04/05/2024",
    },
    {
      _id: "5",
      title: "Martial Peak Ch.5",
      releaseDate: "05/05/2024",
    },
    {
      _id: "4",
      title: "Martial Peak Ch.4",
      releaseDate: "06/05/2023",
    },
    {
      _id: "3",
      title: "Martial Peak Ch.3",
      releaseDate: "03/05/2023",
    },
    {
      _id: "2",
      title: "Martial Peak Ch.2",
      releaseDate: "02/05/2023",
    },
    {
      _id: "1",
      title: "Martial Peak Ch.1",
      releaseDate: "01/05/2023",
    },
  ],
  totalChapters: 6,
  description: `Martial Peak Manga is a Chinese Manhua series adapted from a novel, set in a fantastical world full of powerful warriors and mystic martial arts. The story follows Yang Kai, a humble youth born into lower society, who unexpectedly discovers the "Nine Yang Divine Technique." This ancient manuscript grants him incredible martial prowess and a chance for a cultivation journey.

  Main Character: Ren Zhi Bai is a character in Martial.Peak Manga. He belongs to the Dawn Squad, under the leadership of Yang Kai, and stands out as one of the most gifted young cultivators in the Blue Sky Pass.`,
  galleryImages: [
    "/dummyContent/mp_poster.jpg",
    "/dummyContent/1.webp",
    "/dummyContent/2.webp",
    "/dummyContent/3.webp",
    "/dummyContent/4.webp",
    "/dummyContent/5.webp",
    "/dummyContent/6.webp",
    "/dummyContent/thumbnail.webp",
  ],
  newsList: [
    {
      title: "Meng Wu Ya Martial Peak",
      link: "/",
      shortDescription:
        "Exploring the Enigmatic Warrior Embark on a thrilling journey into the world of 'Meng Wu Ya: Martial Peak,' where we unravel the mysteries surrounding an enigmatic warrior. In this captivating tale, we delve into the depths of Meng Wu Ya's intricate personality, admire his compelling appearance, witness his awe-inspiring power and abilities, and explore the profound relationships that shape his destiny.",
    },
    {
      title: "Su Yan Martial Peak",
      link: "/",
      shortDescription:
        "Exploring the Enigmatic World of Han Fei Zi Step into the mesmerizing world of 'Han Fei Zi Martial Peak.' In this article, we take a deep dive into the enigmatic character of Han Fei Zi, his unique appearance, his awe-inspiring martial prowess, and the intricate web of relationships that define his journey. Join us as we unravel the secrets of this captivating martial arts epic.",
    },
    {
      title: "Yang Kai Martial Peak",
      link: "/",
      shortDescription:
        "Unleash the Power Within Embark on an epic journey with 'Yang Kai Martial Peak,' a tale that delves into the world of martial arts, power, and self-discovery like never before.",
    },
  ],
  latestUpdates: [
    { title: "One Piece", link: "https://www.mangago.me/read-manga/one_piece" },
    { title: "Naruto", link: "https://www.mangago.me/read-manga/naruto" },
    {
      title: "Attack on Titan",
      link: "https://www.mangago.me/read-manga/attack_on_titan",
    },
    {
      title: "My Hero Academia",
      link: "https://www.mangago.me/read-manga/my_hero_academia",
    },
    {
      title: "Death Note",
      link: "https://www.mangago.me/read-manga/death_note",
    },
    {
      title: "Demon Slayer: Kimetsu no Yaiba",
      link: "https://www.mangago.me/read-manga/demon_slayer_kimetsu_no_yaiba",
    },
    {
      title: "Dragon Ball",
      link: "https://www.mangago.me/read-manga/dragon_ball",
    },
    {
      title: "Fullmetal Alchemist",
      link: "https://www.mangago.me/read-manga/fullmetal_alchemist",
    },
  ],
};

export const metadata: Metadata = {
  title: `${data.title} - MangaToon`,
  description: data.description,
};

const Rating: React.FC<{ rating: number; mobileOnly?: boolean }> = ({
  rating,
  mobileOnly,
}) => {
  return (
    <div
      className={`items-center ${mobileOnly ? "mb-2 flex md:hidden" : "hidden md:flex"}`}
    >
      <span className="text-base font-[700] md:mr-3 md:text-lg md:font-[400] lg:text-[var(--app-text-color-standard-gray)]">
        {rating}
      </span>
      <span className="-mt-[1px] text-sm text-[var(--app-text-color-gray-light)] md:hidden">
          | 
      </span>

      {[...new Array(5)].map((_, index) => {
        const uniqueKey = `star${index}`;
        const effectiveRating = index * 2;
        let StarIcon;

        if (Math.floor(rating) > effectiveRating) StarIcon = StarSolid;
        else if (rating > effectiveRating) StarIcon = HalfStarSolid;
        else StarIcon = Star;

        return (
          <StarIcon
            className="h-[15px] w-[15px] text-[var(--app-text-color-vibrant-golden)] md:h-[18px] md:w-[18px]"
            key={uniqueKey}
          />
        );
      })}
    </div>
  );
};

const TitleBox: React.FC<{ title: string; subTitle: string; href: string }> = ({
  title,
  subTitle,
  href,
}) => {
  return (
    <div className="detail-title-box mx-auto mt-8 max-w-[1200px] md:mb-6 md:mt-12 md:flex md:items-center md:justify-between">
      <Link href="/" className="md:hidden">
        <div className="flex items-center justify-between px-4 text-lg">
          <p className="font-[700] text-[var(--app-text-color-dark-gray)]">
            {title}
          </p>
          <ChevronDown
            className="h-5 w-5 -rotate-90 cursor-pointer text-[var(--app-text-color-medium-gray)]"
            strokeWidth={2.6}
          />
        </div>
      </Link>

      <p className="hidden text-2xl font-[700] text-[var(--app-text-color-dark-gray)] md:block">
        {title}
      </p>

      <Link
        href={href}
        className="hidden items-center gap-[5px] text-[var(--app-text-color-bright-pink)] md:inline-flex"
      >
        <span>{subTitle}</span>
        <ChevronDown className="h-4 w-4 -rotate-90" strokeWidth={2.6} />
      </Link>
    </div>
  );
};

export default function TitlePage(req: {
  params: { title: string };
  searchParams: { content_id: string };
}) {
  if (!req.searchParams.content_id) {
    return notFound();
  }

  return (
    <>
      <div className="breadcrum box-content hidden h-[50px] overflow-hidden pt-2.5 md:block">
        <ul className="mx-auto box-content flex h-[50px] max-w-[1200px] items-center gap-[5px]">
          <li className="hover:text-[var(--app-text-color-bright-pink)]">
            <Link href="/">Home</Link>
          </li>
          <li className="before:text-[var(--app-text-color-medium-gray)] before:content-['_/_'] hover:text-[var(--app-text-color-bright-pink)]">
            <Link href="/">{data.genres[0]}</Link>
          </li>
          <li className="text-[var(--app-text-color-medium-gray)] before:text-[var(--app-text-color-medium-gray)] before:content-['_/_']">
            {data.title}
          </li>
        </ul>
      </div>

      <div className="detail-wrapper overflow-hidden">
        <div className="detail-image relative min-h-[208px] w-full md:py-8 lg:bg-[var(--app-text-color-almost-white)]">
          <Image
            fill
            src={data.poster}
            alt={data.title}
            className="absolute left-0 top-0 h-full w-full object-cover object-center lg:hidden"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-[var(--app-background-overlay-transparent-black)] backdrop-blur-[10px] lg:hidden" />

          <div className="detail-header relative mx-auto flex w-full max-w-[1200px] gap-4 p-[24px_16px] text-xs text-white md:gap-5 md:p-0 lg:text-[var(--app-text-color-dark-gray)]">
            <Image
              src={data.poster}
              alt={data.title}
              width={200}
              height={200}
              className="h-[140px] w-[106px] flex-shrink-0 rounded-lg object-cover md:h-[320px] md:w-[235px]"
            />

            <div className="flex flex-grow flex-col md:justify-between">
              <div className="mb-2 items-center gap-[15px] md:mb-2.5 md:flex">
                <p className="text-lg md:text-2xl md:font-[700]">
                  {data.title}
                </p>

                <div className="hidden items-center gap-1 md:flex">
                  <Calender className="h-[14px] w-[14px]" />
                  <span>{data.status}</span>
                </div>
              </div>

              <div className="mb-2.5 flex items-center gap-1 md:hidden">
                <Calender className="h-[14px] w-[14px]" />
                <span>{data.status}</span>
              </div>

              <Rating rating={data.rating} mobileOnly />

              <div className="mb-1 md:mb-0 md:text-sm/[18px]">
                <p className="line-clamp-1">Author: {data.author}</p>
              </div>

              <p className="line-clamp-1 font-[400] leading-[15px] md:text-sm/[18px]">
                Synonyms: {data.synonyms.join(", ")}
              </p>

              <Description description={data.description} />

              <Rating rating={data.rating} />

              <div className="mt-2.5 flex items-center">
                <Link href="/">
                  <div className="box-content flex h-[30px] max-w-80 items-center justify-center break-words rounded-[20px] bg-[var(--app-text-color-bright-pink)] px-[15px] md:h-[33px] md:px-5 md:py-1.5 md:text-base lg:text-white">
                    Read Latest Chapter{" "}
                    <span className="hidden md:inline">
                      : Chapter {data.totalChapters}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <ChaptersList
          title={data.title}
          reminderText={data.reminderText}
          chapters={data.chapters}
        />

        <div className="detail-description mt-8 px-4 md:hidden">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-lg font-[700] text-[var(--app-text-color-dark-gray)]">
              {data.title} Introduction
            </p>
          </div>

          <Description description={data.description} mobileOnly />
        </div>

        <TitleBox
          title={`${data.title} Images/Wallpapers`}
          subTitle={`${data.galleryImages.length} Pictures`}
          href="/"
        />

        <div className="detail-gallery mx-auto mt-2.5 max-w-[1200px] md:mt-0">
          <div className="hidden-scrollbar mt-2.5 flex overflow-auto pl-4 md:flex-wrap md:overflow-auto md:pl-0">
            {data.galleryImages.map((galleryImage, index) => (
              <Link key={galleryImage} href="/" className="flex-shrink-0">
                <div className="mr-3 w-24 md:mr-5">
                  <Image
                    src={galleryImage}
                    alt={`image${index + 1}`}
                    width={120}
                    height={146}
                    className="h-32 w-full rounded object-cover object-center"
                  />

                  <p className="line-clamp-1 break-words text-center text-[var(--app-text-color-dark-gray)] md:mt-2">
                    {data.title} - Piece {index + 1}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <TitleBox
          title={`${data.title} News`}
          subTitle={`${data.newsList.length} Articles`}
          href="/"
        />

        <div className="mx-auto flex max-w-[1200px] flex-col">
          {data.newsList.map((news) => (
            <Link key={news.title} href={news.link}>
              <div className="mx-4 mt-3 flex items-center gap-1 border-b border-[var(--app-border-color-light-gray)] pb-3 md:hidden">
                <Image
                  src="/assets/internet-searchinformation-icon.png"
                  alt="internet-searchinformation"
                  height={20}
                  width={20}
                  className="h-4 w-4"
                />
                <p className="line-clamp-1 break-words text-[13px] text-[var(--app-text-color-dark-gray)]">
                  {news.title}
                </p>
              </div>

              <div className="hidden border-b border-[var(--app-text-color-pale-silver)] py-3 md:block">
                <div className="mb-2.5 flex items-center gap-2">
                  <Image
                    src="/assets/internet-searchinformation-icon.png"
                    alt="internet-searchinformation"
                    height={20}
                    width={20}
                    className="h-[18px] w-[18px]"
                  />
                  <p className="line-clamp-1 break-words text-left text-lg text-[var(--app-text-color-dark-gray)]">
                    {news.title}
                  </p>
                </div>

                <p className="line-clamp-2 break-words text-sm font-[300] text-[var(--app-text-color-dim-gray)]">
                  {news.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <TitleBox title="Latest Updates" subTitle="More Updates" href="/" />

        <div className="details-latest-updates mx-auto flex min-h-[144px] max-w-[1200px] flex-wrap justify-between overflow-hidden px-4 md:justify-start md:px-0">
          {data.latestUpdates.map((latestUpdate) => (
            <React.Fragment key={latestUpdate.title}>
              <Link
                key={latestUpdate.title}
                href={latestUpdate.link}
                className="mt-3 line-clamp-1 w-[48%] break-words text-[13px] font-[400] text-[var(--app-text-color-dark-gray)] md:hidden"
              >
                <p>{latestUpdate.title}</p>
              </Link>

              <Link href={latestUpdate.link}>
                <div className="mb-5 mr-6 box-content hidden h-[50px] items-center border border-[var(--app-border-color-light-gray)] px-4 font-[400] text-[var(--app-text-color-dim-gray)] md:flex">
                  {latestUpdate.title}
                </div>
              </Link>
            </React.Fragment>
          ))}
        </div>

        <Link
          href="/"
          className="mb-[30px] mt-8 flex items-center justify-center text-[var(--app-text-color-medium-gray)]"
        >
          <p className="mr-2 text-xs font-[400] underline">
            Have problems with reading?
          </p>
          <InformationCircle className="h-[13px] w-[13px]" strokeWidth={2.6} />
        </Link>
      </div>
    </>
  );
}
