"use client";

import { useState } from "react";
import Link from "next/link";

import { ChevronDown } from "../icons";

const languages = [
  { name: "English", href: "/en", dataLink: "/en", dataLanguageCode: "en" },
  { name: "Indonesia", href: "/id", dataLink: "/id", dataLanguageCode: "id" },
  { name: "Español", href: "/es", dataLink: "/es", dataLanguageCode: "es" },
  { name: "Português", href: "/pt", dataLink: "/pt", dataLanguageCode: "pt" },
  { name: "ไทย", href: "/th", dataLink: "/th", dataLanguageCode: "th" },
];

const LanguagePicker: React.FC = () => {
  const [languagePickerOpen, setLanguagePickerOpen] = useState<boolean>(false);

  return (
    <div className="absolute right-5 top-0.5 md:relative md:right-0 md:top-0">
      <button
        className="flex cursor-pointer select-none items-center gap-1 text-xs text-[var(--app-text-color-dark-gray)] md:text-sm"
        onClick={() => setLanguagePickerOpen((prev) => !prev)}
      >
        <span>English</span>
        <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
      </button>

      <div
        id="languages-list"
        className={`absolute -right-5 top-[30px] z-10 ${languagePickerOpen ? "block" : "hidden"} w-[120px] rounded-xl border border-[var(--app-border-color-gray)] bg-white py-2.5 text-xs md:left-1/2 md:right-0 md:w-[150px] md:-translate-x-1/2 md:rounded-[10px] md:text-sm`}
      >
        {languages.map((language) => (
          <Link
            key={language.name}
            href={language.href}
            data-link={language.dataLink}
            data-language-code={language.dataLanguageCode}
            className={`inline-block h-7 w-full px-4 py-1 ${language.name === "English" && "bg-gray-100"}`}
          >
            <span className="ml-2.5 text-sm text-[var(--app-text-color-dark-gray)]">
              {language.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LanguagePicker;
