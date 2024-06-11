import ContentWrap from '@/app/common/components/frame/ContentWrap';
import EncourageLoginAlert from '@/app/common/components/modal/EncourageLoginAlert';
import { NoneMemberIntroduceTopBtn } from '@/app/community/components/club/clubDetail/IntroduceTopBtn';
import SectionBoard from '@/app/community/components/club/clubDetail/SectionBoard';
import SectionIntrduce from '@/app/community/components/club/clubDetail/SectionIntrduce';
import TabMenuWrap from '@/app/community/components/club/clubDetail/TabMenuWrap';
import { TAB_MOBILE_LIST } from '@/app/community/constants/clubDetail';
import { getClubDetailInfo, getMyMembership } from '@/app/service/clubDetail';
import { ClubMemberType, IClubMember } from '@/types/club/detail/clubDetail';
import { getSession } from '@/utils/getSession';

interface Props {
  children: React.ReactNode;
  params: {
    id: string;
    type: string;
  };
}

export default async function Layout({ children, params }: Props) {
  const clubId = Number(params.id);
  const session = await getSession();

  if (!session) {
    //로그인 유도
    return <EncourageLoginAlert />;
  }

  const userId = Number(session?.user?.id);

  const haveMembership = await getMyMembership();
  let userType: ClubMemberType = haveMembership ? 'NONE_MEMBER' : 'VISITOR';

  const data = await getClubDetailInfo(clubId);

  if (data?.member_id === userId) {
    userType = 'HOST';
  } else if (
    data?.club_members.find(
      ({ member_id }: IClubMember) => member_id === userId,
    )
  ) {
    userType = 'MEMBER';
  }

  return (
    <>
      <main className="pb-[11.25rem] px-[2.5rem]  max-md:px-[1.25rem] max-md:pb-[1.5rem]">
        <div className="max-md:py-[1.5rem] max-md:rounded-[1rem] max-md:bg-blue-50">
          <>
            {/* 모바일에서 보이는 탭메뉴 */}
            <div className="hidden max-md:block sticky bg-blue-50 top-[3.375rem] z-10">
              <TabMenuWrap
                current={params.type}
                userType={userType}
                tabList={TAB_MOBILE_LIST}
                clubId={clubId}
              />
            </div>
            <ContentWrap
              className={`flex justify-between [&_>_section]:h-[66.66vh] [&_>_section]:max-h-[45rem] [&_>_section]:min-h-[45rem] [&_>_section]:rounded-[1rem] [&_>_section]:bg-blue-50 [&_>_section]:box-border [&_>_section]:max-md:w-full
      ${
        userType === 'NONE_MEMBER' || userType === 'VISITOR'
          ? 'max-md:[&_>_section]:min-h-0 max-md:[&_>_section]:h-[calc(100vh_-_16.6225rem)] max-md:[&_>_section]:overflow-y-auto'
          : '[&_>_section]:max-md:max-h-[initial] max-md:[&_>_section]:min-h-0 max-md:[&_>_section]:h-auto max-md:[&_>_section]:overflow-y-visible'
      }
      `}
            >
              {/* 소개 */}
              <section
                className={`
                ${params.type == undefined || params.type === '' ? '' : 'max-md:hidden'} 
                ${userType === 'NONE_MEMBER' || userType === 'VISITOR' ? ' w-[66.11%]' : 'w-[40.72%]'}
                relative overflow-y-auto p-[2.5rem] max-md:static max-md:px-[1rem] max-md:py-[1.5rem]`}
              >
                <SectionIntrduce
                  id={clubId}
                  memberType={userType}
                  clubInfo={data!}
                />
              </section>

              {/* 게시판 */}
              <SectionBoard clubId={clubId} memberType={userType}>
                <div className="overflow-y-auto mt-[1.5rem] h-[calc(100%_-_6.9rem)]  max-md:mt-0 max-md:h-full max-md:overflow-y-visible">
                  {children}
                </div>
              </SectionBoard>
            </ContentWrap>

            {/* 모바일에서 보이는 버튼 */}
            {(userType === 'NONE_MEMBER' || userType === 'VISITOR') && (
              <div className="hidden gap-[1rem] max-md:flex items-center justify-center mt-[1.5rem] ">
                <NoneMemberIntroduceTopBtn
                  liked={data?.liked || false}
                  clubId={clubId}
                />
              </div>
            )}
          </>
        </div>
      </main>
    </>
  );
}
