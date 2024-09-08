"use client";

// useActionState is Latest method for fom Managment Currently available in Next 14.3.5
import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useFormState } from "react-dom";
import dynamic from "next/dynamic";
import useBodyOverflow from "@/hooks/useBodyOverflow";

import { ContentResponse, GenresResponse } from "@/types";
import { addOrUpdateContent } from "@/actions/contentPageForm";
import ModelOverlay from "@/components/utils/modelOverlay";
import getUpdateImageSelectionEvent from "@/libs/eventHandlers/getUpdateImageSelectionEvent";
import SubmitForm from "@/components/buttons/submitForm";

// Dynamic Imports
const ImagePreviewAndUploadTool = dynamic(
  () => import("@/components/imagePreviewAndUploadTool"),
  {
    ssr: false,
    loading: () => <ModelOverlay useAsLoader />,
  },
);

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
  genresResponse: GenresResponse;
  contentResponse: ContentResponse;
}> = ({ genresResponse, contentResponse }) => {
  const addOrUpdateContentFormRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(addOrUpdateContent, {
    error: false,
    errorMessage: undefined,
  });
  const { genres } = genresResponse;
  const { content } = contentResponse;

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

  useEffect(() => {
    if (state?.resetForm) {
      addOrUpdateContentFormRef.current?.reset();

      setThumbnail([]);
      setPoster([]);
      setImagesAndWallpapers([]);
    }
  }, [state?.resetForm]);

  const formAction = useCallback(
    (formData: FormData) => {
      formData.append("thumbnail", thumbnail?.[0]);
      formData.append("poster", poster?.[0]);
      imagesAndWallpapers.forEach((image) =>
        formData.append("imagesAndWallpapers", image),
      );

      action(formData);
    },
    [thumbnail, poster, imagesAndWallpapers, action],
  );

  return (
    <>
      <form
        ref={addOrUpdateContentFormRef}
        action={formAction}
        className="flex flex-col gap-3.5"
      >
        <h3 className="admin-form-title">Add a new Content</h3>
        <input
          type="text"
          name="contentId"
          value={content?.id}
          hidden
          readOnly
        />

        <div>
          <label className="admin-form-label" htmlFor="tags">
            Tags
          </label>

          <select
            id="tags"
            name="tags"
            multiple
            className="admin-form-input-type-select h-[146px]"
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
        />

        <SelectImageButtonWithPreview
          setFile={setPoster}
          setPreview={setIsPreviewPoster}
          isImageSelected={isPosterSelected}
          previewButtonText="Preview Poster"
          selectButtonText="Pick Poster"
        />

        <div>
          <label className="admin-form-label" htmlFor="title">
            Title
          </label>

          <input
            id="title"
            type="text"
            name="title"
            className="admin-form-input-type-text"
            autoComplete="on"
            spellCheck
            aria-required
            required
            defaultValue={content?.title}
          />
        </div>

        <div>
          <label className="admin-form-label" htmlFor="status">
            Status
          </label>

          <select
            id="status"
            name="status"
            className="admin-form-input-type-select"
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
          <label className="admin-form-label" htmlFor="genres">
            Genres
          </label>

          <select
            id="genres"
            name="genres"
            multiple
            className="admin-form-input-type-select h-[233px]"
            aria-required
            required
            defaultValue={content?.genres as string[]}
          >
            {genres?.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="admin-form-label" htmlFor="author">
            Author
          </label>

          <input
            id="author"
            type="text"
            name="author"
            className="admin-form-input-type-text"
            autoComplete="on"
            spellCheck
            aria-required
            required
            defaultValue={content?.author}
          />
        </div>

        <div>
          <label className="admin-form-label" htmlFor="synonyms">
            Synonyms
          </label>

          <input
            id="synonyms"
            type="text"
            name="synonyms"
            className="admin-form-input-type-text"
            autoComplete="on"
            spellCheck
            aria-required
            defaultValue={content?.synonyms.join(",")}
          />
          <p className="admin-form-input-caption text-gray-600">
            Please enter synonyms separated by commas.
          </p>
        </div>

        <div>
          <label className="admin-form-label" htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={8}
            className="admin-form-description"
            autoComplete="on"
            spellCheck
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
          multiple
        />

        <div>
          <SubmitForm title="Add Content" />
          {state.error && (
            <p className="admin-form-input-caption text-red-600">
              {state.errorMessage}
            </p>
          )}
        </div>
      </form>

      {isPreviewThumbnail && (
        <ImagePreviewAndUploadTool
          images={thumbnail}
          onClickResetCallback={() => {
            setIsPreviewThumbnail(false);
            setThumbnail([]);
          }}
          title="Thumbnail Preview"
          goBackCallback={() => setIsPreviewThumbnail(false)}
        />
      )}

      {isPreviewPoster && (
        <ImagePreviewAndUploadTool
          images={poster}
          onClickResetCallback={() => {
            setIsPreviewPoster(false);
            setPoster([]);
          }}
          title="Poster Preview"
          goBackCallback={() => setIsPreviewPoster(false)}
        />
      )}

      {isPreviewImagesAndWallpapers && (
        <ImagePreviewAndUploadTool
          images={imagesAndWallpapers}
          onClickResetCallback={() => {
            setIsPreviewImagesAndWallpapers(false);
            setImagesAndWallpapers([]);
          }}
          title="Images and Wallpapers Preview"
          goBackCallback={() => setIsPreviewImagesAndWallpapers(false)}
        />
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
  multiple?: boolean;
}> = ({
  setFile,
  setPreview,
  isImageSelected,
  previewButtonText,
  selectButtonText,
  multiple,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const updateSelectionEvent = useCallback(
    getUpdateImageSelectionEvent(setFile, () => setPreview(true)),
    [setFile, setPreview],
  );

  const onClickTrigger = useCallback(() => {
    if (isImageSelected) setPreview(true);
    else imageInputRef.current?.click();
  }, [isImageSelected, setPreview]);

  return (
    <button
      onClick={onClickTrigger}
      type="button"
      className="admin-form-button"
      aria-haspopup="dialog"
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
            multiple={multiple}
          />
        </>
      )}
    </button>
  );
};

export default AddOrUpdateContentForm;
