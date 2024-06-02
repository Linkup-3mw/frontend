import { atom } from 'recoil';
import { OfficeBuilding, OfficeBuildingList } from '@/types/office/office';

export const mapState = atom<any>({
  key: 'map',
  default: null,
  dangerouslyAllowMutability: true,
});
export const buildingState = atom<OfficeBuilding[]>({
  key: 'building',
  default: [],
});
export const currentBuildingState = atom<OfficeBuilding | null>({
  key: 'currentBuilding',
  default: null,
});
