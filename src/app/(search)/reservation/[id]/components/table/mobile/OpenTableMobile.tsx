import { SeatReservation, SpaceReservation } from '@/types/office/reservation';
import OpenDeskMobile from './OpenDeskMobile';
import FocusDeskMobile from './FocusDeskMobile';
import OneRoomMobile from './OneRoomMobile';
import MonitorDeskMobile from './MonitorDeskMobile';
import ReservedMobile from './ReservedMobile';
import OnlyEnterMobile from './OnlyEnterMobile';
import MettingRoom4Mobile from './MettingRoom4Mobile';
import MeetingRoom8Mobile from './MeetingRoom8Mobile';
import SeminarRoomMobile from './SeminarRoomMobile';
import StudioMobile from './StudioMobile';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Rtab,
  searchRemainingState,
  seatListReservation,
  selectedSeatAllState,
  selectedSpaceAllState,
  spaceListReservation,
} from '@/app/(search)/atom/office';
import { useEffect } from 'react';
import { currentBuildingState } from '@/app/(search)/atom/search';
import API from '@/utils/axios';

// opentalemobile -> opendeskmobile

export default function OpenTableMobile() {
  const RTab = useRecoilValue(Rtab);
  const currentOffice = useRecoilValue(currentBuildingState);
  const [seatList, setSeatList] = useRecoilState(seatListReservation);
  const [spaceList, setSpaceList] = useRecoilState(spaceListReservation);
  const [searchRemaining, setSearchRemaining] =
    useRecoilState(searchRemainingState);
  const [selectedSeatAll, setSelectedSeatAll] =
    useRecoilState(selectedSeatAllState);
  const [selectedSpaceAll] = useRecoilState(selectedSpaceAllState);
  useEffect(() => {
    const id = currentOffice?.id;

    const fetchRemainingData = async () => {
      console.log('요청요청요청');
      console.log(selectedSeatAll, id);
      if (RTab === '좌석') {
        try {
          const response = await API.get(
            `reservation/${id}?type=${selectedSeatAll?.type}&start=${selectedSeatAll?.start_date}&end=${selectedSeatAll?.end_date}`,
          );
          console.log('Response:', response.data.data);
          setSearchRemaining(response.data.data);
        } catch (error) {
          console.error('Error fetching seat data:', error);
        }
      } else if (RTab === '공간') {
        try {
          console.log(selectedSpaceAll, id);
          const response = await API.get(
            `reservation/${id}?type=${selectedSpaceAll?.type}&start=${selectedSpaceAll?.start_date}&end=${selectedSpaceAll?.end_date}`,
          );
          console.log('Response:', response.data.data);
          setSearchRemaining(response.data.data);
        } catch (error) {
          console.error('Error fetching space data:', error);
        }
      }
    };

    fetchRemainingData();
  }, []);
  function ReservationTableStyleSeat({
    selectedSeatAll,
  }: {
    selectedSeatAll: SeatReservation;
  }) {
    if (selectedSeatAll && selectedSeatAll.type) {
      switch (selectedSeatAll.type) {
        case '오픈데스크':
          return <OpenDeskMobile />;
        case '포커스데스크':
          return <FocusDeskMobile />;
        case '1인실':
          return <OneRoomMobile />;
        case '모니터데스크':
          return <MonitorDeskMobile />;
        case '지정좌석':
          return <ReservedMobile />;
        case '기업 전용 지정 좌석':
          return <OnlyEnterMobile />;
        default:
          return;
      }
    } else {
      return;
    }
  }

  function ReservationTableStyleSpace({
    selectedSpaceAll,
  }: {
    selectedSpaceAll: SpaceReservation;
  }) {
    if (selectedSpaceAll && selectedSpaceAll.type) {
      switch (selectedSpaceAll.type) {
        case '미팅룸(4인)':
          return <MettingRoom4Mobile />;
        case '미팅룸(8인)':
          return <MeetingRoom8Mobile />;
        case '세미나실':
          return <SeminarRoomMobile />;
        case '스튜디오':
          return <StudioMobile />;
        default:
          return;
      }
    } else {
      return;
    }
  }

  return (
    <>
      <div>
        {RTab === '좌석' && selectedSeatAll && (
          <ReservationTableStyleSeat selectedSeatAll={selectedSeatAll} />
        )}
        {RTab === '공간' && selectedSpaceAll && (
          <ReservationTableStyleSpace selectedSpaceAll={selectedSpaceAll} />
        )}
      </div>
    </>
  );
}
