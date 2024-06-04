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
import { useRecoilValue } from 'recoil';
import { Rtab } from '@/app/(search)/atom/office';

// opentalemobile -> opendeskmobile
interface OpenTaleMobileProps {
  selectedSeatAll: SeatReservation;
  selectedSpaceAll: SpaceReservation;
}
export default function OpenTableMobile({
  selectedSeatAll,
  selectedSpaceAll,
}: OpenTaleMobileProps) {
  const RTab = useRecoilValue(Rtab);

  function ReservationTableStyleSeat({
    selectedSeatAll,
  }: {
    selectedSeatAll: SeatReservation;
  }) {
    if (selectedSeatAll && selectedSeatAll.type) {
      switch (selectedSeatAll.type) {
        case '오픈테이블':
          return <OpenDeskMobile />;
        case '포커스데스크':
          return <FocusDeskMobile />;
        case '1인실':
          return <OneRoomMobile />;
        case '모니터 데스크':
          return <MonitorDeskMobile />;
        case '지정 좌석':
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
        case '회의실 (4인)':
          return <MettingRoom4Mobile />;
        case '회의실 (8인)':
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
