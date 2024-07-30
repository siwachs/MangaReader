"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import useDebounce from "@/hooks/useDebounce";

import HomeNav from "@/components/navigations/homeNav";

import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";

const checkUsenameEndpoint = process.env
  .NEXT_PUBLIC_API_ENDPOINT_CHECK_USERNAME as string;

const initialUsernameQuery = {
  loading: false,
  usernameAvailable: null,
};

export default function CreateUsernamePage() {
  const currentUrl = usePathname();
  const session = useSession();
  const { status, data } = session;

  const [username, setUsername] = useState(data?.user.username ?? "");
  const [usernameQuery, setUsernameQuery] = useState(initialUsernameQuery);
  const [error, setError] = useState<null | string>(null);

  useDebounce(
    async () => {
      try {
        if (username.trim() === "" || username === data?.user.username) return;
        const requestResponse = await fetch(
          `${checkUsenameEndpoint}/${username}`,
        );

        const requestResponseParsed = await requestResponse.json();
        const { error, errorMessage, usernameAvailable } =
          requestResponseParsed;
        if (error) return setError(errorMessage);

        setUsernameQuery((prev) => ({ ...prev, usernameAvailable }));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setUsernameQuery((prev) => ({ ...prev, loading: false }));
      }
    },
    [username],
    300,
  );

  const claimThisUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === "")
      return setError("You haven't enter your username");
  };

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.trim());
    setUsernameQuery((prev) => ({ ...prev, loading: true }));
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
        <div className="w-full">
          <div
            className={`flex items-center rounded-lg border bg-[var(--app-text-color-very-light-gray)] ${error ? "border-red-500" : "border-transparent"}`}
          >
            <input
              value={username}
              onChange={changeUsername}
              type="text"
              autoComplete="on"
              autoFocus
              className={`flex-1 bg-transparent p-2.5 outline-none`}
            />

            {usernameQuery.usernameAvailable !== null && (
              <>
                {usernameQuery.usernameAvailable && (
                  <IoCheckmarkCircle className="mr-2 size-6 text-green-500" />
                )}
                {!usernameQuery.usernameAvailable && (
                  <IoCloseCircle className="mr-2 size-6 text-red-500" />
                )}
              </>
            )}
            {usernameQuery.loading && (
              <AiOutlineLoading className="mr-2 size-6 animate-spin" />
            )}
          </div>

          <p
            className={`my-1.5 h-5 text-xs font-bold text-red-500 ${error ? "" : "opacity-0"}`}
          >
            {error}
          </p>
        </div>

        <button
          disabled={username === data?.user.username}
          type="submit"
          className="inline-block h-10 rounded-[20px] bg-[var(--app-text-color-red)] px-6 text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-[var(--app-text-color-very-light-gray)] disabled:text-black"
        >
          Confirm
        </button>
      </form>
    </>
  );
}
