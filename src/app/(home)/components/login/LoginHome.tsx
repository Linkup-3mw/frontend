'use client';
import ContentWrap from '@common/components/frame/ContentWrap';

export default function ClubMain() {
  const ClubCard = () => {
    return (
      <>
        {/* 모바일 화면 */}
        <div className={`bg-white rounded-2xl relative p-4 block md:hidden`}>
          <div className="overflow-hidden relative flex">
            <div className="w-24 h-24 relative mb:mr-3 mr-2 flex-shrink-0">
              <img
                src="/images/club/example.jpg"
                alt="example.jpg"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center pb-1">
                <h3 className="font-bold text-sm truncate ...">소모임 제목</h3>
              </div>
              <p className="text-ellipsis overflow-hidden ... text-xs line-clamp-2">
                소모임 설명
              </p>

              <div className="text-xs mt-2 flex gap-2">
                <div className="flex items-center">
                  <img
                    src="/svg/club/locationIcon.svg"
                    alt="Location Icon"
                    className="mr-[.25rem] w-4"
                  />
                  <div className="font-bold">전국</div>
                </div>
                <div className="flex items-center font-bold">
                  <img
                    src="/svg/club/peoplesIcon.svg"
                    alt="Peoples Icon"
                    className="mr-[.25rem] w-4"
                  />
                  4/12
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs mt-4 font-semibold">
            <div className="flex gap-4">
              <div className="bg-yellow-600 p-[0.5rem] rounded leading-none">
                여행
              </div>
              <div className="bg-yellow-600 p-[0.5rem] rounded leading-none">
                모임 D-4
              </div>
            </div>
          </div>
        </div>
        {/* PC 화면 */}
        <div
          className={`hidden md:block bg-white rounded-2xl overflow-hidden relative`}
        >
          <div className="h-[22.4rem] relative">
            <img
              src="/images/club/example.jpg"
              alt="example.jpg"
              className="object-cover absolute inset-0 "
            />
            <div className="absolute bottom-0 w-full p-4 bg-white backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">소모임 제목</h3>
              </div>
              <p className="mt-2 overflow-hidden overflow-ellipsis">
                소모임 설명
              </p>
              <div className="text-xs mt-2 flex gap-4">
                <div className="flex items-center">
                  <img
                    src="/svg/club/locationIcon.svg"
                    alt="Location Icon"
                    className="mr-1"
                  />
                  <div>전국</div>
                </div>
                <div className="flex items-center">
                  <img
                    src="/svg/club/peoplesIcon.svg"
                    alt="Peoples Icon"
                    className="mr-1"
                  />
                  5/12
                </div>
              </div>
              <div className="flex justify-between items-center text-xs mt-2 font-semibold">
                <div className="flex gap-4">
                  <div className="bg-yellow-600 p-[0.5rem] rounded">여행</div>
                  <div className="bg-yellow-600 p-[0.5rem] rounded">
                    모임 D-4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <main className="md:pt-[7rem] pt-[5rem] px-[1.25rem] relative">
      <section className="">
        <ContentWrap>
          <div className="md:flex gap-[1.5rem]">
            <div className="bg-blue-50 rounded-2xl md:p-[2.5rem] p-4 relative md:w-3/5">
              <div className="md:flex gap-[1.5rem]">
                <section className="bg-white rounded-2xl md:p-[2.5rem] p-4 relative md:w-3/5 mb-[1rem] md:mb-[0rem] md:text-2xl text-lg font-bold">
                  OOO님 반갑습니다! Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Architecto sint porro ipsum doloribus
                  repudiandae aspernatur mollitia sequi molestias autem. Tenetur
                  ad officia itaque iure voluptate accusantium neque voluptatum
                  laborum repudiandae!
                </section>
                <div className="md:w-2/5 flex flex-col">
                  <section className="bg-white rounded-2xl md:p-[2.5rem] p-4 relative mb-[1rem] md:text-sm text-xs md:h-1/2">
                    이용중
                  </section>
                  <section className="bg-white rounded-2xl md:p-[2.5rem] p-4 relative md:text-sm text-xs md:h-1/2">
                    최근 이용한 오피스
                  </section>
                </div>
              </div>
              <section className="bg-white rounded-2xl md:p-[2rem] p-4 relative mt-[1rem] md:mt-[1.5rem]">
                <h2 className="md:text-2xl text-lg font-bold mb-4">소모임</h2>
                <div className="border-t border-gray-200 mb-4"></div>
                <div className="md:flex gap-[1.5rem]">
                  {/* 소모임 카드 2개 */}
                  <div className="md:w-1/2">
                    <ClubCard />
                  </div>
                  <div className="md:w-1/2">
                    <ClubCard />
                  </div>
                </div>
              </section>
            </div>
            <section className="bg-blue-50 rounded-2xl md:p-[2.5rem] md:mt-[0rem] mt-[1.5rem] p-4 relative md:w-2/5">
              <div className="bg-white rounded-2xl md:p-[2.5rem] p-4 relative md:text-sm text-xs h-full">
                예약 일정
              </div>
            </section>
          </div>
        </ContentWrap>
      </section>
    </main>
  );
}
