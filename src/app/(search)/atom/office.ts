import {
  CompanyEnter,
  EnterPriseResponse,
  Membership,
  OnePassMembership,
  Remaining,
  Reservation,
} from '@/types/office/reservation';
import { SeatReservation, SpaceReservation } from '@/types/office/reservation';
import { atom } from 'recoil';

export const Rtab = atom<string>({
  key: 'Rtab',
  default: '좌석',
});
export const EnterPriseConsultingState = atom<boolean>({
  key: 'enterPriseCS',
  default: false,
});
export const showImageState = atom<boolean>({
  key: 'showImage',
  default: true,
});
export const MembershipChoose = atom<Membership | null>({
  key: 'membershipChoose',
  default: null,
});

export const OnePassMembershipState = atom<OnePassMembership[] | null>({
  key: 'onepassMembership',
  default: null,
});

// 좌석 예약 정보 담는
export const selectedSeatAllState = atom<SeatReservation | null>({
  key: 'seatAll',
  default: null,
});
// 공간 예약정보 담는
export const selectedSpaceAllState = atom<SpaceReservation | null>({
  key: 'spaceAll',
  default: null,
});

// 확정 눌렀는지
export const confirmedState = atom<boolean | null>({
  key: 'confirmed',
  default: false,
});
export const mobileConfirmedState = atom<boolean>({
  key: 'mobileConfirmed',
  default: false,
});
// 좌석 예약 리스트
export const seatListReservation = atom<SeatReservation[]>({
  key: 'seatListReservation',
  default: [],
});
// 공간 예약 리스트
export const spaceListReservation = atom<SpaceReservation[]>({
  key: 'spaceListReservation',
  default: [],
});
// 기업 리스트
export const enterPriseConsultingState = atom<EnterPriseResponse>({
  key: 'EnterPriseResponse',
});
export const companyState = atom<CompanyEnter | null>({
  key: 'company',
  default: null,
});
// 안내메시지
export const infoMsgState = atom<boolean>({
  key: 'infoMsgState',
  default: false,
});
//잔여 좌석 조회 주머니
export const searchRemainingState = atom<Remaining[]>({
  key: 'searchRemaining',
  default: [],
});
