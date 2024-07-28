import Link from "next/link";
import Image from "next/image";

import { pageReqObj } from "@/types";

import { contentCoverBlurDataImageURL } from "@/data/imageDataUrls";
import { ToastContainerProvider } from "@/contexts/toastContainerContext";
import NestedCommentSystem from "@/components/nestedCommentSystem";

export default function WatchPage(req: Readonly<pageReqObj>) {
  return (
    <>
      <ChaptersPagination />
      <div className="mx-auto grid max-w-[800px] place-items-center">
        {[...new Array(12)].map((_, index) => (
          <Image
            quality={100}
            placeholder="blur"
            blurDataURL={contentCoverBlurDataImageURL}
            key={index}
            src={
              index + 1 === 12
                ? `/chapter/${index + 1}.webp`
                : `/chapter/${index + 1}.jpg`
            }
            alt={`image-${index + 1}`}
            width={830}
            height={930}
            className="m-[inherit] h-auto max-w-full"
          />
        ))}
      </div>

      <ChaptersPagination />
      <div className="mb-[60px]" />

      <ToastContainerProvider>
        <NestedCommentSystem
          contentId={req.params.content_id!}
          chapterId={req.params.chapter_id}
        />
      </ToastContainerProvider>
    </>
  );
}

const paginationButtonClasses =
  "box-content flex h-[25px] w-[40%] items-center justify-center rounded-[500px] border border-[var(--app-border-color-medium-gray)] leading-normal text-[var(--app-text-color-medium-gray)] data-[active=false]:pointer-events-none data-[active=true]:border-[var(--app-text-color-crimson)] data-[active=true]:text-[var(--app-text-color-crimson)]";

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
