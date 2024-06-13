import Image from 'next/image';
import ContentWrap from '@common/components/frame/ContentWrap';
import API from '@/utils/axios';
import { dateBar, dateDot } from '@/utils/utils';
import { IUser } from '@/types/user';
import ReservationSchedule from './ReservationSchedule';
import Link from 'next/link';

export default async function HomePage({ user }: { user: IUser }) {
  const today = dateBar(new Date().toISOString());

  // const res = await API.get(`/reservation?date=2024-06-28`);
  const res = await API.get(`/reservation?date=${today}`);
  const data = res?.data?.data[0];

  const {
    data: { data: recentData },
  } = await API.get(`/reservation/recent`);

  const imgPuzzle = [
    '/images/home/yellow_puzzle.png',
    '/images/home/green_puzzle.png',
    '/images/home/img_puzzle.png',
  ];
  const highResolutionUrls = imgPuzzle.map((url) =>
    url.replace('SX300', 'SX1400'),
  );
  return (
    <main className="md:pt-[7rem] py-[5rem] px-[1.25rem] relative">
      <section>
        <ContentWrap>
          <div className="md:flex gap-[1.5rem]">
            <section className="bg-blue-50 rounded-2xl p-[2.5rem] relative w-[66.12%] max-xl:p-[1.5rem] max-md:w-full max-md:p-[1rem]">
              <div className="md:flex gap-[1.5rem]">
                <div
                  className={`overflow-hidden relative  pt-[3.5rem] p-[2rem] bg-white rounded-2xl font-bold max-md:w-full max-md:mb-[1rem] max-md:py-[1.5rem] max-md:px-[1rem]
                  ${data ? 'w-[65.99%]' : 'w-full'}
                  `}
                >
                  <h2 className="mb-[1.5rem] text-[2.5rem] max-md:text-[1.5rem] max-md:leading-[2.125rem]">
                    {user.name}
                    <span className="max-md:hidden">님 반갑습니다.</span>
                    <span className="max-md:inline hidden">
                      님<br />
                      좋은 하루 보내세요.
                    </span>
                  </h2>
                  <p className="text-[1.25rem] text-gray-500 max-md:text-[1rem]">
                    오늘 하루도 힘차게 아자아자아자
                  </p>
                  {data ? (
                    <div className="mt-[2rem] leading-none">
                      <div className="flex items-center gap-[1rem] mb-[1rem]  max-md:mb-[0.5rem]">
                        <span className="max-md:text-[0.875rem]">이용권</span>
                        <i className="p-[0.5rem] rounded-full bg-black text-[0.875rem] not-italic leading-none text-white max-md:text-[0.675rem]">
                          {data.location}
                        </i>
                      </div>
                      <p className="mb-[1.5rem] text-[1.5rem] font-bold max-md:text-[1.2rem]">
                        {data.membership_type} 사용 중
                      </p>
                      <span className="block mb-[1rem] text-[1rem] max-md:mb-[0.5rem] max-md:text-[0.875rem]">
                        이용기간
                      </span>
                      <b className="block text-[1.5rem] max-md:text-[1.2rem]">
                        {dateDot(data.start_date)}{' '}
                        {data.membership_type === '1일 패스' ||
                          `- ${dateDot(data.end_date)}`}
                      </b>
                      <Link
                        className="mt-[1rem] inline-block px-[1rem] py-[1rem] bg-blue-400 text-white rounded-[0.5rem] leading-none text-[1.25rem] max-md:p-[0.5rem] max-md:text-[1rem] max-md:rounded-[0.25rem]"
                        href={`/reservation/myMembership/resertory/${data.reservation_id}`}
                      >
                        예약내역
                      </Link>
                    </div>
                  ) : (
                    <div className="pt-[2.5rem] text-[1.25rem] text-blue-400 max-md:text-[0.875rem]">
                      이용 중인 공유 오피스가 없습니다.
                      <br /> 예약을 진행해보세요.
                      <br />
                      <Link
                        className="mt-[1rem] inline-block px-[2.19rem] py-[1rem] bg-blue-400 text-white rounded-[0.5rem] leading-none text-[1.25rem] max-md:p-[0.5rem] max-md:text-[1rem] max-md:rounded-[0.25rem]"
                        href={'/map'}
                      >
                        지점 탐색하기 &gt;
                      </Link>
                    </div>
                  )}
                  <Image
                    className={`absolute rotate-[5deg] 
                    ${!data ? 'w-[9.617rem] top-[initial] bottom-[-2rem] right-[13rem] rotate-[15deg] max-md:hidden' : 'w-[7.6321rem] top-[3rem] right-0 max-md:top-[initial] max-md:bottom-[5rem] max-md:w-[6rem]'}
                    `}
                    // src="/images/home/yellow_puzzle.png"
                    src={highResolutionUrls[0]}
                    width={200}
                    height={50}
                    alt="yellow puzzle"
                  />

                  <Image
                    className={`absolute 
                    ${!data ? 'w-[7.617rem] top-[0.7rem] right-[12.7rem] rotate-[10deg] max-md:hidden' : 'hidden'}
                    `}
                    // src="/images/home/green_puzzle.png"
                    src={highResolutionUrls[1]}
                    width={200}
                    height={50}
                    alt="green puzzle"
                  />
                  <Image
                    className={`absolute  rotate-[5deg] max-md:top-[initial] max-md:bottom-[1rem] max-md:w-[10rem]
                      ${!data ? 'w-[24.1978rem] top-[4.19rem] right-[-0.3rem]' : 'w-[15.6321rem] right-[-0.2rem] top-[6.5rem]'}
                    `}
                    // src="/images/home/img_puzzle.png"
                    src={highResolutionUrls[2]}
                    width={200}
                    height={50}
                    alt="puzzle"
                  />
                </div>

                {data && (
                  <div className="w-[30.6%] flex flex-col max-md:w-full gap-[1rem]">
                    {/* 이용중인 오피스 */}
                    <div
                      className={`bg-white rounded-2xl md:p-[1.5rem] p-4 relative md:text-sm text-xs  ${recentData?.location ? 'h-1/2' : 'h-full'}`}
                    >
                      <span className="text-gray-600">이용중</span>
                      <span className="flex items-center mb-[2rem]">
                        <b className="text-[1.25rem] max-md:text-[0.75rem]">
                          {data.location}
                        </b>
                        <Image
                          width={24}
                          height={24}
                          src="/svg/club/locationIcon.svg"
                          alt="위치"
                          className="mr-[0.5rem] w-[1.5rem] h-[1.5rem] max-md:w-[1rem] max-md:h-[1rem]"
                        />
                      </span>
                      <i className="not-italic text-[0.75rem] font-bold text-gray-800">
                        {data.reservation_type}
                      </i>
                      <b className="block mt-[1rem] text-[1.25rem]">
                        {data.seat_code}
                      </b>
                    </div>

                    {/* 최근 이용한 오피스 */}
                    {recentData?.location && (
                      <div
                        className={`bg-white rounded-2xl md:p-[1.5rem] p-4 relative md:text-sm text-xs h-1/2`}
                      >
                        <span className="text-gray-600">
                          최근 이용한 오피스
                        </span>
                        <span className="flex items-center mb-[2rem]">
                          <b className="text-[1.25rem] max-md:text-[0.75rem]">
                            {recentData.location}
                          </b>
                          <Image
                            width={24}
                            height={24}
                            src="/svg/club/locationIcon.svg"
                            alt="위치"
                            className="mr-[0.5rem] w-[1.5rem] h-[1.5rem] max-md:w-[1rem] max-md:h-[1rem]"
                          />
                        </span>
                        <i className="not-italic text-[0.75rem] font-bold text-gray-800 leading-none">
                          {recentData.reservation_type}
                        </i>
                        <b className="block mt-[1rem] text-[1.25rem] leading-none">
                          {recentData.seat_code}
                        </b>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="bg-white rounded-2xl md:p-[2rem] p-4 relative mt-[1rem] md:mt-[1.5rem]">
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
              </div>
            </section>

            {/* 예약일정 */}
            <section className="bg-blue-50 rounded-2xl p-[2.5rem] md:mt-[0rem] mt-[1.5rem] relative w-[32.3%] max-xl:p-[1.5rem] max-md:w-full max-md:p-[1rem]">
              <ReservationSchedule />
            </section>
          </div>
        </ContentWrap>
      </section>
    </main>
  );
}

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
                <div className="bg-yellow-600 p-[0.5rem] rounded">모임 D-4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
