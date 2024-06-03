"use client";

import { usePathname } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import UserProfile from "../users/userProfile";

const ClientAuth: React.FC<{
  authProvider?: string;
  profileContainerClasses?: string;
  signInButtonClasses?: string;
}> = ({
  authProvider = "google",
  profileContainerClasses,
  signInButtonClasses,
}) => {
  const currentUrl = usePathname();

  const session = useSession();
  const { data, status } = session;

  return status === "loading" || status === "authenticated" ? (
    <div className={profileContainerClasses}>
      <UserProfile
        status={status}
        avatarUrl={data?.user.avatar}
        profileName={data?.user.name}
        callbackUrl={currentUrl}
      />
    </div>
  ) : (
    <button
      className={signInButtonClasses}
      onClick={() => signIn(authProvider, { callbackUrl: currentUrl })}
    >
      Sign In
    </button>
  );
};

export default ClientAuth;
