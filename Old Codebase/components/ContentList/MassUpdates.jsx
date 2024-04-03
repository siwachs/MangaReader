import Image from "next/image";
import Link from "next/link";

import { Tooltip } from "@mui/material";
import { capitalizeText } from "@/lib/utils";

import ContentHeader from "./Utils/ContentHeader";
import ListWrapper from "../Wrappers/ListWrapper";

const MassUpdates = ({ headingTitle, massUpdates }) => {
  return (
    <ListWrapper>
      <ContentHeader headingTitle={headingTitle} />
      <div className="mx-[2%] mt-5 grid grid-cols-2 gap-x-[6%] gap-y-5 overflow-hidden lg:mx-0 lg:mt-[30px] lg:flex lg:flex-wrap lg:gap-x-[25px] lg:gap-y-[30px]">
        {massUpdates.map((item) => (
          <div key={item._id} className="lg:w-[280px]">
            <Link
              href={`/${item.title.replaceAll(" ", "-")}?content_id=${
                item._id
              }`}
            >
              <div className="relative h-[24vw] lg:h-[170px]">
                <Image
                  src={item.displayImageThumbnail.image}
                  alt={item.title}
                  sizes="(max-width: 640px) 80vw, (max-width: 768px) 90vw, 100vw"
                  fill
                  className={`h-auto max-w-full rounded-t-[4px] object-cover brightness-95 dark:brightness-90 lg:rounded-[4px] ${
                    item.displayImageThumbnail.type === "poster"
                      ? "object-top md:border md:object-contain"
                      : ""
                  }`}
                />
              </div>

              <Tooltip arrow title={capitalizeText(item.title)}>
                <div className="one-line-text mt-3 text-xs capitalize text-[var(--text-color-black)] dark:text-white sm:text-sm md:text-lg">
                  <span>{item.title}</span>
                </div>
              </Tooltip>
            </Link>
          </div>
        ))}
      </div>
    </ListWrapper>
  );
};

export default MassUpdates;
