'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { FLIP_CONTENT } from '@/app/(home)/constants/home';
import FlipCard from './FlipCard';
import 'swiper/css';

export default function FlipSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = (e: any) => {
    setActiveIndex(e.realIndex);
  };

  return (
    <>
      <Swiper
        speed={800}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        centeredSlides={true}
        spaceBetween={0}
        slidesPerView={'auto'}
        onSlideChange={handleChange}
        modules={[Autoplay]}
        breakpoints={{
          768: {
            spaceBetween: 70,
            slidesPerView: 3,
          },
        }}
        className="!overflow-visible"
      >
        {FLIP_CONTENT.map(({ id, image, text }, index) => {
          return (
            <SwiperSlide
              key={id}
              className="max-md:!w-auto max-md:!mx-[7.77vw]"
            >
              <FlipCard
                image={image}
                text={text}
                isActive={index == activeIndex}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
