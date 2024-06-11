import { atom } from 'recoil';
import { boolean } from 'zod';

interface userMembership {
  id: number;
  location: string;
  price: number;
  type: string;
  office_id: number;

  duration: number | null;
  start_date: string;
  end_date: string;
  credit: number | null;
  staff_count: number | null;
  member_id: number;
  company_id: number;
}
export interface userReservationList {
  id: number;
  price: number;
  seat_code: string;
  seat_type: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  type: string;
}
export const useMembershipState = atom<userMembership[]>({
  key: 'useMembership',
  default: [],
});
export const userMembershipListState = atom<userReservationList[]>({
  key: 'userMembershipList',
  default: [],
});
export const selectedMembershipId = atom<number | string>({
  default: '',
  key: 'mid',
});
export const rsInfoState = atom<userReservationList | null>({
  key: 'rsInfoState',
  default: null,
});
export const selectedOfficeId = atom<number | null>({
  key: 'office_id',
  default: null,
});
export const userUpdateRlistPutState = atom<boolean>({
  key: 'userUpdateList',
  default: false,
});
export const isRefreshedstate = atom<boolean>({
  key: 'isRefreshedstate',
  default: false,
});
export const companyIdState = atom<number | null>({
  key: 'companyIdState',
  default: null,
});
// export const seatReservationListState = atom<boolean>({
//   key: 'seatReservationListState'
// })
export const isEnterState = atom<boolean>({
  key: 'isEnterState',
  default: false,
});
export const yesOrNoState = atom<boolean>({
  key: 'yesoro',
  default: false,
});
export const confirmModalState = atom<boolean>({
  key: 'confirmModalState',
  default: false,
});
