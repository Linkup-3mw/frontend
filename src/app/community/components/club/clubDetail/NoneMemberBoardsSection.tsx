'use client';

import { TAB_LIST } from '@/app/community/constants/clubDetail';
import MeetingCard from './MeetingCard';
import TabMenu from './TabMenu';
import { BlackRightArrow } from '@/app/common/components/icons/BlackArrow';

interface Props {
  id: number;
}

export default function NoneMemberBoardsSection({ id }: Props) {
  return (
    <>
      {/* 리스트 */}
      <div className="overflow-y-auto mt-[1.5rem] h-[calc(100%_-_6.9rem)]  max-md:mt-0 max-md:h-full max-md:overflow-y-visible">
        <ul className="px-[2.5rem] max-md:px-[1rem]">
          {BOARD_LIST.map(({ id, title }) => (
            <li
              className="flex items-center justify-between gap-[0.5rem] h-[4.5rem] border-b-[1.5px] border-blue-100 max-md:h-[3.5rem]"
              key={id}
            >
              <b className="flex-grow text-[1rem] dot_three  max-md:px-[0.5rem] max-md:text-[0.75rem]">
                {title}
              </b>
              <button className="flex-shrink-0">
                <BlackRightArrow />
                <span className="hide">더보기</span>
              </button>
            </li>
          ))}
        </ul>
        <ul className="px-[2.5rem] [&_>_li]:mb-[1.5rem] max-md:px-[1rem] max-md:[&_>_li]:mb-[1rem] ">
          <li className="last:mb-0">{/* <MeetingCard /> */}</li>
          <li className="last:mb-0">{/* <MeetingCard /> */}</li>
          <li className="last:mb-0">{/* <MeetingCard /> */}</li>
          <li className="last:mb-0">{/* <MeetingCard /> */}</li>
        </ul>
      </div>
    </>
  );
}

const BOARD_LIST = [
  {
    id: 1001,
    title:
      '디자인 클래스 운영 안내디자인 클래스 운영 안내디자인 클래스 운영 안내디자인 클래스 운영 안내디자인 클래스 운영 안내',
  },
  {
    id: 2001,
    title: '모임 운영 규칙',
  },
  {
    id: 3001,
    title: '모임 비용 안내',
  },
  {
    id: 4001,
    title: '술자리에 대한 안내',
  },
];
