"use client";

import { useFormState } from "react-dom";
import createOrUpdateContent from "@/actions/createOrUpdateContent";

import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

import LoadingOverlay from "@/components/utils/loadingOverlay";

import { FaChevronDown, FaFileArrowUp } from "react-icons/fa6";

const formButtonClasses =
  "flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-md transition duration-200 ease-in-out hover:bg-blue-700";
const formLabelClasses = "mb-2 block select-none font-bold text-gray-700";
const formInputTypeTextClasses =
  "w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow outline-none";

const statusOptions = [
  "Ongoing",
  "Discontinued",
  "Abandoned",
  "Unscheduled",
  "Completed",
];

export default function ContentPage() {
  // @ts-ignore
  const [state, formAction] = useFormState(createOrUpdateContent, {
    error: false,
    errorMessage: undefined,
  });

  const session = useSession();
  const currentUrl = usePathname();
  const { status, data } = session;

  if (status === "loading") return <LoadingOverlay />;

  if (status === "authenticated" && data.user.isAdmin)
    return (
      <form
        action={formAction}
        encType="multipart/form-data"
        className="soft-edge-shadow mx-auto mt-[92px] flex w-[90%] max-w-[690px] flex-col gap-3.5 overflow-hidden rounded-lg bg-white p-5 text-sm md:mt-36 md:text-base"
      >
        <label
          htmlFor="thumbnail"
          className="flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-md transition duration-200 ease-in-out hover:bg-blue-700"
        >
          <FaFileArrowUp className="size-4" />
          <span>Pick Thumbnails</span>
          <input
            id="thumbnail"
            name="thumbnail"
            type="file"
            accept="image/*"
            className="sr-only"
            aria-label="Pick thumbnails"
            aria-required
            multiple
            required
          />
        </label>

        <label htmlFor="poster" className={formButtonClasses}>
          <FaFileArrowUp className="size-4" />
          <span>Pick Posters</span>
          <input
            id="poster"
            name="poster"
            type="file"
            accept="image/*"
            className="sr-only"
            aria-label="Pick posters"
            aria-required
            multiple
            required
          />
        </label>

        <div>
          <label
            className="mb-2 block select-none font-bold text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            aria-required
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="status" className={formLabelClasses}>
            Status
          </label>

          <select
            id="status"
            name="status"
            className="w-full rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow focus:border-gray-500 focus:outline-none"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={formLabelClasses} htmlFor="author">
            Author
          </label>
          <input
            id="author"
            type="text"
            name="author"
            className={formInputTypeTextClasses}
            aria-required
            required
          />
        </div>

        <div>
          <label className={formLabelClasses} htmlFor="synonyms">
            Synonyms
          </label>
          <input
            id="synonyms"
            type="text"
            name="synonyms"
            className={formInputTypeTextClasses}
            aria-required
          />
          <p className="mt-1 select-none text-[11px] text-gray-600">
            Please enter synonyms separated by commas.
          </p>
        </div>

        <div>
          <label className={formLabelClasses} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full rounded border p-2.5 text-gray-700 outline-none"
            aria-required
            required
          />
        </div>

        <label
          htmlFor="imagesAndWallpapers"
          className="flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-md transition duration-200 ease-in-out hover:bg-blue-700"
        >
          <FaFileArrowUp className="size-4" />
          <span>Pick images and wallpapers</span>
          <input
            id="imagesAndWallpapers"
            name="imagesAndWallpapers"
            type="file"
            accept="image/*"
            className="sr-only"
            aria-label="Pick images and wallpapers"
            aria-required
            multiple
            required
          />
        </label>
      </form>
    );

  if (status === "unauthenticated" || !data?.user.isAdmin)
    return signIn("google", { callbackUrl: currentUrl });
}
