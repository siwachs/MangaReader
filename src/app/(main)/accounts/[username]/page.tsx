import { redirect } from "next/navigation";
import { auth } from "@/libs/auth";

import HomeNav from "@/components/navigations/homeNav";

export default async function AccountPage() {
  const user = await auth();

  if (!user?.user.username) redirect("/accounts/username");

  return (
    <>
      <HomeNav />

      <div></div>
    </>
  );
}
