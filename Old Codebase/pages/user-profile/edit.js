import { useState, useRef, useCallback } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import { debounce } from "lodash";

import Axios from "@/lib/axiosConfig";

import { useSession } from "next-auth/react";

import ErrorComponent from "@/components/ErrorComponent";
import ListWrapper from "@/components/Wrappers/ListWrapper";

import { ArrowForwardIos, EditSharp } from "@mui/icons-material";
import { TextField, CircularProgress, Button } from "@mui/material";

//File Server...
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import storage from "@/lib/firebase";
import useForm from "@/hooks/form_hook";

import { EDIT_PROFILE_ACTIONS } from "@/CONSTANTS";
import { transformText } from "@/lib/utils";
import getUserProfile from "@/lib/serverPropsUtils/getUserProfile";

const UserProfile = ({ user, error, statusCode, message }) => {
  const { update } = useSession();
  const filePickerRef = useRef(null);
  const router = useRouter();

  const initialInputs = {
    name: user.name,
    nameError: false,
    userName: user.userName || "",
    userNameError: false,
    profilePicture: user.profilePicture,
  };

  const [state, dispatch] = useForm(initialInputs, "editProfile");
  const [loading, setLoading] = useState(false);

  const editProfile = async (event) => {
    event.preventDefault();
    isUserNameAvailable.cancel();
    if (loading) return;
    setLoading(true);

    try {
      await Axios.put(`/api/profile/${user._id}`, {
        name: transformText(state.name),
        userName:
          state.userName.trim() === "" ? null : transformText(state.userName),
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleName = (event) => {
    const name = event.target.value;
    if (name.trim() === "") {
      dispatch({
        type: EDIT_PROFILE_ACTIONS.NAME_ERROR,
        value: true,
      });
    } else {
      dispatch({
        type: EDIT_PROFILE_ACTIONS.NAME_ERROR,
        value: false,
      });
    }

    dispatch({
      type: EDIT_PROFILE_ACTIONS.NAME,
      value: name,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isUserNameAvailable = useCallback(
    debounce(async (userName) => {
      try {
        const response = await Axios.get(
          `/api/profile/username?keyword=${userName}`
        );
        const { isAvail, error } = response.data;
        if (error || !isAvail) {
          dispatch({
            type: EDIT_PROFILE_ACTIONS.USER_NAME_ERROR,
            value: true,
          });
        } else {
          dispatch({
            type: EDIT_PROFILE_ACTIONS.USER_NAME_ERROR,
            value: false,
          });
        }
      } catch (error) {
        dispatch({
          type: EDIT_PROFILE_ACTIONS.USER_NAME_ERROR,
          value: true,
        });
      }
    }, 200),
    []
  );

  const handleUserName = (event) => {
    const userName = event.target.value;
    if (userName.trim() === "" || transformText(userName) === user.userName) {
      dispatch({
        type: EDIT_PROFILE_ACTIONS.USER_NAME_ERROR,
        value: false,
      });
    } else {
      isUserNameAvailable(transformText(userName));
    }
    dispatch({
      type: EDIT_PROFILE_ACTIONS.USER_NAME,
      value: userName,
    });
  };

  const filePickerHandler = (event) => {
    const image = event.target.files[0];

    if (image.type.split("/")[0] === "image") {
      if (loading) return;
      setLoading(true);

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = async (readerEvent) => {
        const imageRef = ref(
          storage,
          `Users/${user.email}/profilePicture/picture`
        );
        try {
          dispatch({
            type: EDIT_PROFILE_ACTIONS.PROFILE_PICTURE,
            value: readerEvent.target.result,
          });
          await uploadString(imageRef, readerEvent.target.result, "data_url");
          const profilePicture = await getDownloadURL(imageRef);
          await Axios.put(`/api/profile/${user._id}`, {
            profilePicture,
          });
          update({ image: profilePicture });
        } catch (error) {
        } finally {
          setLoading(false);
        }
      };
    }
  };

  return error ? (
    <ErrorComponent statusCode={statusCode} message={message} />
  ) : (
    <main className="min-h-screen bg-[var(--bg-profile)] dark:bg-gray-900">
      <ListWrapper changeMaxwidth="max-w-[800px]">
        <div className="grid place-items-center gap-y-6 rounded-[4px] bg-white p-2 pb-3.5 dark:brightness-95">
          <div className="relative">
            {loading ? (
              <div className="flex h-28 w-28 items-center justify-center rounded-full">
                <CircularProgress />
              </div>
            ) : (
              <div>
                <Image
                  src={state.profilePicture}
                  alt={state.name}
                  height={120}
                  width={120}
                  className="h-28 w-28 rounded-full object-cover"
                />
                <button
                  onClick={() => filePickerRef.current.click()}
                  className="absolute bottom-2 right-0 flex cursor-pointer items-center justify-center rounded-full bg-blue-500 p-0.5"
                >
                  <input
                    ref={filePickerRef}
                    onChange={filePickerHandler}
                    hidden
                    accept="image/*"
                    type="file"
                  />
                  <EditSharp fontSize="small" />
                </button>
              </div>
            )}
          </div>

          <form
            onSubmit={editProfile}
            className="grid w-full place-items-center gap-y-6"
          >
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Name"
              value={state.name}
              onChange={handleName}
              error={state.nameError}
              helperText={state.nameError ? "Name can't be empty." : undefined}
              className="max-w-[500px]"
            />

            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="User Name"
              value={state.userName}
              onChange={handleUserName}
              error={state.userNameError}
              helperText={
                state.userNameError
                  ? "User name must be unique or empty."
                  : undefined
              }
              className="max-w-[500px]"
            />

            <Button
              variant="outlined"
              type="submit"
              onClick={editProfile}
              endIcon={<ArrowForwardIos fontSize="small" />}
              disabled={loading || state.nameError || state.userNameError}
            >
              Apply Changes
            </Button>
          </form>

          <button className="text-red-500" onClick={() => router.back()}>
            Go Back
          </button>
        </div>
      </ListWrapper>
    </main>
  );
};

export default UserProfile;

export async function getServerSideProps(context) {
  return await getUserProfile(context);
}
