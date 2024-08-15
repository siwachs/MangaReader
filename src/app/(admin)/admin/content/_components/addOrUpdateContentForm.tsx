"use client";

// useActionState is Latest method for fom Managment Currently available in Next 14.3.5
import { useRef, useState } from "react";
import ReactDom, { useFormState } from "react-dom";
import useBodyOverflow from "@/hooks/useBodyOverflow";

import { addOrUpdateContent } from "@/actions/contentPageForm";
import { getUpdateImageSelectionEvent } from "@/libs/uiUtils/eventHandlers";
import SubmitForm from "@/components/buttons/submitForm";
import ImagePickAndUploadTool from "@/components/imagePickAndUploadTool";

import {
  formButtonClasses,
  formInputTypeSelectClasses,
  formInputTypeTextClasses,
  formLabelClasses,
  formTitleClasses,
} from "../_tw/formStyles";

import { FaFileArrowUp } from "react-icons/fa6";
import { MdPreview } from "react-icons/md";

const tags = [
  "BannerContent",
  "ReadWithEditor",
  "CompletedClassic",
  "WeeklyNovel",
  "FreeRead",
];

const statusOptions = [
  "Ongoing",
  "Discontinued",
  "Abandoned",
  "Unscheduled",
  "Completed",
];

const AddOrUpdateContentForm: React.FC<{
  genresResponse: {
    error: boolean;
    genres?: { id: string; name: string }[];
    errorMessage?: string;
  };
}> = ({ genresResponse }) => {
  const addOrUpdateContentFormRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(addOrUpdateContent, {
    error: false,
    errorMessage: undefined,
  });

  const [thumbnail, setThumbnail] = useState<string[]>([]);
  const [poster, setPoster] = useState<string[]>([]);
  const [imagesAndWallpapers, setImagesAndWallpapers] = useState<string[]>([]);

  const pickAThumbnailRef = useRef<HTMLInputElement>(null);
  const pickAPosterRef = useRef<HTMLInputElement>(null);
  const imagesAndWallpapersRef = useRef<HTMLInputElement>(null);

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

  if (!state.error) addOrUpdateContentFormRef.current?.reset();

  return (
    <>
      <form
        ref={addOrUpdateContentFormRef}
        action={(formData) => {
          formData.append("thumbnail", thumbnail[0] ?? "");
          formData.append("poster", poster[0] ?? "");
          formData.append(
            "imagesAndWallpapers",
            JSON.stringify(imagesAndWallpapers),
          );

          action(formData);
        }}
        className="flex flex-col gap-3.5"
      >
        <h3 className={formTitleClasses}>Add a new Content</h3>

        <div>
          <label className={formLabelClasses} htmlFor="tags">
            Tags
          </label>

          <select
            id="tags"
            name="tags"
            multiple
            className={`${formInputTypeSelectClasses} h-[136px]`}
            aria-multiselectable="true"
          >
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => pickAThumbnailRef.current?.click()}
          type="button"
          className={formButtonClasses}
        >
          <FaFileArrowUp className="size-4" />
          <span>Pick Thumbnail</span>
          <input
            ref={pickAThumbnailRef}
            onChange={updateThumbnailSelection}
            type="file"
            accept="image/*"
            hidden
            aria-label="Pick Thumbnail"
          />
        </button>

        {isThumbnailSelected && (
          <button
            onClick={() => setIsPreviewThumbnail(true)}
            type="button"
            className={formButtonClasses}
          >
            <MdPreview className="size-[18px]" />
            <span>Preview Thumbnail</span>
          </button>
        )}

        <button
          onClick={() => pickAPosterRef.current?.click()}
          type="button"
          className={formButtonClasses}
        >
          <FaFileArrowUp className="size-4" />
          <span>Pick Poster</span>
          <input
            ref={pickAPosterRef}
            onChange={updatePosterSelection}
            type="file"
            accept="image/*"
            hidden
            aria-label="Pick Poster"
          />
        </button>

        {isPosterSelected && (
          <button
            onClick={() => setIsPreviewPoster(true)}
            type="button"
            className={formButtonClasses}
          >
            <MdPreview className="size-[18px]" />
            <span>Preview Poster</span>
          </button>
        )}

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

        <div>
          <label className={formLabelClasses} htmlFor="status">
            Status
          </label>

          <select
            id="status"
            name="status"
            className={formInputTypeSelectClasses}
            aria-required
            required
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={formLabelClasses} htmlFor="genres">
            Genres
          </label>

          <select
            id="genres"
            name="genres"
            multiple
            className={`${formInputTypeSelectClasses} h-[136px]`}
            aria-required
            required
          >
            {genresResponse.genres?.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
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
            className="w-full rounded border p-2.5 leading-tight text-gray-700 shadow"
            aria-required
            required
          />
        </div>

        <button
          onClick={() => imagesAndWallpapersRef.current?.click()}
          type="button"
          className={formButtonClasses}
        >
          <FaFileArrowUp className="size-4" />
          <span>Pick images and wallpapers</span>
          <input
            ref={imagesAndWallpapersRef}
            onChange={updateImagesAndWallpapersSelection}
            type="file"
            accept="image/*"
            hidden
            aria-label="Pick images and wallpapers"
            multiple
          />
        </button>

        {isImagesAndWallpapersSelected && (
          <button
            onClick={() => setIsPreviewImagesAndWallpapers(true)}
            type="button"
            className={formButtonClasses}
          >
            <MdPreview className="size-[18px]" />
            <span>Preview images and wallpapers</span>
          </button>
        )}

        <div>
          <SubmitForm title="Add Content" />
          {state.error && (
            <p className="mt-1 select-none text-[11px] text-red-600">
              {state.errorMessage}
            </p>
          )}
        </div>
      </form>

      {isPreviewThumbnail &&
        ReactDom.createPortal(
          <ImagePickAndUploadTool
            images={thumbnail}
            onClickNextCallback={() => setIsPreviewThumbnail(false)}
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
            onClickNextCallback={() => setIsPreviewPoster(false)}
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
            enableSlidesSelection
            goBackCallback={() => setIsPreviewImagesAndWallpapers(false)}
          />,
          document.getElementById(
            "image-pick-and-upload-portal",
          ) as HTMLElement,
        )}
    </>
  );
};

export default AddOrUpdateContentForm;