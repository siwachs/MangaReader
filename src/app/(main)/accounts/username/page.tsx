"use client";

import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

import HomeNav from "@/components/navigations/homeNav";

export default function CreateUsernamePage() {
  const currentUrl = usePathname();
  const session = useSession();
  const { status, data } = session;

  const claimThisUsername = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (status === "unauthenticated")
    return signIn("google", { callbackUrl: currentUrl });

  return (
    <>
      <HomeNav />

      <form
        onSubmit={claimThisUsername}
        className="soft-edge-shadow mx-auto mt-8 grid w-[90%] max-w-[690px] place-items-center gap-3.5 rounded-lg p-5 text-sm md:mt-36 md:text-base"
      >
        <h3 className="select-none font-bold">Set Username</h3>
        <input
          type="text"
          autoComplete="on"
          autoFocus
          className="w-full rounded-lg bg-[var(--app-text-color-very-light-gray)] p-2.5 outline-none"
        />
        <button
          type="submit"
          className="inline-block h-10 rounded-[20px] bg-[var(--app-text-color-red)] px-6 text-white hover:bg-red-500"
        >
          Confirm
        </button>
      </form>
    </>
  );
}
