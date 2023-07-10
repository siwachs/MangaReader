import { useReducer } from "react";

import {
  ADD_GENRE_ACTIONS,
  UPLOAD_CONTENT_ACTIONS,
  EDIT_PROFILE_ACTIONS,
} from "@/CONSTANTS";

function formReducerForAddGenre(state, action) {
  switch (action.type) {
    case ADD_GENRE_ACTIONS.GENRE_ID:
      return { ...state, genreId: action.value };
    case ADD_GENRE_ACTIONS.GENRE_NAME:
      return { ...state, genreName: action.value };
    case ADD_GENRE_ACTIONS.GENRE_ID_ERROR:
      return { ...state, genreIdError: action.isError };
    case ADD_GENRE_ACTIONS.GENRE_NAME_ERROR:
      return { ...state, genreNameError: action.isError };
    case ADD_GENRE_ACTIONS.RESET:
      return {
        ...action.initialInputs,
      };
    default:
      return state;
  }
}

function formReducerForUploadContent(state, action) {
  switch (action.type) {
    case UPLOAD_CONTENT_ACTIONS.TITLE:
      return { ...state, title: action.value };
    case UPLOAD_CONTENT_ACTIONS.TITLE_ERROR:
      return { ...state, titleError: action.value };
    case UPLOAD_CONTENT_ACTIONS.AUTHOR_NAME:
      return {
        ...state,
        authorName: action.value,
      };
    case UPLOAD_CONTENT_ACTIONS.AUTHOR_NAME_ERROR:
      return {
        ...state,
        authorNameError: action.value,
      };
    case UPLOAD_CONTENT_ACTIONS.DESCRIPTION:
      return { ...state, description: action.value };
    case UPLOAD_CONTENT_ACTIONS.DESCRIPTION_ERROR:
      return { ...state, descriptionError: action.value };
    case UPLOAD_CONTENT_ACTIONS.SET_CONTENT_TYPE:
      return {
        ...state,
        contentType: action.checked
          ? [...action.contentType, action.name]
          : action.contentType.filter(
              (storedName) => storedName !== action.name
            ),
      };
    case UPLOAD_CONTENT_ACTIONS.SET_STATUS:
      return { ...state, status: action.value };
    case UPLOAD_CONTENT_ACTIONS.SELECT_GENRES:
      return {
        ...state,
        selectedGenres:
          typeof action.value === "string"
            ? action.value.split(",")
            : action.value,
      };
    case UPLOAD_CONTENT_ACTIONS.SELECT_TAGID:
      return {
        ...state,
        tags: (() => {
          const filteredGenreArray = action.genreArray.filter((genre) =>
            state.selectedGenres.includes(genre.tagName)
          );

          return filteredGenreArray.map((genre) => genre._id);
        })(),
      };
    case UPLOAD_CONTENT_ACTIONS.STORE_THUMBNAIL:
      return {
        ...state,
        displayImageThumbnail: {
          ...state.displayImageThumbnail,
          image: action.image,
        },
      };
    case UPLOAD_CONTENT_ACTIONS.STORE_POSTER:
      return {
        ...state,
        displayImagePoster: {
          ...state.displayImagePoster,
          image: action.image,
        },
      };
    case UPLOAD_CONTENT_ACTIONS.SET_IMAGE_TYPE_THUMBNAIL:
      return {
        ...state,
        displayImageThumbnail: {
          ...state.displayImageThumbnail,
          type: action.value,
        },
      };
    case UPLOAD_CONTENT_ACTIONS.SET_IMAGE_TYPE_POSTER:
      return {
        ...state,
        displayImagePoster: {
          ...state.displayImagePoster,
          type: action.value,
        },
      };
    case UPLOAD_CONTENT_ACTIONS.RESET:
      return {
        ...action.initialInputs,
      };
    default:
      return state;
  }
}

function formReducerForEditProfile(state, action) {
  switch (action.type) {
    case EDIT_PROFILE_ACTIONS.NAME:
      return {
        ...state,
        name: action.value,
      };
    case EDIT_PROFILE_ACTIONS.NAME_ERROR:
      return {
        ...state,
        nameError: action.value,
      };
    case EDIT_PROFILE_ACTIONS.USER_NAME:
      return {
        ...state,
        userName: action.value,
      };
    case EDIT_PROFILE_ACTIONS.USER_NAME_ERROR:
      return {
        ...state,
        userNameError: action.value,
      };
    case EDIT_PROFILE_ACTIONS.PROFILE_PICTURE:
      return {
        ...state,
        profilePicture: action.value,
      };
  }
}

const useForm = (initialInputs, useHookFor) => {
  const reducer =
    useHookFor === "addGenre"
      ? formReducerForAddGenre
      : useHookFor === "uploadContent"
      ? formReducerForUploadContent
      : useHookFor === "editProfile"
      ? formReducerForEditProfile
      : null;
  const [state, dispatch] = useReducer(reducer, initialInputs);

  return [state, dispatch];
};

export default useForm;
