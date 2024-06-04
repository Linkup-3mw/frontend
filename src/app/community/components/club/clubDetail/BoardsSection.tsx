'use client';

import MeetingCard from './MeetingCard';
import BoardCard from './BoardCard';

interface Props {
  id: string;
}

export default function BoardsSection({ id }: Props) {
  return (
    <>
      {/* 리스트 */}
      <div className="overflow-y-auto mt-[1.5rem] h-[calc(100%_-_6.9rem)]  max-md:mt-0 max-md:h-full max-md:overflow-y-visible">
        <ul className="grid grid-cols-2 gap-[1.5rem] px-[2.5rem] max-md:px-[1rem] max-md:grid-cols-1 max-md:gap-[1rem]">
          <BoardCard isDetail />
          {BOARD_LIST.map(({ id }) => (
            <BoardCard key={id} />
          ))}
        </ul>
        <ul className="grid grid-cols-2 gap-[1.5rem] px-[2.5rem] max-md:px-[1rem] max-md:grid-cols-1 max-md:gap-[1rem]">
          <li className="last:mb-0">
            <MeetingCard>
              <button className="w-full h-[2.75rem] bg-blue-400 text-[1rem] font-bold text-white">
                참여하기
              </button>
            </MeetingCard>
          </li>
          <li className="last:mb-0">
            <MeetingCard>
              <button className="w-full h-[2.75rem] bg-red-cancel text-[1rem] font-bold text-white">
                참여하기
              </button>
            </MeetingCard>
          </li>
        </ul>
      </div>
    </>
  );
}

// 임시 값
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
