'use client';

import { TAB_MOBILE_LIST } from '@/app/community/constants/clubDetail';
import TabMenu from './TabMenu';
import { ClubMemberType } from '@/app/community/(pages)/club/[id]/page';
import WriteBtn from './WriteBtn';

{
  /* 모바일에서 보이는 탭메뉴 */
}

interface Props {
  userType: ClubMemberType;
  className?: string;
  tabList: {
    id: number;
    name: string;
  }[];
}

export default function TabMenuWrap({ userType, className, tabList }: Props) {
  return (
    <div
      className={`px-[1.5rem] flex justify-between items-center gap-[0.5rem] text-[1.25rem] font-bold
      max-md:px-0 max-md:mx-[1rem] max-md:gap-[0.92rem]  max-md:text-[0.75rem] max-md:border-b-[1px] max-md:border-gray-300 ${className}`}
    >
      <TabMenu tabList={tabList} />
      {userType !== 'none_member' && (
        <WriteBtn
          className="flex-shrink-0"
          onClick={() => console.log('글 작성 클릭')}
        />
      )}
    </div>
  );
}
