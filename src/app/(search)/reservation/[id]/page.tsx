'use client';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentBuildingState } from '../../atom/search';
import { selectedSeatAllState, selectedSpaceAllState } from '../../atom/office';
import {
  mobileReservationLayoutState,
  showMobileTableState,
} from '../../atom/media';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import SeatInformation from './components/SeatInfomation';
import ReservationInfo from './components/ReservationInfo';
import OpenTableMobile from './components/table/mobile/OpenTableMobile';
import API from '@/utils/axios';

export default function Reservation(params: string) {
  const [isMobile, setIsMobile] = useRecoilState(mobileReservationLayoutState);
  const currentBuilding = useRecoilValue(currentBuildingState);
  const showMobileTable = useRecoilValue(showMobileTableState);
  const selectedSeatAll = useRecoilValue(selectedSeatAllState);
  const selectedSpaceAll = useRecoilValue(selectedSpaceAllState);

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
      <div className="mt-[5rem] md:flex justify-center">
        <div className="md:flex md:w-[95rem] mb:w-full mx-auto pt-2 gap-4">
          <div className="flex justify-center">
            {/* 패스구입  UI*/}
            {!showMobileTable && <ReservationInfo />}
          </div>
          <div>{!showMobileTable && <SeatInformation />}</div>
        </div>
      </div>
      <div>
        {showMobileTable && (
          <>
            <div className="">
              <OpenTableMobile
                selectedSeatAll={selectedSeatAll!}
                selectedSpaceAll={selectedSpaceAll!}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
