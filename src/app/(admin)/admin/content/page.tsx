import AddGenreForm from "./_components/addGenreForm";
import AddOrUpdateContentForm from "./_components/addOrUpdateContentForm";

import getGenres from "@/libs/dbCRUD/getGenres";
import getContent from "@/libs/dbCRUD/getContent";

type AdminContentPageReqObj = {
  searchParams: {
    content_id?: string;
  };
};

export default async function ContentPage(
  req: Readonly<AdminContentPageReqObj>,
) {
  const contentId = (req.searchParams.content_id ?? "").trim();
  const genresResponse = await getGenres({ forClientComponent: true });
  const contentResponse = contentId
    ? await getContent(contentId, {
        forClientComponent: true,
      })
    : { error: false };

  return (
    <>
      <div className="admin-form-container mb-5 mt-[92px] md:mb-[30px] md:mt-36">
        <AddGenreForm />
      </div>

      <div className="admin-form-container my-5 md:my-[30px]">
        <AddOrUpdateContentForm
          genresResponse={genresResponse}
          contentResponse={contentResponse}
        />
      </div>
    </>
  );
}
