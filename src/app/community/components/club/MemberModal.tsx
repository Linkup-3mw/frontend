'use client';
import Image from 'next/image';
import { MessengerIcon } from '@common/components/icons/MessengerIcon';
import { PeopleBlueRed } from '@common/components/icons/PeopleIcons';
import XIcon from '@common/components/icons/XIcon';
import Avatar from '@common/components/user/Avatar';

interface Props {
  className?: string;
  isShow?: boolean;
  // setIsShow:
}
export default function MemberModal({ className }: Props) {
  const handleCloseBtnClick = () => {};

  return (
    <div
      className={`absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-[2rem] w-[18.125rem] rounded-[0.5rem] border-[1.5px] border-gray-200 border-box bg-white max-md:p-[1.5rem] max-md:max-w-[calc(100%_-_5.38rem)] ${className}`}
    >
      <button
        className="absolute right-[1rem] top-[1rem] w-[1.5rem] h-[1.5rem]"
        onClick={handleCloseBtnClick}
      >
        <XIcon className="max-md:w-[1.1rem] max-md:h-[1.1rem] max-md:stroke-[0.5px]" />
        <span className="hide">닫기</span>
      </button>
      <Avatar
        image={'/images/home/img_office_2.png'}
        name="밥비어"
        className="mx-auto !w-[12.5rem] !h-[12.5rem] !max-md:w-[10rem] !max-md:h-[10rem]"
      />

      <div className="mb-[0.84rem] mt-[1.5rem] flex items-center gap-[0.88rem] max-md:mb-[0.5rem]">
        <b className="block text-[2rem] leading-none max-md:text-[1.25rem]">
          밥비어
        </b>
        <span className="shrink-0 bg-yellow-600 p-[0.5rem] rounded leading-none max-md:text-[0.75rem]">
          디자인
        </span>
      </div>
      <span className="flex items-center mb-[1rem]">
        <Image
          width={24}
          height={24}
          src="/svg/club/locationIcon.svg"
          alt="위치"
          className="w-[1.5rem] h-[1.5rem] max-md:w-[1rem] max-md:h-[1rem]"
        />
        <b className="text-[0.875rem] max-md:text-[0.75rem]">강남 1호점</b>
      </span>
      <i className="block mb-[1rem] leading-none not-italic text-[0.875rem] font-bold max-md:text-[0.75rem]">
        croh1234@linkup.com
      </i>
      <p className="mb-[1.2rem] text-[1rem] font-medium leading-[1.2] two_line_dot_three max-md:mb-[2rem]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, fugiat!
        Ratione quam architecto impedit. Nulla a numquam blanditiis dolores
        delectus magni minus vel itaque, iure corrupti neque. Ab, quaerat
        corporis.
      </p>
      <div className="flex items-center justify-between [&_button]:w-[6.8125rem] [&_button]:h-[2.5rem] [&_button]:border-[1.5px] [&_button]:flex [&_button]:items-center [&_button]:justify-center [&_button]:rounded-[0.5rem] [&_button]:text-[1rem] [&_button]:font-medium [&_button]:max-md:text-[0.875rem] [&_button]:max-md:border-[1px]  [&_button]:max-md:h-[2rem] ">
        <button>
          <PeopleBlueRed className="inline-block mr-[0.5rem] max-md:w-[1rem]" />
          친구추가
        </button>
        <button>
          <MessengerIcon className="inline-block mr-[0.5rem] !stroke-[1px] max-md:w-[1rem]" />
          연락하기
        </button>
      </div>
    </div>
  );
}
