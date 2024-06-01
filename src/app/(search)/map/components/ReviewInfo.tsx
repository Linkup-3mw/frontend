import 'swiper/swiper-bundle.css';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentBuildingState } from '../../atom/search';
import { useFormattedDate } from '../hooks/getCreateAt';

export default function ReviewInfo() {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBuilding = useRecoilValue(currentBuildingState);
  const reviews = currentBuilding?.reviews.reviews;
  const reviewDate = currentBuilding?.reviews.created_at;

  const formattedDate = useFormattedDate({ createdAt: reviewDate });

  const handleNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };
  return (
    <div className="flex flex-col items-center relative mb-4 ">
      <div className="flex justify-between items-center w-full mb-4 px-3">
        <p className="text-[20px] leading-7 font-bold">리뷰</p>
      </div>
      <div className="flex w-full overflow-hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={-110}
          loop={true}
          initialSlide={currentIndex}
          onSwiper={setSwiper}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        >
          {' '}
          {reviews?.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="p-4 w-[18.75rem] h-[7.625rem] relative bg-white rounded-lg shadow-lg">
                <div className="flex gap-2 justify-start w-[13.75rem] mb-2">
                  <div className="leading-[1.375rem]">{review.reviewer}</div>
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, sdx) => (
                      <Image
                        key={sdx}
                        src="/svg/map/star.svg"
                        width={18}
                        height={18}
                        alt="리뷰 별점 이미지"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300">{formattedDate}</p>
                </div>
                <div className="h-[2.8125rem]">
                  {review.content.length > 30
                    ? review.content.slice(0, 30) + '...'
                    : review.content}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="absolute flex justify-between top-20 w-[110%] z-50">
        <button onClick={handlePrev} className="">
          <Image
            src="/svg/map/review_arrow_left.svg"
            alt="arrow_left"
            width={40}
            height={40}
          />
        </button>
        <button onClick={handleNext} className="">
          <Image
            src="/svg/map/review_arrow_right.svg"
            alt="arrow_right"
            width={40}
            height={40}
          />
        </button>
      </div>
    </div>
  );
}
