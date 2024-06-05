"use client";

import { usePathname } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import UserProfile from "../users/userProfile";

const ClientAuth: React.FC<{
  profileMenuPositionClasses?: string;
  authProvider?: string;
  profileContainerClasses?: string;
  signInButtonClasses?: string;
}> = ({
  profileMenuPositionClasses = "right-2.5 top-10",
  authProvider = "google",
  profileContainerClasses,
  signInButtonClasses,
}) => {
  const currentUrl = usePathname();

  const session = useSession();
  const { status } = session;

  return status === "loading" || status === "authenticated" ? (
    <div className={profileContainerClasses}>
      <UserProfile
        profileMenuPositionClasses={profileMenuPositionClasses}
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
