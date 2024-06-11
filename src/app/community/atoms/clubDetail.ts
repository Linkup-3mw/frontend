import { ClubMemberType, IClubInfo } from '@/types/club/detail/clubDetail';
import { atom, selector } from 'recoil';

export const clubInfoState = atom({
  key: 'clubInfoState',
  default: <IClubInfo>{},
});

export const clubCurrentTabState = atom({
  key: 'clubCurrentTabState',
  default: '',
});

export const clubUserTypeState = atom({
  key: 'clubUserTypeState',
  default: 'NONE_MEMBER' as ClubMemberType,
});

export const clubIdState = selector({
  key: 'clubIdState',
  get: ({ get }) => {
    const clubId = get(clubInfoState).id;

    return clubId;
  },
});
