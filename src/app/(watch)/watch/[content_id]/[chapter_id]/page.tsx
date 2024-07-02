import Link from "next/link";
import Image from "next/image";

import { pageReqObj } from "@/types";

import { ToastContainerProvider } from "@/contexts/toastContainerContext";
import NestedCommentSystem from "@/components/nestedCommentSystem";

export default function WatchPage(req: Readonly<pageReqObj>) {
  return (
    <>
      <ChaptersPagination />
      <div className="pictures relative mx-auto grid max-w-[800px]">
        {[...new Array(11)].map((_, index) => (
          <Image
            key={index}
            src={`/chapter/${index + 1}.jpg`}
            alt={`image-${index + 1}`}
            width={1200}
            height={1200}
            className={`h-auto max-w-full border-x ${index === 11 - 1 ? "border-b" : ""} ${index === 0 ? "border-t" : ""} border-[var(--app-border-color-medium-gray)]`}
          />
        ))}
      </div>
      <ChaptersPagination />
      <div className="mb-[60px]" />

      <ToastContainerProvider autoDismiss={false}>
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
