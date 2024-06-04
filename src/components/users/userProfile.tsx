"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { LinkObject } from "@/types";

const profileMenuLinks: LinkObject[] = [
  { key: "mangageaccount", label: "Manage your account", link: "" },
  { key: "subscriptions", label: "Subscriptions", link: "" },
  { key: "likedchapters", label: "Liked Chapters", link: "" },
  { key: "signout", label: "Sign Out", link: "/api/auth/signout" },
];

const UserProfile: React.FC<{
  profileMenuPositionTop: number;
  profileMenuPositionRight: number;
  status: "loading" | "authenticated" | "unauthenticated";
  avatarUrl: string | null | undefined;
  profileName: string | undefined | null;
  width?: number;
  height?: number;
  callbackUrl?: string;
}> = ({
  profileMenuPositionRight,
  profileMenuPositionTop,
  status,
  avatarUrl,
  profileName,
  width = 40,
  height = 40,
  callbackUrl = "/",
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(true);

  return status === "loading" ? (
    <div className="h-full w-full animate-pulse rounded-full bg-gray-400" />
  ) : (
    <div>
      <Image
        onClick={() => setIsProfileMenuOpen((prev) => !prev)}
        src={avatarUrl ?? "/assets/person.png"}
        alt={profileName ?? "user-profile"}
        width={width}
        height={height}
        className="h-full w-full cursor-pointer rounded-full object-cover object-center"
      />

      <div
        className={`absolute right-[${profileMenuPositionRight.toString()}px] top-[${profileMenuPositionTop.toString()}px] z-50 w-[190px] ${isProfileMenuOpen ? "block" : "hidden"} rounded-xl border bg-white p-2.5 md:rounded-[10px]`}
      >
        {profileMenuLinks.map((profileMenuLink) => (
          <Link
            key={profileMenuLink.key}
            href={
              profileMenuLink.key === "signout"
                ? `${profileMenuLink.link}?callbackurl=${callbackUrl}`
                : profileMenuLink.link
            }
            className="inline-block h-7 w-full px-4 py-1"
          >
            <span className="text-sm font-normal text-[var(--app-text-color-dark-slate)]">
              {profileMenuLink.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
