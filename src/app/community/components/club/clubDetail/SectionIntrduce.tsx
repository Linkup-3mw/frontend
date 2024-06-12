'use client';
import { useEffect } from 'react';
import NoneMemberIntroduceSection from './NoneMemberIntroduceSection';
import IntroduceSection from './IntroduceSection';
import { ClubMemberType, IClubInfo } from '@/types/club/detail/clubDetail';
import { useRecoilState } from 'recoil';
import {
  clubCurrentTabState,
  clubInfoState,
  clubUserTypeState,
} from '@/app/community/atoms/clubDetail';

interface Props {
  id: number;
  clubInfo: IClubInfo;
  memberType: ClubMemberType;
}

export default function SectionIntrduce({ id, clubInfo, memberType }: Props) {
  const [tab] = useRecoilState(clubCurrentTabState);
  const [info, setInfo] = useRecoilState(clubInfoState);
  const [userType, setUserType] = useRecoilState(clubUserTypeState);

  useEffect(() => {
    setUserType(memberType);
  }, [memberType, setUserType]);

  useEffect(() => {
    setInfo(clubInfo!);
  }, [clubInfo, setInfo]);

  return (
    <>
      {/* 소개 */}
      <section
        className={`
            ${tab == undefined || tab === '' ? '' : 'max-md:hidden'} 
            ${memberType === 'NONE_MEMBER' || userType === 'VISITOR' ? ' w-[66.11%]' : 'w-[40.72%]'}
            relative overflow-y-auto p-[2.5rem] max-md:static max-md:px-[1rem] max-md:py-[1.5rem]`}
      >
        {memberType === 'NONE_MEMBER' || userType === 'VISITOR' ? (
          <NoneMemberIntroduceSection {...clubInfo} />
        ) : (
          <IntroduceSection {...clubInfo} />
        )}

        {/* 사용자 모달 */}
        {/* <MemberModal isShow={false} /> */}
      </section>
    </>
  );
}
