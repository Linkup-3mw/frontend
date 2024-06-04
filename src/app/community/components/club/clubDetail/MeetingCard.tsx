import {
  CalenderIcon,
  LocationIcon,
  MemberIcon,
  MoneyIcon,
} from '@/app/common/components/icons/MeetingIcons';
import MemberSwiper from './MemberSwiper';

interface Props {
  children?: React.ReactNode;
}

export default function MeetingCard({ children }: Props) {
  return (
    <div className="overflow-hidden rounded-[0.5rem] ">
      <div className="py-[1.5rem] px-[1.19rem] bg-white">
        <div className="px-[0.41rem]">
          <h3 className="mb-[1rem] text-[1rem] font-bold leading-none">
            번개모임
          </h3>
          <ul className="mb-[1.5rem] [&_li]:flex [&_li]:items-center [&_li]:gap-[0.5rem] [&_li]:mb-[0.5rem] text-[0.875rem] font-medium max-md:mb-[1.75rem] max-md:[&_li]:mb-[0.25rem] max-md:text-[0.75rem] max-md:font-normal [&_svg]:md:stroke-[1.5px]">
            <li>
              <CalenderIcon />
              5월 1일 (수) 오후 7:30
            </li>
            <li>
              <LocationIcon />
              강남구 봉은사로4길 29 B1호
            </li>
            <li>
              <MoneyIcon />
              회비 30,000원
            </li>
            <li>
              <MemberIcon />
              참여 인원 6 / 12{' '}
            </li>
          </ul>
        </div>
        <MemberSwiper size="small" />
      </div>
      {children}
    </div>
  );
}
