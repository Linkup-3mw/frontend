'use client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedSeatAllState, selectedSpaceAllState } from '../../atom/office';
import {
  mobileReservationLayoutState,
  showMobileTableState,
} from '../../atom/media';
import SeatInformation from './components/SeatInfomation';
import ReservationInfo from './components/ReservationInfo';
import OpenTableMobile from './components/table/mobile/OpenTableMobile';
import { modalState } from '../../atom/search';
import ReservationSuccess from './components/table/modal/ReservationSuccess';

export default function Reservation() {
  const [isMobile, setIsMobile] = useRecoilState(mobileReservationLayoutState);
  const showMobileTable = useRecoilValue(showMobileTableState);
  const selectedSeatAll = useRecoilValue(selectedSeatAllState);
  const selectedSpaceAll = useRecoilValue(selectedSpaceAllState);
  const [modal, setModal] = useRecoilState(modalState);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 550);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsMobile]);

  return (
    <>
      <div className="mx-auto mt-[5rem] md:flex justify-center">
        <div className="md:flex md:w-[95rem] mb:w-full mx-auto pt-2 gap-4">
          <div className="flex justify-center">
            {/* 패스구입 UI */}
            {!showMobileTable && <ReservationInfo />}
          </div>
          <div>{!showMobileTable && <SeatInformation />}</div>
        </div>
      </div>
      <div>
        <div className="absolute right-[5.44rem] top-[2rem] z-[201]">
          {modal && <ReservationSuccess />}
        </div>
        {showMobileTable && (
          <>
            <OpenTableMobile />
          </>
        )}
      </div>
    </>
  );
}
