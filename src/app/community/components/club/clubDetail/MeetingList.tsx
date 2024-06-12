'use client';

import { clubUserTypeState } from '@/app/community/atoms/clubDetail';
import MeetingCard from './MeetingCard';
import { useRecoilState } from 'recoil';
import { useClubMeetingListQuery } from '@/hooks/useClubDetail';
import { IMeetingData } from '@/types/club/detail/clubDetail';
import CircleLoader from '@/app/common/components/frame/CircleLoader';
import NoDataMessage from './NoDataMessage';

interface Props {
  clubId: number;
}

export default function MeetingList({ clubId }: Props) {
  const [userType] = useRecoilState(clubUserTypeState);
  const { data, error, isPending } = useClubMeetingListQuery(clubId);

  if (isPending) {
    return <CircleLoader />;
  }

  if (!data) {
    return <NoDataMessage />;
  }

  if (userType === 'NONE_MEMBER' || userType === 'VISITOR') {
    return (
      <div className="overflow-y-auto mt-[1.5rem] h-[calc(100%_-_5rem)]  max-md:mt-0 max-md:h-full max-md:overflow-y-visible">
        <ul className="px-[2.5rem] [&_>_li]:mb-[1.5rem] max-md:px-[1rem] max-md:[&_>_li]:mb-[1rem] ">
          {data?.map((item: IMeetingData) => {
            return (
              <li className="last:mb-0" key={item.id}>
                <MeetingCard data={item} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-[1.5rem] px-[2.5rem] max-md:px-[1rem] max-md:grid-cols-1 max-md:gap-[1rem]">
      {data?.map((item: IMeetingData) => {
        return (
          <li className="last:mb-0" key={item.id}>
            <MeetingCard data={item}>
              {/* <button className="w-full h-[2.75rem] bg-blue-400 text-[1rem] font-bold text-white">
                참여하기
              </button> */}
            </MeetingCard>
          </li>
        );
      })}
    </ul>
  );
}
