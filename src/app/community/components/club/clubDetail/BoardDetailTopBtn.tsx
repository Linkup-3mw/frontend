'use client';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { usePathname, useRouter } from 'next/navigation';
import { BlackRLeftArrow } from '@/app/common/components/icons/BlackArrow';
import { clubIdState } from '@/app/community/atoms/clubDetail';
import { deleteBoard } from '@/app/service/clubDetail';
import Confirm from '@/app/common/components/modal/Confirm';
import Alert from '@/app/common/components/modal/Alert';
import MoreBtn from './MoreBtn';

interface Props {
  showMoreButton?: boolean;
  postId: number;
}

export default function BoardDetailTopBtn({
  showMoreButton = false,
  postId,
}: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    onClick: (() => void) | null;
  }>({
    message: '',
    onClick: null,
  });
  const router = useRouter();
  const pathname = usePathname();
  const clubId = useRecoilValue(clubIdState);
  const paths = pathname.split('/').slice(1, 5).join('/');

  // 뒤로가기
  const handleBackBtnClick = () => {
    router.back();
  };

  // 수정
  const handleEditClick = () => {
    router.push(`/${paths}/register?post=${postId}`);
  };

  // 삭제
  const handleDeleteClick = async () => {
    setShowConfirm(true);
  };

  //삭제 callback
  const handleDeleteCallback = async () => {
    const res = await deleteBoard(clubId, postId);
    if (res.status === 'DELETE_SUCCESS') {
      setAlert({
        message: '삭제되었습니다.',
        onClick: () => router.push(`/${paths}`),
      });
    } else {
      setAlert({
        message: '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        onClick: null,
      });
    }
    setShowAlert(true);
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
      {showConfirm && (
        <Confirm
          message="정말로 삭제하시겠습니까?"
          buttonName="네"
          callback={handleDeleteCallback}
          setIsShow={setShowConfirm}
        />
      )}
      {showAlert && (
        <Alert
          message={alert.message}
          buttonName="확인"
          setIsShow={setShowAlert}
          onClick={alert.onClick || undefined}
        />
      )}
    </div>
  );
}
