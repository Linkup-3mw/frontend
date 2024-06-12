'use client';
import Avatar from '@/app/common/components/user/Avatar';
import BoardDetailTopBtn from './BoardDetailTopBtn';
import { useClubDetailInfoQuery } from '@/hooks/useClubDetail';
import CircleLoader from '@/app/common/components/frame/CircleLoader';

interface Props {
  clubId: number;
}

export default function IntroduceDetail({ clubId }: Props) {
  const { data, isPending } = useClubDetailInfoQuery(clubId);

  if (isPending) {
    return <CircleLoader />;
  }

  return (
    <div>
      <BoardDetailTopBtn postId={clubId} />
      <div className="px-[2rem] overflow-y-auto mb-[1.5rem] h-[45.82vh] max-h-[28.9rem]  min-h-[28.9rem] max-md:px-[1rem]  max-md:h-[calc(100vh_-_22.9375rem)] max-md:min-h-[0] ">
        <h2 className="mb-[1.5rem] leading-none text-[1.25rem] font-bold max-md:text-[1.25rem] max-md:leading-[140%]">
          {data?.title}
        </h2>
        <div className="flex items-center justify-between mb-[1.75rem] max-md:[1.5rem]">
          <div className="flex gap-[1rem] items-center">
            <Avatar
              image={data?.profile_image || '/svg/header/profileDefault.svg'}
              name={data?.member_username as string}
              className="border-none w-[2rem] h-[2rem]"
            />
            <span className="text-[0px]">
              <b className="block mb-[0.5] text-[0.875rem] text-gray-800">
                {data?.member_username}
              </b>
              <i className="text-[0.75rem] text-gray-500 font-bold not-italic">
                모임 호스트
              </i>
            </span>
          </div>
        </div>
        <div className="mb-[2.25rem] text-1 font-medium leading-[175%] whitespace-pre-line break-keep max-md:mb-[1.5rem] max-md:text-[0.875rem] max-md:font-medium max-md:leading-[171%]">
          {data?.detail_introduction}
        </div>
      </div>
    </div>
  );
}
