import { atom } from 'recoil';
import { Building } from '@/types/office/office';

export const mapState = atom<any>({
  key: 'map',
  default: null,
  dangerouslyAllowMutability: true,
});
export const buildingState = atom<Building[]>({
  key: 'building',
  default: [],
});
export const currentBuildingState = atom<Building | null>({
  key: 'currentBuilding',
  default: null,
});
export const showInfoState = atom<boolean>({
  key: 'showInfo',
  default: false,
});
export const filterDataState = atom<Building[]>({
  key: 'filterData',
  default: [],
});

export const modalState = atom<boolean>({
  key: 'modal',
  default: false,
});
