"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  signIn,
  useSession,
  signOut as nextAuthSignOut,
} from "next-auth/react";

import getKeydownEvent from "@/libs/eventHandlers/getKeydownEvent";
import useOutsideClick from "@/hooks/useOutsideClick";
import { roboto } from "@/libs/fonts";

import { LiaTimesSolid } from "react-icons/lia";
import { MdExitToApp } from "react-icons/md";

export const LoadingSkeleton: React.FC<{ profileContainerClasses: string }> = ({
  profileContainerClasses,
}) => {
  return (
    <div role="status" aria-live="polite" className={profileContainerClasses}>
      <div
        aria-busy="true"
        className="h-full w-full animate-pulse rounded-full bg-gray-400"
      >
        <span className="sr-only">Loading profile...</span>
      </div>
    </div>
  );
};

const ClientAuth: React.FC<{
  profileMenuPositionClasses?: string;
  authProvider?: string;
  profileContainerClasses?: string;
  signInButtonClasses?: string;
  signInButtonComponent?: React.ReactNode;
}> = ({
  profileMenuPositionClasses = "right-2.5 top-10",
  authProvider = "google",
  profileContainerClasses = "relative",
  signInButtonClasses,
  signInButtonComponent,
}) => {
  const profileContainerRef = useRef<HTMLDivElement>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const url = usePathname();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const queryParamsString = new URLSearchParams(params).toString();
  const currentUrl = `${url}?${queryParamsString}`;

  const session = useSession();
  const { status, data } = session;

  const toogleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);
  const toogleProfileMenuKeydown = getKeydownEvent(toogleProfileMenu);
  const signOut = () => {
    toogleProfileMenu();
    nextAuthSignOut({ callbackUrl: "/" });
  };

  useOutsideClick(profileContainerRef, isProfileMenuOpen, toogleProfileMenu);

  if (status === "loading")
    return (
      <LoadingSkeleton profileContainerClasses={profileContainerClasses} />
    );

  if (status === "unauthenticated")
    return (
      <button
        className={signInButtonClasses}
        onClick={() => signIn(authProvider, { callbackUrl: currentUrl })}
      >
        {signInButtonComponent ?? "Sign In"}
      </button>
    );

  if (status === "authenticated") {
    const { user } = data;
    const { avatar, name, email, username } = user;

    return (
      <div className={profileContainerClasses} ref={profileContainerRef}>
        <div className={roboto.className}>
          <Image
            tabIndex={0}
            role="button"
            onKeyDown={toogleProfileMenuKeydown}
            aria-expanded={isProfileMenuOpen}
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={toogleProfileMenu}
            src={avatar ?? "/assets/person.png"}
            alt={name ?? "user-avatar"}
            width={56}
            height={56}
            className="h-full w-full cursor-pointer rounded-full object-cover object-center"
          />

          <div
            id="profile-menu"
            className={`absolute ${profileMenuPositionClasses} z-50 w-full min-w-[360px] max-w-[360px] ${isProfileMenuOpen ? "block" : "hidden"} rounded-2xl border bg-[var(--app-bg-color-primary)]`}
          >
            <div className="relative mx-auto mt-[18px] h-[22px] max-w-[calc(100%-64px)] text-center text-sm font-medium tracking-normal">
              {email}

              <LiaTimesSolid
                tabIndex={0}
                role="button"
                aria-label="Close Profile Menu"
                className="absolute -top-0.5 right-0 inline-block size-6 cursor-pointer"
                onClick={() => setIsProfileMenuOpen(false)}
              />
            </div>

            <div className="relative mx-auto mt-[22px] h-20 w-20">
              <Image
                src={avatar ?? "/assests/person.png"}
                alt={name ?? "user-avatar"}
                width={82}
                height={82}
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <div className="my-2 text-center text-[1.375rem]/[1.75rem] font-normal tracking-normal">
              Hi!, {name?.split(" ")[0]}
            </div>

            <div className="mx-auto mb-4 mt-0.5 max-w-[326px] rounded">
              <Link
                onClick={toogleProfileMenu}
                href={`/accounts/${username}`}
                className="inline-block w-full rounded-[100px] border border-[var(--app-border-color-medium-dark-gray)] px-[23px] py-[9px]"
              >
                <div className="text-center text-sm font-medium tracking-normal text-[var(--app-text-color-medium-dark-blue)]">
                  Manage your Account
                </div>
              </Link>
            </div>

            <div className="mx-auto mb-4 mt-3 flex max-w-[326px] rounded-[30px]">
              <Link
                onClick={toogleProfileMenu}
                href={`/accounts/${username}/bookmarks`}
                className="mr-0.5 flex h-10 w-[calc(50%-2px)] items-center justify-center rounded-l-[30px] rounded-r border border-[var(--app-border-color-medium-dark-gray)] px-[15px]"
              >
                <div className="text-sm font-medium tracking-normal text-[var(--app-text-color-dark-gray)]">
                  Subscriptions
                </div>
              </Link>

              <button
                onClick={signOut}
                className="flex h-10 w-[calc(50%-2px)] items-center justify-center rounded-l rounded-r-[30px] border border-[var(--app-border-color-medium-dark-gray)] px-[15px]"
              >
                <div className="flex items-center gap-2 text-sm font-medium tracking-normal text-[var(--app-text-color-dark-gray)]">
                  <MdExitToApp className="size-[22px]" />
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
