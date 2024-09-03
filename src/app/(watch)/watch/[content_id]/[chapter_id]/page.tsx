import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

import Header from "@/app/(watch)/_components/header";
import ErrorMessage from "@/components/messages/errorMessage";
import { contentCoverBlurDataImageURL } from "@/data/imageDataUrls";
import NestedCommentSystem from "@/components/nestedCommentSystem";

import {
  ERROR_404_PAGE_HEADER_TITLE,
  ERROR_500_PAGE_HEADER_TITLE,
} from "@/constants";

import {
  getContentChapter,
  getContentChapters,
} from "@/libs/dbCRUD/getContent";

export async function generateMetadata(
  { params }: WatchPageReqObj,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { content_id, chapter_id } = params;
  const { chapter, status, error } = await getContentChapter(
    content_id,
    chapter_id,
    { withDescription: true },
  );
  const title =
    status === 404
      ? ERROR_404_PAGE_HEADER_TITLE
      : error
        ? ERROR_500_PAGE_HEADER_TITLE
        : chapter?.title;

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
  const { chapters } = await getContentChapters(content_id, {
    forClientComponent: true,
  });

  const { status, chapter, error, errorMessage } = await getContentChapter(
    content_id,
    chapter_id,
    { withImages: true },
  );

  if (status === 404) return notFound();

  return (
    <>
      <Header chapters={chapters} />
      <main id="page-content">
        {error && (
          <ErrorMessage>{`Unable to load Watch page because ${errorMessage}`}</ErrorMessage>
        )}

        <ChaptersPagination />
        <div className="mx-auto grid min-h-[calc(100vh-220px)] max-w-[800px] place-items-center md:min-h-[calc(100vh-360px)]">
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
        <ChaptersPagination />

        <div className="mb-[60px]" />
        {/* <NestedCommentSystem
        contentId={req.params.content_id!}
        chapterId={req.params.chapter_id}
      /> */}
      </main>
    </>
  );
}

const paginationButtonClasses =
  "box-content flex h-[25px] w-[40%] items-center justify-center rounded-[500px] border border-[var(--app-border-color-medium-gray)] leading-normal text-gray-500/70 data-[active=false]:pointer-events-none data-[active=true]:border-[var(--app-text-color-crimson)] data-[active=true]:text-[var(--app-text-color-crimson)]";

const ChaptersPagination: React.FC = () => {
  return (
    <div className="box-content h-[50px] w-full md:-mt-5 md:h-[100px]">
      <div className="mx-auto box-content flex h-full items-center justify-around px-[10%] md:w-[500px]">
        <Link data-active={false} href="/" className={paginationButtonClasses}>
          <span className="text-xs md:text-xl">Previous Episode</span>
        </Link>
        <Link data-active={true} href="/" className={paginationButtonClasses}>
          <span className="text-xs md:text-xl">Next Episode</span>
        </Link>
      </div>
    </div>
  );
};
