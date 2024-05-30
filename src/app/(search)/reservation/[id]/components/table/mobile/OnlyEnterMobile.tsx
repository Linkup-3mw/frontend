import Image from 'next/image';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  selectedSpaceAllState,
  confirmedState,
  spaceListReservation,
} from '@/app/(search)/atom/office';
import { useMobileLayout } from '@/app/(search)/map/hooks/mobile/useMobileLayout';
import {
  minDeskLayoutState,
  mobileReservationLayoutState,
  showMobileTableState,
} from '@/app/(search)/atom/media';
import { useState } from 'react';

export default function OnlyEnterMobile() {
  const [selectedSpaceAll, setSelectedSpaceAll] = useRecoilState(
    selectedSpaceAllState,
  );
  const [isUp, setIsUp] = useState(false);

  const amTime = ['8:00', '9:00', '9:30', '10:30'];
  const pmTime = ['12:00', '12:30', '1:00', '1:30'];
  const setMobileTable = useSetRecoilState(showMobileTableState);

  useMobileLayout();

  const toggleUp = () => {
    setIsUp((prev) => !prev);
  };
  const isMobile = useRecoilValue(mobileReservationLayoutState);
  const minDesk = useRecoilValue(minDeskLayoutState);
  //기업전용지정좌석
  return (
    <>
      {isMobile && (
        <div className="">
          <Image
            className=""
            src="/images/office/1.jpeg"
            height={290}
            width={360}
            alt="요미"
          />
          <div>
            <div
              className={`overflow-y-scroll scrollbar-hide flex  flex-col items-center w-full pt-3 rounded-t-3xl bg-[#E4EEFF] min-w-[22.5rem] transition-transform duration-1000 absolute bottom-0 ${
                isUp ? 'translate-y-[120px]' : ''
              }`}
              style={{ height: isUp ? '49.25rem' : '30.75rem' }}
            >
              <div className=" ">
                <button
                  className="z-10 w-[2rem] h-[0.25rem] bg-[#BFD4FF]"
                  onClick={toggleUp}
                ></button>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[0.875rem] leading-5 font-bold">
                  이용 가능 공간입니다.
                </p>
                <div className="flex flex-wrap w-[20.5rem] gap-2">
                  {Array.from({ length: 30 }, (area, i) => i + 1).map(
                    (area, i) => {
                      const spaceNumber = `I-${String(area).padStart(2, '0')}`;
                      return (
                        <div key={i}>
                          <button
                            // onClick={() => handleSpaceClick(spaceNumber)}
                            className={`rounded-lg w-[3rem] h-[2rem] text-xs ${
                              selectedSpaceAll?.code === spaceNumber
                                ? 'bg-[#688AF2] text-white'
                                : 'bg-white'
                            }`}
                          >
                            {spaceNumber}
                          </button>
                        </div>
                      );
                    },
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-[0.875rem] leading-5 font-bold">
                    이용 가능 시간입니다.
                  </p>{' '}
                  <p className="font-bold text-[0.75rem] leading-[1.125rem]">
                    오전
                  </p>
                  <div className="flex flex-wrap w-[20.5rem] gap-2">
                    <div className="flex flex-wrap gap-2">
                      {amTime.map((am) => (
                        <button
                          key={am}
                          // onClick={() => {
                          //   handleSpaceTimeClick(am);
                          // }}
                          className={`rounded-lg w-[3rem] h-[2rem] text-xs ${
                            selectedSpaceAll?.start_time === am ||
                            selectedSpaceAll?.end_time === am
                              ? 'bg-[#688AF2] text-white'
                              : 'bg-white'
                          }`}
                        >
                          {am}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="font-bold text-[0.75rem] leading-[1.125rem]">
                      오후
                    </p>
                    <div className="flex flex-wrap gap-2 ">
                      {pmTime.map((pm) => (
                        <button
                          key={pm}
                          onClick={() => {
                            // handleSpaceTimeClick(pm);
                          }}
                          className={`rounded-lg w-[3rem] h-[2rem] text-xs ${
                            selectedSpaceAll?.start_time === pm ||
                            selectedSpaceAll?.end_time === pm
                              ? 'bg-[#688AF2] text-white'
                              : 'bg-white'
                          }`}
                        >
                          {pm}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[0.875rem] leading-5 font-bold">예약 정보</p>
                <div className="flex flex-col justify-between items-center mb-10 bg-white w-[20.5rem] h-[9.375rem] rounded-lg p-4">
                  <div className="w-[18.5rem] h-[3.875rem]">
                    <div className="flex gap-2 items-center">
                      <p className="text-xs text-gray-400">좌석 유형</p>
                      <p>{selectedSpaceAll?.type}</p>
                    </div>
                  </div>

                  <button
                    className="w-[5.75rem] h-[2.5rem] bg-[#688AF2] rounded-lg text-white"
                    onClick={() => setMobileTable(false)}
                  >
                    돌아가기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
