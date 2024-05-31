import { signOut } from "@/lib/auth";

const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignOut;
