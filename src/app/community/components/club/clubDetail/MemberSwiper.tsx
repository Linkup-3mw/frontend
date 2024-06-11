'use client';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
import { Navigation, Grid } from 'swiper/modules';
import Avatar from '@/app/common/components/user/Avatar';
import {
  SquareBlueArrowNext,
  SquareBlueArrowPrev,
} from '@/app/common/components/icons/SquareBlueArrow';
import 'swiper/css';
import 'swiper/css/grid';

interface Props {
  size?: 'small' | 'regular';
  swiperOption?: SwiperOptions;
  members: {
    member_id: number;
    member_name: string;
    profile_image: string;
    ishost: undefined | boolean;
  }[];
}

export default function MemberSwiper({
  size = 'regular',
  swiperOption,
  members,
}: Props) {
  const swiperRef = useRef<any>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={`relative px-[2rem] max-md:!px-0`}>
      <button
        ref={prevRef}
        className={`swiper_prev absolute disabled left-0 top-1/2 -translate-y-1/2 disabled:opacity-[0.3]  max-md:hidden`}
      >
        <SquareBlueArrowPrev />
        <span className="hide">Prev</span>
      </button>

      <button
        ref={nextRef}
        className={`swiper_next absolute right-0 top-1/2 -translate-y-1/2 disabled:opacity-[0.3] max-md:hidden`}
      >
        <SquareBlueArrowNext />
        <span className="hide">Next</span>
      </button>
      <Swiper
        spaceBetween={0}
        slidesPerView={'auto'}
        slidesPerGroup={2}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Grid]}
        className={`max-h-[8.75rem]
        ${
          size === 'small'
            ? '[&_>_div]:gap-[0.62rem]'
            : '[&_>_div]:gap-[0.5rem] max-md:[&_>_div]:gap-[0.25rem]'
        }  
        `}
        {...swiperOption}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
      >
        {members?.map(({ member_id, member_name, profile_image, ishost }) => {
          return (
            <SwiperSlide
              key={member_id}
              className={`
              ${
                size === 'small'
                  ? '!w-[2.625rem] max-md:!w-[2.625rem]'
                  : '!w-[3.75rem]  max-md:!w-[2.75rem]'
              } `}
            >
              <div
                className={`py-[0.25rem] text-center text-[0.75rem] leading-none dot_three
                ${
                  size === 'small'
                    ? 'font-normal'
                    : 'font-bold max-md:font-normal'
                }`}
              >
                <Avatar
                  image={profile_image || '/svg/header/profileDefault.svg'}
                  name={member_name}
                  type={(ishost && 'host') || undefined}
                  className={`block mx-auto ${
                    size === 'small'
                      ? 'mb-[0.25rem] !w-[1.75rem] !h-[1.75rem]'
                      : 'mb-[0.5rem]'
                  } `}
                />
                {member_name}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
