'use client';

import { clubCurrentTabState } from '@/app/community/atoms/clubDetail';
import { useRecoilState } from 'recoil';
import BoardList from './BoardList';

export default function DetailContent({ clubId }: { clubId: number }) {
  const [tab] = useRecoilState(clubCurrentTabState);

  if (tab == '') {
    return <BoardList clubId={clubId} type="notice" />;
  }
  return <></>;
}
