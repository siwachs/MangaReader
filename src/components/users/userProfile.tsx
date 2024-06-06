"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

import { roboto } from "@/lib/fonts";
import { Close, SignOut } from "../icons";

const UserProfile: React.FC<{
  profileMenuPositionClasses: string;
  width?: number;
  height?: number;
  callbackUrl?: string;
}> = ({
  profileMenuPositionClasses,
  width = 40,
  height = 40,
  callbackUrl = "/",
}) => {
  const { status, data } = useSession();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(true);

  return status === "loading" ? (
    <div className="h-full w-full animate-pulse rounded-full bg-gray-400" />
  ) : (
    <div className={roboto.className}>
      <Image
        onClick={() => setIsProfileMenuOpen((prev) => !prev)}
        src={data?.user.avatar ?? "/assets/person.png"}
        alt={data?.user.name ?? "user-profile"}
        width={width}
        height={height}
        className="h-full w-full cursor-pointer rounded-full object-cover object-center"
      />

      <div
        className={`absolute ${profileMenuPositionClasses} z-50 w-full max-w-[360px] ${isProfileMenuOpen ? "block" : "hidden"} rounded-2xl border bg-white`}
      >
        <div className="relative mx-auto mt-[18px] h-[22px] max-w-[calc(100%-64px)] text-center text-sm font-medium tracking-normal">
          {data?.user.email}
          <Close
            className="absolute -top-0.5 right-0 inline-block size-6 cursor-pointer"
            onClick={() => setIsProfileMenuOpen(false)}
          />
        </div>

        <div className="relative mx-auto mt-[22px] h-20 w-20">
          <Image
            src={data?.user.avatar ?? "/assests/person.png"}
            alt={data?.user.name ?? "user-name"}
            width={90}
            height={90}
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <div className="my-2 text-center text-[1.375rem]/[1.75rem] font-normal tracking-normal">
          Hi!, {data?.user.name?.split(" ")[0]}!
        </div>

        <div className="mx-auto mb-4 mt-0.5 max-w-[326px] rounded">
          <Link
            href=""
            className="inline-block w-full rounded-[100px] border border-[var(--app-border-color-medium-dark-gray)] px-[23px] py-[9px]"
          >
            <div className="text-center text-sm font-medium tracking-normal text-[var(--app-text-color-medium-dark-blue)]">
              Manage your Account
            </div>
          </Link>
        </div>

        <div className="mx-auto mb-4 mt-3 flex max-w-[326px] rounded-[30px]">
          <Link
            href=""
            className="mr-0.5 flex h-[60px] w-[calc(50%-2px)] items-center justify-center rounded-l-[30px] rounded-r border border-[var(--app-border-color-medium-dark-gray)] px-[15px]"
          >
            <div className="text-sm font-medium tracking-normal text-[var(--app-text-color-dark-gray)]">
              Subscriptions
            </div>
          </Link>

          <button
            onClick={() => signOut({ callbackUrl })}
            className="flex h-[60px] w-[calc(50%-2px)] items-center justify-center rounded-l rounded-r-[30px] border border-[var(--app-border-color-medium-dark-gray)] px-[15px]"
          >
            <div className="flex items-center gap-2 text-sm font-medium tracking-normal text-[var(--app-text-color-dark-gray)]">
              <SignOut className="size-[22px] -scale-x-100" />
              <span>Sign Out</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
