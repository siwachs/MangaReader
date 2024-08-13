"use client";

import { useRef, useState } from "react";
import ReactDom, { useFormState } from "react-dom";
import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import useBodyOverflow from "@/hooks/useBodyOverflow";

import createOrUpdateContent from "@/actions/createOrUpdateContent";

import { getUpdateImageSelectionEvent } from "@/libs/uiUtils/eventHandlers";
import ImagePickAndUploadTool from "@/components/imagePickAndUploadTool";
import LoadingOverlay from "@/components/utils/loadingOverlay";

import { FaFileArrowUp } from "react-icons/fa6";
import { MdPreview } from "react-icons/md";

const formButtonClasses =
  "flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-md transition duration-200 ease-in-out hover:bg-blue-700";
const formLabelClasses = "mb-2 block select-none font-bold text-gray-700";
const formInputTypeTextClasses =
  "w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow";

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

  const pickAThumbnailRef = useRef<HTMLInputElement>(null);
  const pickAPosterRef = useRef<HTMLInputElement>(null);
  const imagesAndWallpapersRef = useRef<HTMLInputElement>(null);

  const [thumbnail, setThumbnail] = useState<string[]>([]);
  const [poster, setPoster] = useState<string[]>([]);
  const [imagesAndWallpapers, setImagesAndWallpapers] = useState<string[]>([]);

  const [isPreviewPoster, setIsPreviewPoster] = useState(false);
  const [isPreviewThumbnail, setIsPreviewThumbnail] = useState(false);
  const [isPreviewImagesAndWallpapers, setIsPreviewImagesAndWallpapers] =
    useState(false);

  useBodyOverflow(
    isPreviewPoster || isPreviewThumbnail || isPreviewImagesAndWallpapers,
  );

  const updateThumbnailSelection = getUpdateImageSelectionEvent(
    setThumbnail,
    () => setIsPreviewThumbnail(true),
  );
  const updatePosterSelection = getUpdateImageSelectionEvent(setPoster, () =>
    setIsPreviewPoster(true),
  );
  const updateImagesAndWallpapersSelection = getUpdateImageSelectionEvent(
    setImagesAndWallpapers,
    () => setIsPreviewImagesAndWallpapers(true),
  );

  const isThumbnailSelected = thumbnail.length > 0;
  const isPosterSelected = poster.length > 0;
  const isImagesAndWallpapersSelected = imagesAndWallpapers.length > 0;

  if (status === "loading") return <LoadingOverlay />;

  if (status === "authenticated" && data.user.isAdmin)
    return (
      <>
        <form
          action={formAction}
          className="soft-edge-shadow mx-auto mb-5 mt-[92px] flex w-[90%] max-w-[690px] flex-col gap-3.5 overflow-hidden rounded-lg bg-white p-5 text-sm md:mb-[30px] md:mt-36 md:text-base"
        >
          <button
            onClick={() =>
              isThumbnailSelected
                ? setIsPreviewThumbnail(true)
                : pickAThumbnailRef.current?.click()
            }
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-md transition duration-200 ease-in-out hover:bg-blue-700"
          >
            {isThumbnailSelected ? (
              <>
                <MdPreview className="size-[18px]" />
                <span>Preview Thumbnail</span>
              </>
            ) : (
              <>
                <FaFileArrowUp className="size-4" />
                <span>Pick Thumbnail</span>
              </>
            )}
            <input
              ref={pickAThumbnailRef}
              onChange={updateThumbnailSelection}
              name="thumbnail"
              type="file"
              accept="image/*"
              hidden
              aria-label="Pick Thumbnail"
              aria-required
              required
            />
          </button>

          <button
            onClick={() =>
              isPosterSelected
                ? setIsPreviewPoster(true)
                : pickAPosterRef.current?.click()
            }
            type="button"
            className={formButtonClasses}
          >
            {isPosterSelected ? (
              <>
                <MdPreview className="size-[18px]" />
                <span>Preview Poster</span>
              </>
            ) : (
              <>
                <FaFileArrowUp className="size-4" />
                <span>Pick Poster</span>
              </>
            )}
            <input
              ref={pickAPosterRef}
              onChange={updatePosterSelection}
              name="poster"
              type="file"
              accept="image/*"
              hidden
              aria-label="Pick Poster"
              aria-required
              required
            />
          </button>

          <div>
            <label className={formLabelClasses} htmlFor="title">
              Title
            </label>

            <input
              id="title"
              type="text"
              name="title"
              className={formInputTypeTextClasses}
              aria-required
              required
            />
          </div>

          <div className="relative">
            <label className={formLabelClasses} htmlFor="status">
              Status
            </label>

            <select
              id="status"
              name="status"
              className="w-full rounded border bg-white px-4 py-2 pr-8 leading-tight shadow"
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
              className="w-full rounded border p-2.5 text-gray-700"
              aria-required
              required
            />
          </div>

          <button
            onClick={() =>
              isImagesAndWallpapersSelected
                ? setIsPreviewImagesAndWallpapers(true)
                : imagesAndWallpapersRef.current?.click()
            }
            type="button"
            className={formButtonClasses}
          >
            {isImagesAndWallpapersSelected ? (
              <>
                <MdPreview className="size-[18px]" />
                <span>Preview images and wallpapers</span>
              </>
            ) : (
              <>
                <FaFileArrowUp className="size-4" />
                <span>Pick images and wallpapers</span>
              </>
            )}
            <input
              ref={imagesAndWallpapersRef}
              onChange={updateImagesAndWallpapersSelection}
              name="imagesAndWallpapers"
              type="file"
              accept="image/*"
              hidden
              aria-label="Pick images and wallpapers"
              multiple
            />
          </button>
        </form>

        {isPreviewThumbnail &&
          ReactDom.createPortal(
            <ImagePickAndUploadTool
              images={thumbnail}
              goBackCallback={() => setIsPreviewThumbnail(false)}
            />,
            document.getElementById(
              "image-pick-and-upload-portal",
            ) as HTMLElement,
          )}

        {isPreviewPoster &&
          ReactDom.createPortal(
            <ImagePickAndUploadTool
              images={poster}
              goBackCallback={() => setIsPreviewPoster(false)}
            />,
            document.getElementById(
              "image-pick-and-upload-portal",
            ) as HTMLElement,
          )}

        {isPreviewImagesAndWallpapers &&
          ReactDom.createPortal(
            <ImagePickAndUploadTool
              images={imagesAndWallpapers}
              goBackCallback={() => setIsPreviewImagesAndWallpapers(false)}
              multiple
            />,
            document.getElementById(
              "image-pick-and-upload-portal",
            ) as HTMLElement,
          )}
      </>
    );

  if (status === "unauthenticated" || !data?.user.isAdmin)
    return signIn("google", { callbackUrl: currentUrl });
}
