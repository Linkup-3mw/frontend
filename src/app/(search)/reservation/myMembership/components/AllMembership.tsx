'use client';
import {
  isEnterState,
  selectedMembershipId,
  selectedOfficeId,
  useMembershipState,
  userMembership,
} from '@/app/(search)/atom/membership';
import Image from 'next/image';
import Link from 'next/link';
import API from '@/utils/axios';
import { IUser } from '@/types/user';
import { dateDot } from '@/utils/utils';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination, Autoplay]);
export default function AllMembership({ user }: { user: IUser }) {
  const [useMembership, setUserMembership] = useRecoilState(useMembershipState);
  const setMembershipId = useSetRecoilState(selectedMembershipId);
  const [officeId, setOfficeId] = useRecoilState(selectedOfficeId);
  const [isEnter, setIsEnter] = useRecoilState(isEnterState);
  const router = useRouter();

  useEffect(() => {
    // 멤버십 아이디 들어있는 멤버십 전체조회
    const fetchAllMembershipData = async () => {
      try {
        const res = await API.get('reservation/my-membership');
        setUserMembership(res.data.data);
      } catch (error) {
        console.error('allmymembership req error', error);
      }
    };
    fetchAllMembershipData();
  }, [setUserMembership]);
  const handleGoClick = (membershipId: number, officeId: number) => {
    setOfficeId(officeId);
    router.push(`/reservation/myMembership/resertory/${membershipId}`);
    setMembershipId(membershipId);
  };
  const imgPuzzle = [
    '/images/home/yellow_puzzle.png',
    '/images/home/green_puzzle.png',
    '/images/home/img_puzzle.png',
  ];
  const highResolutionUrls = imgPuzzle.map((url) =>
    url.replace('SX300', 'SX1400'),
  );

  return (
    <>
      <Swiper
        className="w-2/3"
        navigation={true}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {useMembership?.map((membership) => (
          <SwiperSlide key={membership.id}>
            <div className="swiper-container">
              <div
                //   key={membership.id}
                className={` relative  pt-[3.5rem] p-[2rem] bg-white rounded-2xl font-bold max-md:w-full max-md:mb-[1rem] max-md:py-[1.5rem] max-md:px-[1rem]
            
            `}
              >
                <h2 className="mb-[1.5rem] text-[2.5rem] max-md:text-[1.5rem] max-md:leading-[2.125rem]">
                  {user.name}
                  <span className="max-md:hidden">님 반갑습니다.</span>
                  <span className="max-md:inline hidden">
                    님<br />
                    좋은 하루 보내세요.
                  </span>
                </h2>
                <p className="text-[1.25rem] text-gray-500 max-md:text-[1rem]">
                  오늘 하루도 힘차게 아자아자아자
                </p>

                <div className="mt-[2rem] leading-none">
                  <div className="flex items-center gap-[1rem] mb-[1rem]  max-md:mb-[0.5rem]">
                    <span className="max-md:text-[0.875rem]">이용권</span>
                    <i className="p-[0.5rem] rounded-full bg-black text-[0.875rem] not-italic leading-none text-white max-md:text-[0.675rem]">
                      {membership.location}
                    </i>
                  </div>
                  <p className="mb-[1.5rem] text-[1.5rem] font-bold max-md:text-[1.2rem]">
                    {membership.type} 사용 중
                  </p>
                  <span className="block mb-[1rem] text-[1rem] max-md:mb-[0.5rem] max-md:text-[0.875rem]">
                    이용기간
                  </span>
                  <b className="block text-[1.5rem] max-md:text-[1.2rem]">
                    {dateDot(membership.start_date)}{' '}
                    {membership.type === '1일 패스' ||
                      `- ${dateDot(membership.end_date)}`}
                  </b>
                  <div
                    onClick={() =>
                      handleGoClick(membership.id, membership.office_id)
                    }
                    className="mt-[1rem] inline-block px-[1rem] py-[1rem] bg-blue-400 text-white rounded-[0.5rem] leading-none text-[1.25rem] max-md:p-[0.5rem] max-md:text-[1rem] max-md:rounded-[0.25rem]"
                  >
                    예약내역
                  </div>
                </div>
                <Image
                  className={`absolute rotate-[5deg] 
              ${!membership ? 'w-[9.617rem] top-[initial] bottom-[-2rem] right-[13rem] rotate-[15deg] max-md:hidden' : 'w-[7.6321rem] top-[3rem] right-0 max-md:top-[initial] max-md:bottom-[5rem] max-md:w-[6rem]'}
              `}
                  src={highResolutionUrls[0]}
                  width={200}
                  height={50}
                  alt="yellow puzzle"
                />

                <Image
                  className={`absolute 
              ${!membership ? 'w-[7.617rem] top-[0.7rem] right-[12.7rem] rotate-[10deg] max-md:hidden' : 'hidden'}
              `}
                  src={highResolutionUrls[1]}
                  width={200}
                  height={50}
                  alt="green puzzle"
                />
                <Image
                  className={`absolute  rotate-[5deg] max-md:top-[initial] max-md:bottom-[1rem] max-md:w-[10rem]
                ${!membership ? 'w-[24.1978rem] top-[4.19rem] right-[-0.3rem]' : 'w-[15.6321rem] right-[0rem] top-[6.5rem]'}
              `}
                  src={highResolutionUrls[2]}
                  width={200}
                  height={50}
                  alt="puzzle"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
