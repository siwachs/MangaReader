"use client";

// useActionState is Latest method for fom Managment Currently available in Next 14.3.5
import { Dispatch, SetStateAction, useRef, useState } from "react";
import ReactDom, { useFormState } from "react-dom";
import useBodyOverflow from "@/hooks/useBodyOverflow";

import { Content } from "@/types";
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
  contentResponse: {
    error: boolean;
    content?: null | Content;
    errorMessage?: string;
  };
}> = ({ genresResponse, contentResponse }) => {
  const { genres } = genresResponse;
  const { content } = contentResponse;

  const addOrUpdateContentFormRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(addOrUpdateContent, {
    error: false,
    errorMessage: undefined,
  });

  const [thumbnail, setThumbnail] = useState<string[]>(
    content?.thumbnail ? [content.thumbnail] : [],
  );
  const [poster, setPoster] = useState<string[]>(
    content?.poster ? [content.poster] : [],
  );
  const [imagesAndWallpapers, setImagesAndWallpapers] = useState<string[]>(
    content?.imagesAndWallpapers ?? [],
  );

  const [isPreviewPoster, setIsPreviewPoster] = useState(false);
  const [isPreviewThumbnail, setIsPreviewThumbnail] = useState(false);
  const [isPreviewImagesAndWallpapers, setIsPreviewImagesAndWallpapers] =
    useState(false);

  useBodyOverflow(
    isPreviewPoster || isPreviewThumbnail || isPreviewImagesAndWallpapers,
  );

  const isThumbnailSelected = thumbnail.length > 0;
  const isPosterSelected = poster.length > 0;
  const isImagesAndWallpapersSelected = imagesAndWallpapers.length > 0;

  if (!state.error) {
    addOrUpdateContentFormRef.current?.reset();
  }

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
            defaultValue={content?.tags}
          >
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <SelectImageButtonWithPreview
          setFile={setThumbnail}
          setPreview={setIsPreviewThumbnail}
          isImageSelected={isThumbnailSelected}
          previewButtonText="Preview Thumbnail"
          selectButtonText="Pick Thumbnail"
          ariaLabel="Pick Thumbnail"
        />

        <SelectImageButtonWithPreview
          setFile={setPoster}
          setPreview={setIsPreviewPoster}
          isImageSelected={isPosterSelected}
          previewButtonText="Preview Poster"
          selectButtonText="Pick Poster"
          ariaLabel="Pick Poster"
        />

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
            defaultValue={content?.title}
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
            defaultValue={content?.status}
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
            defaultValue={content?.genres}
          >
            {genres?.map((genre) => (
              <option key={genre.id} value={genre.id}>
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
            defaultValue={content?.author}
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
            defaultValue={content?.synonyms.join(",")}
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
            defaultValue={content?.description}
          />
        </div>

        <SelectImageButtonWithPreview
          setFile={setImagesAndWallpapers}
          setPreview={setIsPreviewImagesAndWallpapers}
          isImageSelected={isImagesAndWallpapersSelected}
          previewButtonText="Preview images and wallpapers"
          selectButtonText="Pick images and wallpapers"
          ariaLabel="Pick images and wallpapers"
          multiple
        />

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
            onClickResetCallback={() => {
              setIsPreviewThumbnail(false);
              setThumbnail([]);
            }}
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
            onClickResetCallback={() => {
              setIsPreviewPoster(false);
              setPoster([]);
            }}
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
            onClickResetCallback={() => {
              setIsPreviewImagesAndWallpapers(false);
              setImagesAndWallpapers([]);
            }}
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

const SelectImageButtonWithPreview: React.FC<{
  setFile: Dispatch<SetStateAction<string[]>>;
  setPreview: Dispatch<SetStateAction<boolean>>;
  isImageSelected: boolean;
  previewButtonText: string;
  selectButtonText: string;
  ariaLabel: string;
  multiple?: boolean;
}> = ({
  setFile,
  setPreview,
  isImageSelected,
  previewButtonText,
  selectButtonText,
  ariaLabel,
  multiple,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const updateSelectionEvent = getUpdateImageSelectionEvent(setFile, () =>
    setPreview(true),
  );

  const onClickTrigger = () => {
    if (isImageSelected) setPreview(true);
    else imageInputRef.current?.click();
  };

  return (
    <button
      onClick={onClickTrigger}
      type="button"
      className={formButtonClasses}
    >
      {isImageSelected ? (
        <>
          <MdPreview className="size-[18px]" />
          <span>{previewButtonText}</span>
        </>
      ) : (
        <>
          <FaFileArrowUp className="size-4" />
          <span>{selectButtonText}</span>
          <input
            ref={imageInputRef}
            onChange={updateSelectionEvent}
            type="file"
            accept="image/*"
            hidden
            aria-label={ariaLabel}
            multiple={multiple}
          />
        </>
      )}
    </button>
  );
};

export default AddOrUpdateContentForm;
