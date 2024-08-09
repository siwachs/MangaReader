import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import useOutsideClick from "@/hooks/useOutsideClick";

import { makePostPutRequest } from "@/service/asyncApiCalls";
import ModelOverlay from "@/components/utils/modelOverlay";

import { FaCheck } from "react-icons/fa6";

const updateProfileEndpoint = process.env
  .NEXT_PUBLIC_API_ENDPOINT_ACCOUNTS as string;
const selectButtonClasses =
  "flex h-14 w-full items-center justify-between border-b border-[var(--app-border-color-light-gray)] p-4 text-base font-bold";

const SetGender: React.FC<{
  isSetGenderOpen: boolean;
  setIsSetGenderOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isSetGenderOpen, setIsSetGenderOpen }) => {
  const genderMenuRef = useRef<HTMLDivElement>(null);

  const session = useSession();
  const { data, update } = session;

  const [gender, setGender] = useState<"Male" | "Female" | undefined>(
    data?.user?.gender,
  );

  useOutsideClick(genderMenuRef, isSetGenderOpen, () =>
    setIsSetGenderOpen(false),
  );

  const updateGender = async () => {
    setIsSetGenderOpen(false);
    await makePostPutRequest(
      `${updateProfileEndpoint}/${data?.user.id}`,
      "PUT",
      { gender },
      () => {
        update({ gender });
      },
    );
  };

  return (
    <ModelOverlay>
      <div
        ref={genderMenuRef}
        className="fixed bottom-0 left-0 right-0 z-[9999] mx-auto flex h-72 max-w-[690px] flex-col items-center rounded-t-2xl bg-[var(--app-bg-color-primary)]"
      >
        <button
          className={selectButtonClasses}
          onClick={() => setGender("Male")}
        >
          Male
          {gender === "Male" && (
            <FaCheck className="inline-block text-[var(--app-text-color-bright-pink)]" />
          )}
        </button>

        <button
          className={selectButtonClasses}
          onClick={() => setGender("Female")}
        >
          Female
          {gender === "Female" && (
            <FaCheck className="inline-block text-[var(--app-text-color-bright-pink)]" />
          )}
        </button>

        <button
          disabled={gender === data?.user?.gender}
          onClick={updateGender}
          className="mt-20 inline-block h-[42px] w-28 rounded-[20px] bg-[var(--app-text-color-red)] text-white hover:bg-red-500 disabled:bg-gray-600 disabled:hover:bg-gray-600"
        >
          Confirm
        </button>
      </div>
    </ModelOverlay>
  );
};

export default SetGender;
