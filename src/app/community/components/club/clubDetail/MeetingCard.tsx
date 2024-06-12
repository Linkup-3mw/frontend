'use client';
import {
  CalenderIcon,
  LocationIcon,
  // MemberIcon,
  MoneyIcon,
} from '@/app/common/components/icons/MeetingIcons';
// import MemberSwiper from './MemberSwiper';
import { IMeetingData } from '@/types/club/detail/clubDetail';
import { dateTimeKoreanFormat, getDayOfWeek, numComma } from '@/utils/utils';

interface Props {
  children?: React.ReactNode;
  data: IMeetingData;
}

export default function MeetingCard({ children, data }: Props) {
  const {
    title,
    member_name,
    member_image,
    meeting_location,
    max_capacity,
    id,
    fee,
    date,
  } = data!;

  return (
    <div className="overflow-hidden rounded-[0.5rem] ">
      <div className="py-[1.5rem] px-[1.19rem] bg-white">
        <div className="px-[0.41rem]">
          <h3 className="mb-[1rem] text-[1rem] font-bold leading-none">
            {title}
          </h3>
          <ul className="mb-[1.5rem] [&_li]:flex [&_li]:items-center [&_li]:gap-[0.5rem] [&_li]:mb-[0.5rem] text-[0.875rem] font-medium max-md:mb-[1.75rem] max-md:[&_li]:mb-[0.25rem] max-md:text-[0.75rem] max-md:font-normal [&_svg]:md:stroke-[1.5px]">
            <li>
              <CalenderIcon />
              {dateTimeKoreanFormat(date)}
            </li>
            <li>
              <LocationIcon />
              {meeting_location}
            </li>
            <li>
              <MoneyIcon />
              회비 {numComma(String(fee))}원
            </li>
            {/* <li>
              <MemberIcon />
              참여 인원 6 / {max_capacity}
            </li> */}
          </ul>
        </div>
        {/* <MemberSwiper size="small" /> */}
      </div>
      {children}
    </div>
  );
}
