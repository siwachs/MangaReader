import { useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import { Button } from "@mui/material";
import { ArrowForwardIos, ThumbUp, Favorite } from "@mui/icons-material";

import Axios from "@/lib/axiosConfig";
import moment from "moment/moment";
import { encrypt } from "@/lib/encryption";
import getUserProfile from "@/lib/serverPropsUtils/getUserProfile";

import { signOut } from "next-auth/react";

import ErrorComponent from "@/components/ErrorComponent";
import ListWrapper from "@/components/Wrappers/ListWrapper";
import DialogComponent from "@/lib/Frontend-utils/DialogComponent";

const UserProfile = ({ user, error, statusCode, message }) => {
  const router = useRouter();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const deleteAccount = async () => {
    setIsAlertOpen(false);
    try {
      await Axios.delete(`/api/profile/${user._id}`);
      signOut({
        callbackUrl: "/",
      });
    } catch (error) {}
  };

  return error ? (
    <ErrorComponent statusCode={statusCode} message={message} />
  ) : (
    <main className="min-h-screen bg-[var(--bg-profile)] dark:bg-gray-900">
      <ListWrapper changeMaxwidth="max-w-[800px]">
        <div className="profile-pic flex flex-col items-center justify-center rounded-[4px] bg-white pb-5 pt-2.5 dark:brightness-95">
          <Image
            src={user.profilePicture}
            alt={user.name}
            height={120}
            width={120}
            className="h-28 w-28 rounded-full object-cover"
          />

          <h1 className="mt-2.5 line-clamp-1 text-center text-xl font-bold text-[var(--text-color-black)]">
            {user.name}
          </h1>

          <h3
            className={`${
              !user.userName ? "mb-2.5" : "text-[var(--text-darkgray)]"
            }`}
          >
            {user.email}
          </h3>

          {user.userName ? (
            <h3 className="mb-2.5 text-[var(--text-darkgray)]">
              UserName: {user.userName}
            </h3>
          ) : null}

          <Button
            onClick={() =>
              router.push(`/user-profile/edit?uid=${encrypt(user._id)}`)
            }
            endIcon={<ArrowForwardIos fontSize="small" />}
          >
            Edit Profile
          </Button>
        </div>

        <div className="my-4 px-2 font-bold text-[var(--text-gray-profile)] dark:text-white">
          CONTENT
        </div>

        <div className="content rounded-[4px] bg-white font-semibold text-black dark:brightness-95">
          <div className="my-0.5 flex cursor-pointer items-center p-2 sm:py-2.5">
            <Favorite className="mr-2" style={{ color: "grey" }} />
            Favourite Content (NA)
            <ArrowForwardIos className="ml-auto" fontSize="small" />
          </div>
          <div className="my-0.5 flex cursor-pointer items-center p-2 sm:py-2.5">
            <ThumbUp className="mr-2" style={{ color: "grey" }} />
            Liked Chapters (NA)
            <ArrowForwardIos className="ml-auto" fontSize="small" />
          </div>
        </div>

        <div className="my-4 px-2 font-bold text-[var(--text-gray-profile)] dark:text-white">
          My Account
        </div>

        <div className="account rounded-[4px] bg-white dark:brightness-95">
          <p className="p-2 text-sm text-[var(--text-darkgray)] md:text-base">
            Joined on {moment(user.createdAt).format("llll")}
          </p>
          <button
            onClick={() => setIsAlertOpen(true)}
            className="mb-1.5 block px-2 text-red-500 lg:text-lg"
          >
            Delete Account?
          </button>

          <DialogComponent
            open={isAlertOpen}
            setIsOpen={setIsAlertOpen}
            acceptButtonMethod={deleteAccount}
            dialogTitle="Are you sure you want to delete your account?"
            dialogText="It is a irreversible process. You can not recover your account once it
          is deleted."
            cancelButtonText="Cancel"
            dialogButtonText="Delete Account"
          />

          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="mb-2.5 inline-block px-2 text-orange-400 lg:text-lg"
          >
            Sign Out
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
