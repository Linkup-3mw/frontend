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
  // api/v1/reservation/{office_id}?type={string}&start={(string)연도-월-일}&end={string}
  // useEffect(() => {
  //   const fetchBuildingsData = async () => {
  //     try {
  //       const response = await API.get('/office/search');
  //       const seatData = response;
  //       // setOfficeBuildings(content);
  //       // console.log('officeBuildings2@@@', content);
  //       console.log('seatData', seatData);
  //     } catch (error) {
  //       console.error('Error fetching buildings data:', error);
  //     }
  //   };

  //   fetchBuildingsData();
  // }, []);
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
