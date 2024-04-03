import { useState, useCallback } from "react";

import { useRouter } from "next/router";

import { Button } from "@mui/material";

import Wrapper from "./UploadContentSubComponents/Wrapper";
import LoaderWithLabel from "@/lib/Frontend-utils/LoaderWithLabel";

import Axios from "@/lib/axiosConfig";
import {
  capitalizeText,
  getInitialInputsForUploadContent,
  transformText,
} from "@/lib/utils";

import { debounce } from "lodash";

import useForm from "@/hooks/form_hook";
import { UPLOAD_CONTENT_ACTIONS } from "@/CONSTANTS";

import ContentType from "./UploadContentSubComponents/ContentType";
import Information from "./UploadContentSubComponents/Information";
import DebouncedTextFieldComponent from "./UploadContentSubComponents/DebouncedTextFieldComponent";
import TextFieldComponent from "./UploadContentSubComponents/TextFieldComponent";
import DisplayImage from "./UploadContentSubComponents/DisplayImage";
import Status from "./UploadContentSubComponents/Status";
import PickGenres from "./UploadContentSubComponents/PickGenres";

// Image Server...
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import storage from "@/lib/firebase";

const ContentForm = ({ content }) => {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [state, dispatch] = useForm(
    getInitialInputsForUploadContent(content),
    "uploadContent"
  );

  const router = useRouter();

  const {
    contentType,
    displayImageThumbnail,
    displayImagePoster,
    title,
    titleError,
    status,
    authorName,
    authorNameError,
    description,
    descriptionError,
    selectedGenres,
    tags,
  } = state;

  const getImageLink = async (image, imageName) => {
    if (
      imageName === "thumbnail" &&
      image === content?.displayImageThumbnail.image
    ) {
      setCompleted(completed + 1);
      return content.displayImageThumbnail.image;
    } else if (
      imageName === "poster" &&
      image === content?.displayImagePoster.image
    ) {
      setCompleted(completed + 1);
      return content.displayImagePoster.image;
    }

    try {
      const imageRef = ref(
        storage,
        `Content/${capitalizeText(title)}/displayImages/${imageName}`
      );
      await uploadString(imageRef, image, "data_url");
      const imageUrl = await getDownloadURL(imageRef);
      setCompleted(completed + 1);
      return imageUrl;
    } catch (error) {
      return null;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUniqueness = useCallback(
    debounce(async (value, setTextError) => {
      try {
        const response = await Axios.get(
          `/api/content/check-title?title=${value}`
        );
        const { error, isAvail } = response.data;
        if (error || !isAvail) {
          dispatch({ type: setTextError, value: true });
        } else {
          dispatch({ type: setTextError, value: false });
        }
      } catch (error) {
        dispatch({ type: setTextError, value: true });
      }
    }, 200),
    []
  );

  const uploadContentHandler = async (event) => {
    event.preventDefault();
    checkUniqueness.cancel();

    if (loading) return;
    setLoading(true);
    const thumbnailLink = await getImageLink(
      displayImageThumbnail.image,
      "thumbnail"
    );
    const posterLink = await getImageLink(displayImagePoster.image, "poster");

    const AxiosObject = content ? Axios.put : Axios.post;
    const URL = content
      ? `/api/content?content_id=${content._id}`
      : "/api/content";

    try {
      const response = await AxiosObject(URL, {
        contentType,
        displayImageThumbnail: {
          ...displayImageThumbnail,
          image: thumbnailLink,
        },
        displayImagePoster: {
          ...displayImagePoster,
          image: posterLink,
        },
        title: transformText(title),
        status,
        authorName: transformText(authorName),
        description,
        tags,
      });
      const fetchedResponse = response.data;
      dispatch({
        type: UPLOAD_CONTENT_ACTIONS.RESET,
        initialInputs: getInitialInputsForUploadContent(
          content ? fetchedResponse : null
        ),
      });
    } catch (error) {
    } finally {
      setLoading(false);
      setCompleted(0);

      if (content) {
        router.replace(router.asPath);
      }
    }
  };

  return (
    <form onSubmit={uploadContentHandler} className="my-5 space-y-4">
      <ContentType
        contentType={contentType}
        dispatch={dispatch}
        setContentType={UPLOAD_CONTENT_ACTIONS.SET_CONTENT_TYPE}
      />
      <Information
        informationText="Responsive layouts work only when you select
        correct thumbnail and poster. If you can't find the correct thumbnail or
        poster, you can upload a poster in place of a thumbnail, and vice versa,
        but Remember to select the image type to tell whether it is a poster or
        thumbnail."
      />
      <DisplayImage
        title="Thumbnail Image"
        displayImage={displayImageThumbnail.image}
        type={displayImageThumbnail.type}
        setType={UPLOAD_CONTENT_ACTIONS.SET_IMAGE_TYPE_THUMBNAIL}
        dispatch={dispatch}
        setImage={UPLOAD_CONTENT_ACTIONS.STORE_THUMBNAIL}
      />
      <DisplayImage
        title="Poster Image"
        displayImage={displayImagePoster.image}
        type={displayImagePoster.type}
        setType={UPLOAD_CONTENT_ACTIONS.SET_IMAGE_TYPE_POSTER}
        dispatch={dispatch}
        setImage={UPLOAD_CONTENT_ACTIONS.STORE_POSTER}
      />

      <DebouncedTextFieldComponent
        checkUniqueness={checkUniqueness}
        text={title}
        contentTitle={content?.title}
        dispatch={dispatch}
        setText={UPLOAD_CONTENT_ACTIONS.TITLE}
        textError={titleError}
        setTextError={UPLOAD_CONTENT_ACTIONS.TITLE_ERROR}
        label="Title"
        errorText="Title must a unique and non empty string."
      />
      <Status
        status={status}
        dispatch={dispatch}
        setStatus={UPLOAD_CONTENT_ACTIONS.SET_STATUS}
      />
      <TextFieldComponent
        text={authorName}
        dispatch={dispatch}
        setText={UPLOAD_CONTENT_ACTIONS.AUTHOR_NAME}
        textError={authorNameError}
        setTextError={UPLOAD_CONTENT_ACTIONS.AUTHOR_NAME_ERROR}
        label="Author"
        errorText="Author Name can't be empty."
      />
      <TextFieldComponent
        isMultiLine
        rows={4}
        text={description}
        dispatch={dispatch}
        setText={UPLOAD_CONTENT_ACTIONS.DESCRIPTION}
        textError={descriptionError}
        setTextError={UPLOAD_CONTENT_ACTIONS.DESCRIPTION_ERROR}
        label="Description"
        errorText="Description can't be empty."
      />
      <PickGenres
        selectedGenres={selectedGenres}
        dispatch={dispatch}
        setSelectedGenres={UPLOAD_CONTENT_ACTIONS.SELECT_GENRES}
        setSelectedGenresId={UPLOAD_CONTENT_ACTIONS.SELECT_TAGID}
      />

      {!loading ? (
        <Button
          fullWidth
          variant="contained"
          className="mx-auto block max-w-[500px] bg-blue-500 disabled:bg-gray-300"
          onClick={uploadContentHandler}
          type="submit"
          disabled={
            titleError ||
            authorNameError ||
            descriptionError ||
            !displayImageThumbnail.image ||
            !displayImagePoster.image ||
            tags.length === 0
          }
        >
          {content ? "Apply Changes" : "Upload"}
        </Button>
      ) : (
        <Wrapper loader>
          <LoaderWithLabel size={60} total={2} completed={completed} />
        </Wrapper>
      )}
      <Button
        fullWidth
        variant="contained"
        className="mx-auto block max-w-[500px] bg-blue-500 disabled:bg-gray-300"
        onClick={() =>
          dispatch({
            type: UPLOAD_CONTENT_ACTIONS.RESET,
            initialInputs: getInitialInputsForUploadContent(content),
          })
        }
        type="reset"
        disabled={loading}
      >
        Reset
      </Button>
    </form>
  );
};

export default ContentForm;
