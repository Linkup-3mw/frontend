'use client';
import OpenTableMobile from './components/table/mobile/OpenTableMobile';
import { showMobileTableState } from '../../atom/media';
import SeatInformation from './components/SeatInfomation';
import ReservationInfo from './components/ReservationInfo';
import { useRecoilValue } from 'recoil';
import { currentBuildingState } from '../../atom/search';
import { selectedSeatAllState, selectedSpaceAllState } from '../../atom/office';

interface ReservationParamProps {
  params: { id: string };
}

export default function Reservation({ params }: ReservationParamProps) {
  const currentBuilding = useRecoilValue(currentBuildingState);

  const id = params.id;
  const showMobileTable = useRecoilValue(showMobileTableState);
  const selectedSeatAll = useRecoilValue(selectedSeatAllState);
  const selectedSpaceAll = useRecoilValue(selectedSpaceAllState);

  return (
    <>
      <div className="mt-[5rem] md:flex justify-center">
        <div className="md:flex md:w-[95rem] mb:w-full mx-auto pt-2 gap-4">
          <div className="flex justify-center">
            {/* 패스구입  UI*/}
            {!showMobileTable && (
              <ReservationInfo
                BuildingId={id}
                currentBuilding={currentBuilding!}
              />
            )}
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
