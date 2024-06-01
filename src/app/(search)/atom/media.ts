import { atom } from 'recoil';

export const mobileReservationLayoutState = atom<boolean>({
  key: 'mobileLayout',
  default: false,
});
export const showMobileTableState = atom<boolean>({
  key: 'showMobile',
  default: false,
});
export const minDeskLayoutState = atom<boolean>({
  key: 'minDesk',
  default: false,
});
