'use client';
import { setClubLiked } from '@/app/service/clubDetail';
import BlueSquareBtn from './BlueSquareBtn';
import HeartBtn from './HeartBtn';
import MoreBtn from './MoreBtn';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Confirm from '@/app/common/components/modal/Confirm';
import Alert from '@/app/common/components/modal/Alert';
import { useRecoilState } from 'recoil';
import { clubUserTypeState } from '@/app/community/atoms/clubDetail';
import RouterPushAlert from '@/app/common/components/modal/RouterPushAlert';
import { useRouter } from 'next/navigation';

interface Props {
  liked: boolean | null;
  clubId: number;
  memberId?: number;
}

interface PushAlert {
  message: string;
  pushPath: string;
  buttonName: string;
}

// 미가입자용 버튼
export function NoneMemberIntroduceTopBtn({ liked, clubId }: Props) {
  const [userType] = useRecoilState(clubUserTypeState);
  const [alert, setAlert] = useState<PushAlert>({
    message: '',
    pushPath: '',
    buttonName: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  //찜하기
  const handleHeartClick = async () => {
    const res = await setClubLiked(clubId);
    if (res.status_code === 204) {
      //요청 성공
      return true;
    } else {
      //요청 실패
      return false;
    }
  };

  //가입하기
  const handleJoinClubClick = () => {
    if (userType === 'VISITOR') {
      //멤버십 미가입자
      setAlert({
        message: '소모임 가입은 멤버십이 필요합니다.',
        // 경로 수정 필요
        pushPath: '/',
        buttonName: '멤버십 구매하기',
      });
      setShowAlert(true);
    } else {
      // 클럽 미가입자
      //소모임 지원하기로 링크 이동
      // 경로 수정 필요

      //즉시 가입인 경우는..뭐임...?
      router.push('/');
    }
  };

  return (
    <>
      <HeartBtn isLike={liked || false} onClick={handleHeartClick} />
      <BlueSquareBtn name="가입하기" onClick={handleJoinClubClick} />
      {showAlert && (
        <Alert
          message={alert.message}
          onClick={() => router.push(alert.pushPath)}
          buttonName={alert.buttonName}
          setIsShow={setShowAlert}
          showCloseButton={true}
        />
      )}
    </>
  );
}

// 가입자용 버튼
export function IntroduceTopBtn({ liked, clubId, memberId }: Props) {
  const session = useSession();
  const userId = Number(session.data?.user.id);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  //찜하기
  const handleHeartClick = async () => {
    const res = await setClubLiked(clubId);
    if (res.status_code === 204) {
      //요청 성공
      return true;
    } else {
      //요청 실패
      return false;
    }
  };

  //탈퇴하기
  // const handleSecessionClick = () => {
  //   setShowConfirm(true);
  // };
  // const handleSecessionCallback = () => {
  //   //탈퇴 처리.....
  //   // const res = await

  //   setShowConfirm(false);
  // };

  return (
    <>
      <HeartBtn
        className="bg-transparent w-[2.5rem] h-[2.5rem]"
        onClick={handleHeartClick}
        isLike={liked || false}
      />
      {memberId === userId && (
        <MoreBtn className="w-[2.5rem] h-[2.5rem]">
          <button className="last:border-b-0">관리</button>
        </MoreBtn>
      )}
      {/* <MoreBtn className="w-[2.5rem] h-[2.5rem]">
        {memberId === userId && <button>관리</button>}
        <button onClick={handleSecessionClick} className="last:border-b-0">
          탈퇴
        </button>
      </MoreBtn> */}

      {/* {showConfirm && (
        <Confirm
          message="정말 탈퇴하시겠습니까?"
          callback={handleSecessionCallback}
          setIsShow={setShowConfirm}
        />
      )} */}
      {showAlert && <Alert message={alertMsg} setIsShow={setShowAlert} />}
    </>
  );
}
