"use client";

import { useState, useRef } from "react";
import Link from "next/link";

import useOutsideClick from "@/hooks/useOutsideClick";

import { FaCaretDown } from "react-icons/fa";

const languages = [
  { name: "English", href: "/en", dataLink: "/en", dataLanguageCode: "en" },
  { name: "Indonesia", href: "/id", dataLink: "/id", dataLanguageCode: "id" },
  { name: "Español", href: "/es", dataLink: "/es", dataLanguageCode: "es" },
  { name: "Português", href: "/pt", dataLink: "/pt", dataLanguageCode: "pt" },
  { name: "ไทย", href: "/th", dataLink: "/th", dataLanguageCode: "th" },
];

const LanguagePicker: React.FC = () => {
  const languagesContainerRef = useRef<HTMLDivElement>(null);
  const [isLanguagePickerOpen, setIsLanguagePickerOpen] = useState(false);

  useOutsideClick(languagesContainerRef, isLanguagePickerOpen, () =>
    setIsLanguagePickerOpen(false),
  );

  const toggleLanguagePicker = () => setIsLanguagePickerOpen((prev) => !prev);

  return (
    <div
      className="absolute right-5 top-0.5 md:relative md:right-0 md:top-0"
      ref={languagesContainerRef}
    >
      <button
        aria-expanded={isLanguagePickerOpen}
        aria-controls="languages-list"
        aria-haspopup="true"
        className="flex items-center gap-1 text-xs md:text-sm"
        onClick={toggleLanguagePicker}
      >
        <span>English</span>
        <FaCaretDown className="size-[18px] text-gray-500/70" />
      </button>

      <div
        id="languages-list"
        className={`absolute -right-5 top-[30px] z-10 ${isLanguagePickerOpen ? "block" : "hidden"} w-[120px] rounded-xl border border-[var(--app-border-color-gray)] bg-white py-2.5 text-xs md:left-1/2 md:right-0 md:w-[150px] md:-translate-x-1/2 md:rounded-[10px] md:text-sm`}
      >
        {languages.map((language) => (
          <Link
            key={language.name}
            href={language.href}
            data-link={language.dataLink}
            data-language-code={language.dataLanguageCode}
            className={`inline-block h-7 w-full px-4 py-1 ${language.name === "English" && "bg-gray-100"}`}
          >
            <span className="ml-2.5 text-sm">{language.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LanguagePicker;
