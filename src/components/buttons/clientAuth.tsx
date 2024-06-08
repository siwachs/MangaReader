"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { signIn, useSession, signOut } from "next-auth/react";

import useOutsideClick from "@/hooks/useOutsideClick";
import { roboto } from "@/libs/fonts";
import { Close, SignOut } from "../icons";

const ClientAuth: React.FC<{
  profileMenuPositionClasses?: string;
  authProvider?: string;
  profileContainerClasses?: string;
  signInButtonClasses?: string;
}> = ({
  profileMenuPositionClasses = "right-2.5 top-10",
  authProvider = "google",
  profileContainerClasses,
  signInButtonClasses,
}) => {
  const profileContainerRef = useRef<HTMLDivElement>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const currentUrl = usePathname();
  const session = useSession();
  const { status, data } = session;

  useOutsideClick(profileContainerRef, isProfileMenuOpen, () =>
    setIsProfileMenuOpen(false),
  );

  if (status === "unauthenticated")
    return (
      <button
        className={signInButtonClasses}
        onClick={() => signIn(authProvider, { callbackUrl: currentUrl })}
      >
        Sign In
      </button>
    );

  if (status === "loading")
    return (
      <div className={profileContainerClasses}>
        <div className="h-full w-full animate-pulse rounded-full bg-gray-400" />
      </div>
    );

  if (status === "authenticated") {
    const { user } = data;

    return (
      <div className={profileContainerClasses} ref={profileContainerRef}>
        <div className={roboto.className}>
          <Image
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            src={user.avatar ?? "/assets/person.png"}
            alt={user.name ?? "user-avatar"}
            width={56}
            height={56}
            className="h-full w-full cursor-pointer rounded-full object-cover object-center"
          />

          <div
            className={`absolute ${profileMenuPositionClasses} z-50 w-full max-w-[360px] ${isProfileMenuOpen ? "block" : "hidden"} rounded-2xl border bg-white`}
          >
            <div className="relative mx-auto mt-[18px] h-[22px] max-w-[calc(100%-64px)] text-center text-sm font-medium tracking-normal">
              {user.email}
              <Close
                className="absolute -top-0.5 right-0 inline-block size-6 cursor-pointer"
                onClick={() => setIsProfileMenuOpen(false)}
              />
            </div>

            <div className="relative mx-auto mt-[22px] h-20 w-20">
              <Image
                src={user.avatar ?? "/assests/person.png"}
                alt={user.name ?? "user-avatar"}
                width={90}
                height={90}
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <div className="my-2 text-center text-[1.375rem]/[1.75rem] font-normal tracking-normal">
              Hi!, {user.name?.split(" ")[0]}!
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
                className="mr-0.5 flex h-10 w-[calc(50%-2px)] items-center justify-center rounded-l-[30px] rounded-r border border-[var(--app-border-color-medium-dark-gray)] px-[15px]"
              >
                <div className="text-sm font-medium tracking-normal text-[var(--app-text-color-dark-gray)]">
                  Subscriptions
                </div>
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: currentUrl })}
                className="flex h-10 w-[calc(50%-2px)] items-center justify-center rounded-l rounded-r-[30px] border border-[var(--app-border-color-medium-dark-gray)] px-[15px]"
              >
                <div className="flex items-center gap-2 text-sm font-medium tracking-normal text-[var(--app-text-color-dark-gray)]">
                  <SignOut className="size-[22px] -scale-x-100" />
                  <span>Sign Out</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ClientAuth;
