import React, { useState } from 'react';
import {
  mobileConfirmedState,
  seatListReservation,
  selectedSeatAllState,
  selectedSpaceAllState,
} from '@/app/(search)/atom/office';
import { showMobileTableState } from '@/app/(search)/atom/media';
import Image from 'next/image';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { mobileReservationLayoutState } from '@/app/(search)/atom/media';
import { useMobileLayout } from '@/app/(search)/map/hooks/mobile/useMobileLayout';

export default function ReservedMobile() {
  const [selectedSeatAll, setSelectedSeatAll] =
    useRecoilState(selectedSeatAllState);
  const [isUp, setIsUp] = useState(false);
  const isMobile = useRecoilValue(mobileReservationLayoutState);
  const [seatList, setSeatList] = useRecoilState(seatListReservation);
  const setMobileConfirm = useSetRecoilState(mobileConfirmedState);
  const setMobileTable = useSetRecoilState(showMobileTableState);
  useMobileLayout();
  const handleSeatReady = () => {
    if (
      selectedSeatAll?.start_date &&
      selectedSeatAll?.type &&
      selectedSeatAll?.code
    ) {
      if (seatList.length < 5) {
        setSeatList([...seatList, { ...selectedSeatAll }]);
        setSelectedSeatAll({
          start_date: '',
          end_date: '',
          code: '',
        });
        setMobileConfirm(true);
        setMobileTable(false);
      } else {
        return;
      }
    }
  };

  const handleSeatClick = (seatNumber: string) => {
    setSelectedSeatAll((prev) => ({
      ...prev,
      code: seatNumber,
      start_date: prev?.start_date || '',
      end_date: prev?.end_date || '',
      type: prev?.type || '',
    }));
  };

  const toggleUp = () => {
    setIsUp((prev) => !prev);
  };

  return (
    <>
      {isMobile && (
        <div className="">
          <Image
            className=""
            src="/images/office/1.jpeg"
            height={293}
            width={360}
            alt="요미"
          />
          <div>
            <div
              className={`overflow-y-scroll scrollbar-hide flex  flex-col items-center w-full pt-3 rounded-t-3xl bg-[#E4EEFF] min-w-[22.5rem] transition-transform duration-1000 absolute bottom-0 ${
                isUp ? 'translate-y-[90px]' : ''
              }`}
              style={{ height: isUp ? '42.25rem' : '30.75rem' }}
            >
              <div className="z-40 ">
                <button
                  className="z-10 w-[2rem] h-[0.25rem] bg-[#BFD4FF]"
                  onClick={toggleUp}
                ></button>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[0.875rem] leading-5 font-bold">
                  좌석을 선택하세요
                </p>
                <div className="flex flex-wrap w-[20.5rem] gap-2">
                  {Array.from({ length: 30 }, (area, i) => i + 1).map(
                    (area, i) => {
                      const spaceNumber = `H-${String(area).padStart(2, '0')}`;
                      return (
                        <div key={i}>
                          <button
                            onClick={() => handleSeatClick(spaceNumber)}
                            className={`rounded-lg w-[3rem] h-[2rem] text-xs ${
                              selectedSeatAll?.code === spaceNumber
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

                <p className="text-[0.875rem] leading-5 font-bold">예약 정보</p>
                <div className="flex flex-col justify-between items-center mb-10 bg-white w-[20.5rem] h-[9.375rem] rounded-lg p-4">
                  <div className="w-[18.5rem] h-[3.875rem]">
                    <div className="flex gap-3 items-center">
                      <p className="text-xs text-gray-400">날짜</p>
                      <p>
                        {selectedSeatAll?.start_date} -{' '}
                        {selectedSeatAll?.end_date}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex gap-2 items-center">
                        <p className="text-xs text-gray-400">좌석 유형</p>
                        <p>{selectedSeatAll?.type}</p>
                      </div>

                      <div className="flex gap-2 items-center">
                        <p className="text-xs text-gray-400">좌석 번호</p>
                        <p>{selectedSeatAll?.code}</p>
                      </div>
                    </div>
                  </div>
                  {selectedSeatAll?.start_date &&
                  selectedSeatAll?.type &&
                  selectedSeatAll?.code ? (
                    <button
                      className="w-[5.75rem] h-[2.5rem] bg-[#688AF2] rounded-lg text-white"
                      onClick={handleSeatReady}
                    >
                      확정
                    </button>
                  ) : (
                    <button
                      className="w-[5.75rem] h-[2.5rem] bg-[#A3A3AF] rounded-lg text-white"
                      onClick={handleSeatReady}
                    >
                      확정
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
