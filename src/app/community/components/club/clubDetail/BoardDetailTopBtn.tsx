'use client';
import { BlackRLeftArrow } from '@/app/common/components/icons/BlackArrow';
import MoreBtn from './MoreBtn';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { clubIdState } from '@/app/community/atoms/clubDetail';
import { deleteBoard } from '@/app/service/clubDetail';

interface Props {
  showMoreButton?: boolean;
  postId: number;
}

export default function BoardDetailTopBtn({
  showMoreButton = true,
  postId,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const handleBackBtnClick = () => {
    router.back();
  };
  const clubId = useRecoilValue(clubIdState);

  const paths = pathname.split('/').slice(1, 5).join('/');
  const handleEditClick = () => {
    router.push(`/${paths}/register?post=${postId}`);
  };
  const handleDeleteClick = async () => {
    confirm('정말로 삭제하시겠습니까?');
    const res = await deleteBoard(clubId, postId);
    if (res.status === 'DELETE_SUCCESS') {
      alert('삭제되었습니다.');
      router.push(`/${paths}`);
    } else {
      alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <div className="sticky bg-blue-50 left-0 top-0 z-[5] flex items-center justify-between mb-[2rem] px-[2.5rem] max-md:px-[1rem] max-md:mb-[1.2rem]">
      <button onClick={handleBackBtnClick}>
        <BlackRLeftArrow />
      </button>
      {showMoreButton && (
        <MoreBtn className="w-[2.5rem] h-[2.5rem] [&_+_div]:!right-0 [&_+_div]:!left-[initial] [&_+_div]:translate-x-[0px]">
          <button onClick={handleEditClick}>수정</button>
          <button onClick={handleDeleteClick} className="last:border-b-0">
            삭제
          </button>
        </MoreBtn>
      )}
    </div>
  );
}
