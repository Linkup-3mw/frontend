import CircleLoader from '@/app/common/components/frame/CircleLoader';
import RouterPushAlert from '@/app/common/components/modal/RouterPushAlert';
import BoardDetail from '@/app/community/components/club/clubDetail/BoardDetail';
import IntroduceDetail from '@/app/community/components/club/clubDetail/IntroduceDetail';
import { getClubBoardDetail } from '@/app/service/clubDetail';
import { IClubBoardList } from '@/types/club/detail/clubDetail';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

interface Props {
  params: {
    id: string;
    type: string;
  };
  searchParams: {
    post: number;
  };
}
export default async function page({
  params: { id, type },
  searchParams: { post },
}: Props) {
  // 존재하지 않는 페이지
  if (type !== 'board' && type !== 'notice' && type !== 'detail') {
    return (
      // <RouterPushAlert
      //   message="올바르지않은 접근 입니다."
      //   pushPath={`/community/club/${id || ''}`}
      // />
      notFound()
    );
  }

  if (type === 'detail') {
    return <IntroduceDetail clubId={Number(id)} />;
  }

  const data: IClubBoardList | undefined = await getClubBoardDetail(
    Number(id),
    post,
  );

  return (
    <Suspense fallback={<CircleLoader />}>
      <BoardDetail
        data={data}
        clubId={Number(id)}
        postType={type}
        postId={Number(post)}
      />
    </Suspense>
  );
}
