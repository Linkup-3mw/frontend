import ContentWrap from '@/app/common/components/frame/ContentWrap';
import BoardsSection from '@components/club/clubDetail/BoardsSection';
import IntroduceSection from '@components/club/clubDetail/IntroduceSection';
import { NoneMemberIntroduceTopBtn } from '@components/club/clubDetail/IntroduceTopBtn';
import NoneMemberBoardsSection from '@components/club/clubDetail/NoneMemberBoardsSection';
import NoneMemberIntroduceSection from '@components/club/clubDetail/NoneMemberIntroduceSection';
import TabMenuWrap from '@components/club/clubDetail/TabMenuWrap';
import {
  TAB_LIST,
  TAB_MOBILE_LIST,
} from '@/app/community/constants/clubDetail';
import BoardDetail from '@/app/community/components/club/clubDetail/BoardDetail';
import RegisterBoard from '@/app/community/components/club/clubDetail/RegisterBoard';
// import { getClubDetail } from '@/app/service/club';

interface Props {
  params: {
    id: string;
  };
  searchParams: { tab: string | undefined };
}

//임시값 - 가입되어있는 사용자
export type ClubMemberType = 'none_member' | 'member' | 'host' | 'admin';
const userType: ClubMemberType = 'member';

export default async function page({
  params: { id },
  searchParams: { tab },
}: Props) {
  // const clubInfo: ClubDetail = await getClubDetail(id);
  const clubInfo = DATA;

  return (
    <main className="py-[11.25rem] px-[2.5rem]  max-md:px-[1.25rem] max-md:pb-[1.5rem] max-md:pt-[5.75rem]">
      <div className="max-md:py-[1.5rem] max-md:rounded-[1rem] max-md:bg-blue-50">
        {/* 모바일에서 보이는 탭메뉴 */}
        <div className="hidden max-md:block sticky bg-blue-50 top-[3.375rem] z-10">
          <TabMenuWrap userType={userType} tabList={TAB_MOBILE_LIST} />
        </div>

        <ContentWrap
          className={`flex justify-between [&_>_section]:h-[66.66vh] [&_>_section]:max-h-[45rem] [&_>_section]:min-h-[45rem] [&_>_section]:rounded-[1rem] [&_>_section]:bg-blue-50 [&_>_section]:box-border [&_>_section]:max-md:w-full 
      ${
        userType === 'none_member'
          ? 'max-md:[&_>_section]:min-h-0 max-md:[&_>_section]:h-[calc(100vh_-_16.6225rem)] max-md:[&_>_section]:overflow-y-auto'
          : 'max-md:[&_>_section]:min-h-0 max-md:[&_>_section]:h-auto max-md:[&_>_section]:overflow-y-visible'
      }
      `}
        >
          {/* 소개 */}
          <section
            className={`
            ${tab == undefined || tab === '소개' ? '' : 'max-md:hidden'} 
            ${userType === 'none_member' ? ' w-[66.11%]' : 'w-[40.72%]'}
            overflow-y-auto p-[2.5rem]  max-md:px-[1rem] max-md:py-[1.5rem]`}
          >
            {userType === 'none_member' ? (
              <NoneMemberIntroduceSection {...clubInfo} />
            ) : (
              <IntroduceSection {...clubInfo} />
            )}
          </section>

          {/* 게시판 */}
          <section
            className={`
            ${tab == undefined || tab === '소개' ? 'max-md:hidden' : ''}
            ${userType === 'none_member' ? ' w-[32.3%]' : 'w-[57.69%]'}
            py-[1rem] max-md:pt-[1.5rem] max-md:pb-0`}
          >
            {/* 탭 메뉴 */}
            <div className="max-md:hidden">
              <TabMenuWrap userType={userType} tabList={TAB_LIST} />
            </div>
            {userType === 'none_member' ? (
              <NoneMemberBoardsSection id={id} />
            ) : (
              <>
                {/* <BoardsSection id={id} /> */}

                {/* 게시판, 공지 상세 페이지 */}
                {/* <BoardDetail /> */}

                {/* 게시판, 공지 등록 페이지 */}
                <RegisterBoard />
              </>
            )}
          </section>
        </ContentWrap>

        {/* 모바일에서 보이는 버튼 */}
        {userType === 'none_member' && (
          <div className="hidden gap-[1rem] max-md:flex items-center justify-center mt-[1.5rem] ">
            <NoneMemberIntroduceTopBtn />
          </div>
        )}
      </div>
    </main>
  );
}

//임시값
const DATA = {
  club_name: '독서모임',
  club_location: '강남 1호점',
  club_category: '직무계발',
  detailed_introduction: '월요일 저녁 8-11시 고정입니다. 각모코도 가끔 합니다',
};
//임시 타입
export interface ClubDetail {
  club_name: string;
  club_location: string;
  club_category: string;
  detailed_introduction: string;
}
