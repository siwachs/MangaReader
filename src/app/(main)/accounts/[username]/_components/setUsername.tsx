import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import useDebounce from "@/hooks/useDebounce";

import { makeGetRequest, makePostPutRequest } from "@/service/asyncApiCalls";

import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";

const checkUsenameEndpoint = process.env
  .NEXT_PUBLIC_API_ENDPOINT_CHECK_USERNAME as string;
const claimUsernameEndpoint = process.env
  .NEXT_PUBLIC_API_ENDPOINT_CLAIM_USERNAME as string;

const initialUsernameQuery: {
  loading: boolean;
  usernameAvailable: null | boolean;
  error: null | string;
} = {
  loading: false,
  usernameAvailable: null,
  error: null,
};
const debouncedUsernameQueryDelay = 300;

const SetUsername: React.FC<{
  initialUsername: string;
  userId: string;
}> = ({ initialUsername, userId }) => {
  const router = useRouter();
  const session = useSession();
  const { data, update } = session;

  const [username, setUsername] = useState(initialUsername);
  const [usernameQuery, setUsernameQuery] = useState(initialUsernameQuery);

  useDebounce(
    async () => {
      if (username.trim() === "" || username === data?.user?.username) return;
      const requestResponse = await makeGetRequest(
        `${checkUsenameEndpoint}/${username}`,
        undefined,
        () => {
          setUsernameQuery((prev) => ({ ...prev, loading: false }));
        },
      );

      const { error, errorMessage, usernameAvailable } = requestResponse;
      if (error)
        return setUsernameQuery((prev) => ({
          ...prev,
          error: errorMessage,
        }));

      setUsernameQuery((prev) => ({
        ...prev,
        error: null,
        usernameAvailable,
      }));
    },
    [username],
    debouncedUsernameQueryDelay,
  );

  const claimThisUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === "")
      return setUsernameQuery({
        loading: false,
        error: "You haven't enter your username",
        usernameAvailable: null,
      });
    if (usernameQuery.loading || !usernameQuery.usernameAvailable) return;

    setUsernameQuery({ ...initialUsernameQuery, loading: true });
    const requestResponse = await makePostPutRequest(
      claimUsernameEndpoint,
      "PUT",
      { userId: session.data?.user.id, username },
    );

    const { error, errorMessage, claimedUsername } = requestResponse;
    if (error)
      return setUsernameQuery({
        loading: false,
        usernameAvailable: false,
        error: errorMessage,
      });

    update({ username: claimedUsername });
    router.push(`/accounts/${claimedUsername}`);
  };

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedUsername = e.target.value.trim();

    setUsername(trimmedUsername);
    setUsernameQuery({
      error: null,
      usernameAvailable: null,
      loading:
        trimmedUsername.length > 0 && trimmedUsername !== data?.user.username,
    });
  };

  const disableButton =
    username === data?.user.username || usernameQuery.loading;

  return (
    <form
      onSubmit={claimThisUsername}
      className="soft-edge-shadow mx-auto mt-8 grid w-[90%] max-w-[690px] place-items-center gap-3.5 overflow-hidden rounded-lg p-5 text-sm md:mt-36 md:text-base"
    >
      <h3 className="select-none font-bold">Set Username</h3>
      <div className="w-full">
        <div
          className={`flex items-center rounded-lg border bg-[var(--app-text-color-very-light-gray)] ${usernameQuery.error ? "border-red-500" : "border-transparent"}`}
        >
          <input
            value={username}
            onChange={changeUsername}
            type="text"
            autoComplete="on"
            autoFocus
            className="flex-1 bg-transparent p-2.5 outline-none"
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
          className={`my-1.5 h-5 text-xs font-bold text-red-500 ${usernameQuery.error ? "" : "opacity-0"}`}
        >
          {usernameQuery.error}
        </p>
      </div>

      <button
        disabled={disableButton}
        type="submit"
        className="inline-block h-10 rounded-[20px] bg-[var(--app-text-color-red)] px-6 text-white hover:bg-red-500"
      >
        Confirm
      </button>
    </form>
  );
};

export default SetUsername;
