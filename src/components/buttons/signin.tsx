import { signIn } from "@/lib/auth";

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

export default SignIn;
