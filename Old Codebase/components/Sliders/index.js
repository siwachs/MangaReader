import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination, EffectCoverflow } from "swiper";

const Slider = ({ sliderSlides }) => {
  return (
    <div className="m-auto my-5 w-[90%] max-w-[1200px] overflow-hidden lg:my-[1.875rem] lg:w-full">
      <Swiper
        effect="coverflow"
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
        className="lg:max-w-[600px]"
      >
        {sliderSlides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <Link
              href={`/${slide.title.replaceAll(" ", "-")}?content_id=${
                slide._id
              }`}
            >
              <div className="relative mx-auto h-[60vw] w-full lg:h-[432px]">
                <Image
                  src={slide.displayImageThumbnail.image}
                  alt={slide.title}
                  sizes="(max-width: 640px) 90vw, 100vw"
                  fill
                  className={`h-auto max-w-full rounded-[4px] brightness-95 dark:brightness-90 ${
                    slide.displayImageThumbnail.type === "poster"
                      ? "object-contain"
                      : "object-cover"
                  }`}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
