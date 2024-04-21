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
  const [languagePickerOpen, setLanguagePickerOpen] = useState(false);

  return (
    <div className="absolute right-5 top-0.5 lg:relative lg:right-0 lg:top-0">
      <div
        className="flex cursor-pointer select-none items-center gap-1 text-xs text-[var(--app-text-color-dark-gray)] lg:text-sm"
        onClick={() => setLanguagePickerOpen((prev) => !prev)}
      >
        <span>English</span>
        <ChevronDown className="h-4 w-4 lg:h-5 lg:w-5" />
      </div>

      <div
        id="languages-list"
        className={`absolute -right-5 top-[30px] z-10 ${languagePickerOpen ? "block" : "hidden"} w-[120px] rounded-xl border border-[var(--app-border-color-gray)] bg-white py-2.5 text-xs lg:left-1/2 lg:right-0 lg:w-[150px] lg:-translate-x-1/2 lg:rounded-[10px] lg:text-sm`}
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
