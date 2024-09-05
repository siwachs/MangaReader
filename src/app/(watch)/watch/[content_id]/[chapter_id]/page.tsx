import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import Header from "@/app/(watch)/_components/header";
import ErrorMessage from "@/components/messages/errorMessage";
import { contentCoverBlurDataImageURL } from "@/data/imageDataUrls";
import Pagination from "./_components/pagination";
import LazyLoadComponent from "@/components/utils/lazyLoadComponent";

import {
  ERROR_404_PAGE_HEADER_TITLE,
  ERROR_500_PAGE_HEADER_TITLE,
} from "@/constants";

import getChapters, { getChapter } from "@/libs/dbCRUD/getChapters";
import { getContentTitleAndDescription } from "@/libs/dbCRUD/getContent";

export async function generateMetadata(
  { params }: WatchPageReqObj,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { content_id, chapter_id } = params;
  const { chapter, status, error } = await getChapter(content_id, chapter_id, {
    withDescription: true,
  });
  let title;

  if (status === 404) {
    title = ERROR_404_PAGE_HEADER_TITLE;
  } else if (error) {
    title = ERROR_500_PAGE_HEADER_TITLE;
  } else {
    title = chapter?.title;
  }

  return {
    title: `${title} - MangaReader`,
    description: chapter?.description ?? "Description not available.",
  };
}

type WatchPageReqObj = {
  params: {
    content_id: string;
    chapter_id: string;
  };
};

export default async function WatchPage(req: Readonly<WatchPageReqObj>) {
  const { content_id, chapter_id } = req.params;

  const { title } = await getContentTitleAndDescription(content_id);
  const { chapters } = await getChapters(content_id, {
    forClientComponent: true,
  });

  const { status, chapter, prevChapter, nextChapter, error, errorMessage } =
    await getChapter(content_id, chapter_id, { withImages: true });

  if (status === 404) return notFound();

  return (
    <>
      <Header
        chapters={chapters}
        contentId={content_id}
        chapterId={chapter_id}
        contentTitle={title!}
        chapterTitle={chapter?.title!}
      />

      <main id="page-content">
        {error && (
          <ErrorMessage>{`Unable to load Watch page because ${errorMessage}`}</ErrorMessage>
        )}

        <Pagination
          contentId={content_id}
          prevChapter={prevChapter}
          nextChapter={nextChapter}
        />
        <div className="mx-auto mb-5 grid min-h-[calc(100vh-220px)] max-w-[800px] place-items-center md:min-h-[calc(100vh-360px)]">
          {chapter?.images.map((image, index) => (
            <Image
              quality={100}
              placeholder="blur"
              blurDataURL={contentCoverBlurDataImageURL}
              key={index}
              src={image}
              alt={`image-${index + 1}`}
              width={830}
              height={930}
              className="m-[inherit] h-auto max-w-full"
            />
          ))}
        </div>
        <Pagination
          contentId={content_id}
          prevChapter={prevChapter}
          nextChapter={nextChapter}
        />

        <div className="mb-[60px]" />

        <LazyLoadComponent component="NestedCommentSystem" />
      </main>
    </>
  );
}
