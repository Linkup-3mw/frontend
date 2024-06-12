'use client';

import Alert from '@/app/common/components/modal/Alert';
import { signoutWithCredentials } from '@/app/service/auth';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface SessionData {
  Authorization: string;
  RefreshToken: string;
  expires: string;
}

interface SessionType {
  data: SessionData | any;
  status: string;
  update: any;
}

export default function AuthorizationHeader({ children }: Props) {
  const { status, data: session }: SessionType = useSession();
  const isLogin = !!session && status === 'authenticated';
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!isLogin) return;

    if (Date.now() > session.sessionExpiresAt) {
      signoutWithCredentials();
    }

    if (session?.error === 'RefreshAccessTokenError') {
      // 리프레시 토큰 만료
      setShowAlert(true);
    }
  }, [isLogin, session]);

  return (
    <>
      {children}
      {showAlert && (
        <Alert
          showCloseButton={false}
          setIsShow={setShowAlert}
          message="세션이 만료되었습니다."
          onClick={() => signoutWithCredentials()}
        />
      )}
    </>
  );
}
