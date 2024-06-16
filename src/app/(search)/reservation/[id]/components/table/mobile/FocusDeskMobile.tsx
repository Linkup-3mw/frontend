import React, { useEffect, useState } from 'react';
import {
  mobileConfirmedState,
  searchRemainingState,
  seatListReservation,
} from '@/app/(search)/atom/office';
import { loadingState, showMobileTableState } from '@/app/(search)/atom/media';
import { selectedSeatAllState } from '@/app/(search)/atom/office';
import Image from 'next/image';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { mobileReservationLayoutState } from '@/app/(search)/atom/media';

export default function FocusDeskMobile() {
  const [selectedSeatAll, setSelectedSeatAll] =
    useRecoilState(selectedSeatAllState);
  const [isUp, setIsUp] = useState(false);
  const remaining = useRecoilValue(searchRemainingState);
  const [seatClick, setSeatClick] = useState(false);
  const isMobile = useRecoilValue(mobileReservationLayoutState);
  const [seatList, setSeatList] = useRecoilState(seatListReservation);
  const [loading, setLoading] = useRecoilState(loadingState);
  const setMobileConfirm = useSetRecoilState(mobileConfirmedState);
  const setMobileTable = useSetRecoilState(showMobileTableState);

  const handleSeatReady = () => {
    if (
      selectedSeatAll?.start_date &&
      selectedSeatAll?.end_date &&
      selectedSeatAll?.type &&
      selectedSeatAll?.code
    ) {
      if (seatList.length < 5) {
        setSeatList([...seatList, { ...selectedSeatAll }]);
        setMobileConfirm(true);
        setMobileTable(false);
      } else {
        return;
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [setLoading]);
  const handleSeatMobileClick = (seatNumber: string) => {
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
      <div className="hidden-desk h-[51.5rem] mx-auto">
        <div className="w-full mx-auto">
          <Image
            layout="responsive"
            src="/svg/reservation/imageView/mobile/FocusDeskMobile.svg"
            height={290}
            width={360}
            alt="요미"
          />
        </div>

        <div className="w-full bottom-0">
          <div
            onClick={toggleUp}
            className={`overflow-y-scroll bottom-10 mt-[6rem] scrollbar-hide  flex flex-col items-center  pt-3 rounded-t-3xl  bg-[#E4EEFF] w-full transition-transform duration-1000 ${
              isUp ? 'translate-y-[-120px]' : 'translate-y-[-200px]'
            }`}
            style={{ height: isUp ? '42.25rem' : '32.25rem' }}
          >
            <div className="">
              <div className="w-[2rem] h-[0.25rem] bg-[#BFD4FF]"></div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="mt-4 text-md leading-5 font-bold">
                좌석을 선택해주세요.
              </p>
              <div className="flex flex-wrap w-[20.5rem] gap-2">
                {remaining.map((seat, i) => (
                  <div key={i}>
                    <button
                      onClick={
                        seat.available
                          ? () => handleSeatMobileClick(seat.id)
                          : undefined
                      }
                      className={`rounded-lg w-[3rem] h-[2rem] text-xs ${
                        seat.available
                          ? seatClick
                            ? 'bg-[#688AF2] text-white'
                            : 'bg-white'
                          : 'bg-gray-400 text-black cursor-not-allowed'
                      }`}
                      disabled={!seat.available}
                    >
                      {seat.code}
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-[0.875rem] leading-5 font-bold">예약 정보</p>
              <div className="flex flex-col justify-between items-center mb-10 bg-white w-[20.5rem] h-[9.375rem] rounded-lg p-4">
                <div className="w-[18.5rem] h-[3.875rem]">
                  <div className="flex gap-2 items-center">
                    <p className="text-xs text-gray-400">날짜</p>
                    <p>{selectedSeatAll?.start_date}</p>
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
                <button
                  className={`w-[5.75rem] h-[2.5rem] rounded-lg text-white ${
                    selectedSeatAll?.start_date &&
                    selectedSeatAll?.type &&
                    selectedSeatAll?.code
                      ? 'bg-[#688AF2]'
                      : 'bg-[#A3A3AF]'
                  }`}
                  onClick={handleSeatReady}
                >
                  확정
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
