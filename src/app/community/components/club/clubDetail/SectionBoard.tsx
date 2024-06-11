'use client';
import { TAB_LIST } from '@/app/community/constants/clubDetail';
import TabMenuWrap from './TabMenuWrap';
import { useRecoilState } from 'recoil';
import {
  clubCurrentTabState,
  clubUserTypeState,
} from '@/app/community/atoms/clubDetail';
import { ClubMemberType } from '@/types/club/detail/clubDetail';

interface Props {
  children: React.ReactNode;
  clubId: number;
  memberType: ClubMemberType;
}

export default function SectionBoard({ children, clubId, memberType }: Props) {
  const [tab] = useRecoilState(clubCurrentTabState);
  return (
    <section
      className={`
        ${tab == undefined || tab === '' ? 'max-md:hidden' : ''}
        ${memberType === 'NONE_MEMBER' || memberType === 'VISITOR' ? ' w-[32.3%]' : 'w-[57.69%]'}
        py-[1rem] max-md:pt-[1.5rem] max-md:pb-0`}
    >
      {/* 탭 메뉴 */}
      <div className="max-md:hidden">
        <TabMenuWrap
          clubId={clubId}
          current={tab}
          userType={memberType}
          tabList={TAB_LIST}
        />
      </div>
      {children}
    </section>
  );
}
