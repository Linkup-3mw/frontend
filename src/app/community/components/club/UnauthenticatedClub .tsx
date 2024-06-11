'use client';
import ContentWrap from '@common/components/frame/ContentWrap';

export default function UnauthenticatedClub() {
  return (
    <div className="pt-[1.25rem] pb-[1.19rem] px-[1.25rem] relative">
      <ContentWrap>
        <div className="bg-blue-50 rounded-2xl md:p-[2rem] p-4 relative z-10">
          <p>로그인 후 이용할 수 있는 기능입니다.</p>
        </div>
      </ContentWrap>
    </div>
  );
}
