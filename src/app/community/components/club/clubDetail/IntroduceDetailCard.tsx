import { useRecoilState } from 'recoil';
import { clubInfoState } from '@/app/community/atoms/clubDetail';
import { useRouter } from 'next/navigation';
import BoardCard from './BoardCard';

export default function IntroduceDetailCard() {
  const [info] = useRecoilState(clubInfoState);
  const router = useRouter();

  const content = {
    writer_id: info.member_id,
    writer_name: info.member_name,
    writer_username: info.member_name,
    writer_thumbnail: info.profile_image,
    writer_occupation: '모임 호스트',
    content: info.detail_introduction,
    id: info.id,
    title: '소모임 상세 소개',
    type: 'detail',
  };

  return (
    <BoardCard
      isDetail
      boardContent={content}
      onClick={() => router.push(`/community/club/${info.id}/detail/detail`)}
    />
  );
}
