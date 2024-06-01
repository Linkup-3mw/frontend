'use client';
import { useRef } from 'react';
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
}

export default function MemberSwiper({
  size = 'regular',
  swiperOption,
}: Props) {
  const swiperRef = useRef<any>(null);

  return (
    <div className={`relative px-[2rem] max-md:!px-0`}>
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 disabled:opacity-5 max-md:hidden"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <SquareBlueArrowPrev />
        <span className="hide">Prev</span>
      </button>

      <button
        className="test absolute right-0 top-1/2 -translate-y-1/2 disabled:opacity-5 max-md:hidden"
        onClick={() => swiperRef.current?.slideNext()}
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
      >
        {MEMBER_LIST.map(({ id, username, profile }) => {
          return (
            <SwiperSlide
              key={id}
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
                  image={profile}
                  name={username}
                  type="host"
                  className={`block mx-auto ${
                    size === 'small'
                      ? 'mb-[0.25rem] !w-[1.75rem] !h-[1.75rem]'
                      : 'mb-[0.5rem]'
                  } `}
                />
                {username}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

//임시
const MEMBER_LIST = [
  {
    id: 31,
    member_id: 1,
    username: '테스트',
    profile: 'img_office_1.png',
  },
  {
    id: 25,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
  {
    id: 13,
    member_id: 1,
    username: '테스트',
    profile: 'img_office_1.png',
  },
  {
    id: 29,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
  {
    id: 15,
    member_id: 1,
    username: '테스트',
    profile: 'img_office_1.png',
  },
  {
    id: 32,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
  {
    id: 1,
    member_id: 1,
    username: '테스트',
    profile: 'img_office_1.png',
  },
  {
    id: 2,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
  {
    id: 3,
    member_id: 1,
    username: '테스트',
    profile: 'img_office_1.png',
  },
  {
    id: 4,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
  {
    id: 5,
    member_id: 1,
    username: '테스트',
    profile: 'img_office_1.png',
  },
  {
    id: 6,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
  {
    id: 8,
    member_id: 1,
    username: '테스트',
    profile: 'img_office_1.png',
  },
  {
    id: 72,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
  {
    id: 16,
    member_id: 1,
    username: '테스트',
    profile: 'img_office_1.png',
  },
  {
    id: 52,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
  {
    id: 53,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
  {
    id: 54,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
  {
    id: 55,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
  {
    id: 56,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
  {
    id: 57,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
  {
    id: 58,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
  {
    id: 59,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
  {
    id: 60,
    member_id: 2,
    username: '빨리하자눙',
    profile: 'img_office_2.png',
  },
];
