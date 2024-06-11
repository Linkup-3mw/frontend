'use client';
import Alert from '@/app/common/components/modal/Alert';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EncourageLoginAlert() {
  const [showAlert, setShowAlert] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      {showAlert && (
        <Alert
          message="로그인이 필요한 서비스 입니다."
          showCloseButton={false}
          onClick={() => router.replace(`/signin?callbackUrl=${pathname}`)}
          setIsShow={setShowAlert}
        />
      )}
    </>
  );
}
