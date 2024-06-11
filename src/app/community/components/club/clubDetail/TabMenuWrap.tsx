'use client';

import { TAB_MOBILE_LIST } from '@/app/community/constants/clubDetail';
import TabMenu from './TabMenu';
import WriteBtn from './WriteBtn';
import { ClubMemberType, ITabList } from '@/types/club/detail/clubDetail';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  userType: ClubMemberType;
  className?: string;
  tabList: ITabList[];
  current: string;
  clubId: number;
}

export default function TabMenuWrap({
  userType,
  className,
  tabList,
  current,
  clubId,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const paths = pathname.substring(1).split('/');

  return (
    <div
      className={`px-[1.5rem] flex justify-between items-center gap-[0.5rem] text-[1.25rem] font-bold
      max-md:px-0 max-md:mx-[1rem] max-md:gap-[0.92rem]  max-md:text-[0.75rem] max-md:border-b-[1px] max-md:border-gray-300 ${className}`}
    >
      <TabMenu tabList={tabList} clubId={clubId} />
      {userType !== 'NONE_MEMBER' &&
        userType !== 'VISITOR' &&
        !paths.find((path) => path === 'register') && (
          <WriteBtn
            className="flex-shrink-0"
            onClick={() => {
              if (current === '') {
                router.push(`/community/club/${clubId}/notice/register`);
              } else {
                router.push(`/community/club/${clubId}/${current}/register`);
              }
            }}
          />
        )}
    </div>
  );
}
