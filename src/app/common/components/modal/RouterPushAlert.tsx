'use client';
import Alert from '@/app/common/components/modal/Alert';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  message: string;
  buttonName?: string;
  showCloseButton?: boolean;
  pushPath: string;
}

// 서버사이드에서 페이지 진입시 바로 push룰 위해 구현
// 클라이언트 사이드에서는 Alert 컴포넌트 이용
export default function RouterPushAlert({
  message,
  buttonName = '확인',
  showCloseButton = false,
  pushPath,
}: Props) {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(true);
  return (
    <>
      {showAlert && (
        <Alert
          message={message}
          showCloseButton={showCloseButton}
          onClick={() => router.push(pushPath)}
          buttonName={buttonName}
          setIsShow={setShowAlert}
        />
      )}
    </>
  );
}
