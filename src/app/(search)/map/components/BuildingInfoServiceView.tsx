import { Building, OfficeBuilding } from '@/types/office/office';
import Crt from './Chart';
import ReviewInfo from './ReviewInfo';
import ClubInfo from './ClubInfo';
import { useLineBreak } from '../hooks/useLineBreak';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { currentBuildingState, modalState } from '../../atom/search';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

interface OfficeBuildingServiceViewProps {
  currentBuilding: Building | null;
}

export default function BuildingServiceView({
  currentBuilding,
}: OfficeBuildingServiceViewProps) {
  const rule =
    '사용한 자리는 다음 이용자를 위해 정리 부탁드립니다. 셀프바에서 커피와 차를 마음껏 드실 수 있습니다. 라운지에서만 대화가 가능합니다.';
  const rules = useLineBreak({ content: rule });
  const id = currentBuilding?.id;
  const setModal = useSetRecoilState(modalState);
  const setCurrentBuilding = useSetRecoilState(currentBuildingState);
  const router = useRouter();

  const handleReservationClick = async () => {
    const session = await getSession();
    if (!session) {
      setModal(true);
    } else if (session) {
      router.push(`/reservation/${id}`);
    }
  };

  return (
    <>
      <>
        <div className="flex flex-col gap-y-6 my-6 md:w-[26.6875rem] max-md:w-[20.5rem]">
          <div className="flex justify-between items-center mx-2 ">
            <p className="text-black text-lg font-bold leading-[1.75rem]">
              {currentBuilding?.location}
            </p>
            <Image
              className="btn-hidden"
              onClick={() => setCurrentBuilding(null)}
              src="/svg/reservation/cancel.svg"
              width={24}
              height={24}
              alt="취소"
            />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 ">
            <div className="text-gray-800">
              {currentBuilding?.region} {currentBuilding?.city}
              {currentBuilding?.address}
            </div>
            <div className="text-gray-500">
              <span className="text-gray-800">
                {currentBuilding?.traffic_info}
              </span>
            </div>
            <div className="flex justify-start mt-2">
              <span className="leading-2 text-gray-400">수용 인원</span>
              &nbsp;&nbsp;
              <span className="text-gray-800">
                {currentBuilding?.capacity} 명
              </span>
            </div>
            <div className="flex justify-start mt-2">
              <span className="leading-2 text-gray-400">시설 이용</span>
              &nbsp;&nbsp;
              <span className="text-gray-800">
                {currentBuilding?.capacity ? '주차 가능' : '주차 불가능'}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:w-full mb:w-full">
            <p className="mb:text-[1rem] md:text-lg font-bold leading-[1.75rem] ">
              좌석 유형
            </p>
            <div className="flex mb:h-[6.5rem] md:h-[8.5rem] gap-4 rounded-lg justify-start items-center">
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/reservation/opendesk.svg"
                  width={50}
                  height={50}
                  alt="오픈데스크"
                />
                <p className="text-gray-700 text-center  md:text-sm mb:text-[0.7rem]">
                  오픈데스크
                </p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/reservation/focusdesk.svg"
                  width={50}
                  height={50}
                  alt="포커스데스크"
                />
                <p className="text-gray-700 text-center  md:text-sm mb:text-[0.7rem]">
                  포커스데스크
                </p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/reservation/oneroom.svg"
                  width={50}
                  height={50}
                  alt="oneroom"
                />
                <p className="text-gray-700 text-center  md:text-sm mb:text-[0.7rem]">
                  1인실
                </p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/reservation/monitordesk.svg"
                  width={50}
                  height={50}
                  alt="모니터데스크"
                />
                <p className="text-gray-700 text-center  md:text-sm mb:text-[0.7rem]">
                  모니터데스크
                </p>
              </div>
            </div>

            <p className="mb:text-[1rem] md:text-lg font-bold leading-[1.75rem] ">
              공간 유형
            </p>
            <div className="flex mb:h-[6.5rem] md:h-[8.5rem] gap-4 rounded-lg justify-start items-center">
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/reservation/mettingRoom4.svg"
                  width={50}
                  height={50}
                  alt="미팅룸4"
                />
                <p className="text-gray-700 text-center leading-5 md:text-sm mb:text-[0.7rem]">
                  미팅룸(4인)
                </p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/reservation/mettingRoom8.svg"
                  width={50}
                  height={50}
                  alt="미팅룸8"
                />
                <p className="text-gray-700 text-center leading-5 md:text-sm mb:text-[0.7rem]">
                  미팅룸(8인)
                </p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/reservation/seminar.svg"
                  width={50}
                  height={50}
                  alt="oneroom"
                />
                <p className="text-gray-700 text-center leading-5 md:text-sm mb:text-[0.7rem]">
                  컨퍼런스룸
                </p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/reservation/studio.svg"
                  width={50}
                  height={50}
                  alt="스튜디오"
                />
                <p className="text-gray-700 text-center leading-5  md:text-sm mb:text-[0.7rem]">
                  스튜디오
                </p>
              </div>
            </div>

            <p className="mb:text-[1rem] md:text-lg font-bold leading-[1.75rem] mb-4">
              편의 시설
            </p>
            <div className="flex mb:h-[6.5rem] w-full flex-wrap md:h-[8.5rem] md:gap-4 mb:gap-2 rounded-lg justify-start items-center">
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/map/service/rounge.svg"
                  width={100}
                  height={100}
                  alt="라운지"
                />
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/map/service/phoneBooth.svg"
                  width={100}
                  height={100}
                  alt="폰부스"
                />
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/map/service/relax.png"
                  width={100}
                  height={100}
                  alt="릴랙스"
                />
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/map/service/OA.svg"
                  width={40}
                  height={70}
                  alt="OA"
                />
                <p className="text-gray-700 text-center  md:text-sm mb:text-[0.7rem] font-bold">
                  OA룸
                </p>
              </div>

              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/map/service/snackbar.svg"
                  width={100}
                  height={100}
                  alt="snackbar"
                />
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/map/service/coffee.svg"
                  width={100}
                  height={100}
                  alt="coffee"
                />
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/map/service/beer.svg"
                  width={40}
                  height={70}
                  alt="beer"
                />
                <p className="text-gray-700 text-center text-xs font-bold">
                  맥주
                </p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <Image
                  src="/svg/map/service/postBox.svg"
                  width={40}
                  height={70}
                  alt="OA"
                />
                <p className="text-gray-700 text-center  md:text-sm mb:text-[0.7rem] font-bold">
                  우편함
                </p>
              </div>
              <div className="flex flex-col gap-8 justify-center items-center md:w-full mb:w-full ">
                <div className="mt-5 w-full mb:p-4 md:py-6 md:px-8 bg-white flex flex-col justify-start mb:text-[0.75rem] md:text-[1rem]  rounded-2xl">
                  {rules}
                </div>
                <div
                  onClick={() => handleReservationClick()}
                  className="w-[5.5rem]  mb-10 bg-blue-400 px-4 py-2 rounded-lg text-white font-bold text-md text-center cursor-pointer"
                >
                  예약하기
                </div>
              </div>
            </div>
          </div>

          {/* <p className="mb:text-[1rem] md:text-lg font-bold leading-[1.75rem]">
            해당 지점 직무/산업군 비율
          </p> */}
          {/* <div className="flex gap-4 mx-auto">
            <Crt />
          </div> */}
          {/*<div> <ReviewInfo /> </div>*/}
          {/* <div>
            <ClubInfo />
          </div> */}
        </div>
      </>
    </>
  );
}
