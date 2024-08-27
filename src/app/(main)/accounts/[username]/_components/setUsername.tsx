import { useState, useRef, Dispatch, SetStateAction, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useDebounce from "@/hooks/useDebounce";
import useOutsideClick from "@/hooks/useOutsideClick";

import { makeGetRequest, makePostPutRequest } from "@/service/asyncApiCalls";
import ModelOverlay from "@/components/utils/modelOverlay";

import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";

import { DEBOUNCED_DELAY } from "@/constants";
import {
  checkUsenameEndpoint,
  claimUsernameEndpoint,
} from "@/constants/apiEndpoints";

const initialUsernameQuery: {
  loading: boolean;
  usernameAvailable: null | boolean;
  error: null | string;
} = {
  loading: false,
  usernameAvailable: null,
  error: null,
};

const SetUsername: React.FC<{
  isSetUsernameOpen: boolean;
  setIsSetUsernameOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isSetUsernameOpen, setIsSetUsernameOpen }) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const session = useSession();
  const { data, update } = session;

  const [username, setUsername] = useState(data?.user.username ?? "");
  const [usernameQuery, setUsernameQuery] = useState(initialUsernameQuery);

  useOutsideClick(formRef, isSetUsernameOpen, () => {
    setIsSetUsernameOpen(false);
  });

  const checkUsernameAvailability = useCallback(async (username: string) => {
    if (username === "" || username === data?.user?.username) return;

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
  }, []);

  useDebounce(
    () => checkUsernameAvailability(username),
    [username],
    DEBOUNCED_DELAY,
  );

  const claimThisUsername = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedUsername = username.trim();
    if (trimmedUsername === "")
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

    setIsSetUsernameOpen(false);
    update({ username: claimedUsername });
    router.replace(`/accounts/${claimedUsername}`);
  };

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <ModelOverlay>
      <form
        ref={formRef}
        onSubmit={claimThisUsername}
        className="soft-edge-shadow mx-auto mt-[92px] grid w-[90%] max-w-[690px] place-items-center gap-3.5 overflow-hidden rounded-lg bg-white p-5 text-sm md:mt-36 md:text-base"
      >
        <h3 className="select-none font-bold">Set Username</h3>

        <div className="w-full">
          <div
            className={`flex items-center rounded-lg border bg-gray-100 ${usernameQuery.error ? "border-red-500" : "border-transparent"}`}
          >
            <input
              value={username}
              onChange={onChangeUsername}
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
            className={`my-1.5 h-5 text-[11px] font-bold text-red-500 md:text-[13px] lg:text-sm ${usernameQuery.error ? "opacity-100" : "opacity-0"}`}
          >
            {usernameQuery.error}
          </p>
        </div>

        <div className="flex w-full items-center justify-center gap-5 md:gap-6">
          <button
            type="button"
            onClick={() => setIsSetUsernameOpen(false)}
            aria-label="Cancel"
            className="inline-block h-[42px] rounded-[20px] bg-gray-100 px-9 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            disabled={disableButton}
            type="submit"
            aria-label="Setusername"
            className="inline-block h-[42px] rounded-[20px] bg-[var(--app-text-color-red)] px-9 text-white hover:bg-red-500 disabled:hover:bg-[var(--app-text-color-red)]"
          >
            Confirm
          </button>
        </div>
      </form>
    </ModelOverlay>
  );
};

export default SetUsername;
