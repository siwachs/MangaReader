import { signIn } from "next-auth/react";

const getSignInConfirm = (callbackUrl: string, userId?: string) => {
  if (!userId) {
    if (confirm("Sign in with Google?")) {
      signIn("google", { callbackUrl });
    }

    return false;
  }

  return true;
};

export default getSignInConfirm;
