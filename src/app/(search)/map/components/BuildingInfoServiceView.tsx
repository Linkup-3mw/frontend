import { Building, OfficeBuilding } from '@/types/office/office';
import Crt from './Chart';
import ReviewInfo from './ReviewInfo';
import ClubInfo from './ClubInfo';
import { useLineBreak } from '../hooks/useLineBreak';
import Link from 'next/link';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentBuildingState } from '../../atom/search';
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
  // const officeDetail = currentBuilding?.office_detail;

  const setCurrentBuilding = useSetRecoilState(currentBuildingState);

  return (
    <>
      <>
        <div className="flex flex-col gap-y-3 mb:w-[20.5rem] md:w-[26.6875rem] my-6 mx-auto">
          <div className="flex justify-between items-center mx-2">
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
          <div className="bg-white rounded-lg shadow-md p-4 md:w-[26.6875rem] mb:w-full">
            <div className="text-gray-800">
              {currentBuilding?.region} {currentBuilding?.city}{' '}
              {currentBuilding?.address}
            </div>
            <div className="text-gray-500">
              <span>{currentBuilding?.traffic_info}</span>
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
                {/* {officeDetail?.parking ? '주차 가능' : '주차 불가능'} */}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:w-full mb:w-full">
            <p className="mb:text-[1rem] md:text-lg font-bold leading-[1.75rem] ">
              좌석 유형
            </p>
            <div className="flex mb:h-[6.5rem] md:h-[8.5rem] gap-4 rounded-lg justify-start items-center">
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <div className="w-[3rem] h-[3rem] bg-gray-400 mb-2"></div>
                <p className="text-gray-700 text-center text-sm">오픈데스크</p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <div className="w-[3rem] h-[3rem] bg-gray-400 mb-2"></div>
                <p className="text-gray-700 text-center text-sm">오픈데스크</p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <div className="w-[3rem] h-[3rem] bg-gray-400 mb-2"></div>
                <p className="text-gray-700 text-center text-sm">오픈데스크</p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <div className="w-[3rem] h-[3rem] bg-gray-400 mb-2"></div>
                <p className="text-gray-700 text-center text-sm">오픈데스크</p>
              </div>
            </div>

            <p className="mb:text-[1rem] md:text-lg font-bold leading-[1.75rem] ">
              공간 유형
            </p>
            <div className="flex mb:h-[6.5rem] md:h-[8.5rem] gap-4 rounded-lg justify-start items-center">
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <div className="w-[3rem] h-[3rem] bg-gray-400 mb-2"></div>
                <p className="text-gray-700 text-center text-sm">오픈데스크</p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <div className="w-[3rem] h-[3rem] bg-gray-400 mb-2"></div>
                <p className="text-gray-700 text-center text-sm">오픈데스크</p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <div className="w-[3rem] h-[3rem] bg-gray-400 mb-2"></div>
                <p className="text-gray-700 text-center text-sm">오픈데스크</p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <div className="w-[3rem] h-[3rem] bg-gray-400 mb-2"></div>
                <p className="text-gray-700 text-center text-sm">오픈데스크</p>
              </div>
            </div>

            <p className="mb:text-[1rem] md:text-lg font-bold leading-[1.75rem] ">
              편의시설
            </p>
            <div className="flex mb:h-[6.5rem] md:h-[8.5rem] gap-4 rounded-lg justify-start items-center">
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <div className="w-[3rem] h-[3rem] bg-gray-400 mb-2"></div>
                <p className="text-gray-700 text-center text-sm">오픈데스크</p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <div className="w-[3rem] h-[3rem] bg-gray-400 mb-2"></div>
                <p className="text-gray-700 text-center text-sm">오픈데스크</p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <div className="w-[3rem] h-[3rem] bg-gray-400 mb-2"></div>
                <p className="text-gray-700 text-center text-sm">오픈데스크</p>
              </div>
              <div className="flex flex-col items-center bg-white mb:w-[4.75rem] md:w-[5.92188rem] mb:h-[4.5625rem] md:h-[6.125rem] rounded-lg shadow-md justify-center">
                <div className="w-[3rem] h-[3rem] bg-gray-400 mb-2"></div>
                <p className="text-gray-700 text-center text-sm">오픈데스크</p>
              </div>
            </div>
          </div>

          <p className="mb:text-[1rem] md:text-lg font-bold leading-[1.75rem]">
            해당 지점 직무/산업군 비율
          </p>
          <div className="flex gap-4 mx-auto">
            <Crt />
          </div>
          <div>{/* <ReviewInfo /> */}</div>
          <div>
            <ClubInfo />
          </div>
          <p className="mb:text-[1rem] md:text-lg font-bold leading-[1.75rem]">
            이용 규칙
          </p>
          <div className="mb:p-4 md:py-6 md:px-8 bg-white flex flex-col justify-start mb:text-[0.75rem] md:text-[1rem] mb:h-[4.8125rem] md:h-[6.75rem] rounded-2xl ">
            {rules}
          </div>
          <Link href={`/reservation/${id}`}>
            <div className="flex justify-center items-center">
              <button className="left-0 bottom-0 right-0 w-[5.5rem] h-[2.5rem] bg-blue-400 text-white rounded-2xl">
                예약하기
              </button>
            </div>
          </Link>
        </div>
      </>
    </>
  );
}
