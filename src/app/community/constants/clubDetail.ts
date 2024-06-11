import { ITabList } from '@/types/club/detail/clubDetail';

export const TAB_LIST: ITabList[] = [
  { id: 1, name: '공지', path: 'notice' },
  { id: 2, name: '게시판', path: 'board' },
  { id: 3, name: '정모', path: 'meeting' },
];

export const TAB_MOBILE_LIST: ITabList[] = [
  { id: 0, name: '소개', path: '' },
  { id: 1, name: '공지', path: 'notice' },
  { id: 2, name: '게시판', path: 'board' },
  { id: 3, name: '정모', path: 'meeting' },
];
