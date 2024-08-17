import { notFound } from "next/navigation";

import { pageReqObj } from "@/types";
import getServerSession from "@/libs/auth/getServerSession";
import AddGenreForm from "./_components/addGenreForm";
import AddOrUpdateContentForm from "./_components/addOrUpdateContentForm";

import { formContainer } from "@/constants/adminCMSFormStyles";
import getGenres from "@/libs/dbCRUD/getGenres";
import getContent from "@/libs/dbCRUD/getContent";

export default async function ContentPage(req: Readonly<pageReqObj>) {
  const data = await getServerSession();
  if (!data?.user?.isAdmin) return notFound();

  const genresResponse = await getGenres();
  const contentResponse = await getContent(req.searchParams.content_id);

  return (
    <>
      <div className={`${formContainer} mb-5 mt-[92px] md:mb-[30px] md:mt-36`}>
        <AddGenreForm />
      </div>

      <div className={`${formContainer} my-5 md:my-[30px]`}>
        <AddOrUpdateContentForm
          genresResponse={genresResponse}
          contentResponse={contentResponse}
        />
      </div>
    </>
  );
}
