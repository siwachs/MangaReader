import { notFound } from "next/navigation";

import getServerSession from "@/libs/auth/getServerSession";
import AddGenreForm from "./_components/addGenreForm";
import AddOrUpdateContentForm from "./_components/addOrUpdateContentForm";

import getGenres from "@/libs/dbCRUD/getGenres";

export default async function ContentPage() {
  const data = await getServerSession();
  if (!data || !data.user.isAdmin) return notFound();

  const genresResponse = await getGenres();

  return (
    <div className="soft-edge-shadow mx-auto mb-5 mt-[92px] w-[90%] max-w-[690px] rounded-lg bg-white p-5 text-sm md:mb-[30px] md:mt-36 md:text-base">
      <AddGenreForm />
      <AddOrUpdateContentForm genresResponse={genresResponse} />
    </div>
  );
}
