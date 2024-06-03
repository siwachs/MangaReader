import { signIn, signOut } from "@/lib/auth";

const SignIn: React.FC<{ [key: string]: any }> = ({ ...props }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button {...props} type="submit">
        Sign In
      </button>
    </form>
  );
};

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

export { signIn, signOut };
