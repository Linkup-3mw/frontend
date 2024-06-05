'use client';

import { signoutWithCredentials } from '@/app/service/auth';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

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
  // const accesstoken = isLogin ? session.accessToken : '';

  useEffect(() => {
    if (!isLogin) return;

    if (Date.now() > session.sessionExpiresAt) {
      signoutWithCredentials();
    }

    if (session?.error === 'RefreshAccessTokenError') {
      // 리프레시 토큰 만료
      alert('세션이 만료되었습니다.');
      signoutWithCredentials();
    }
  }, [isLogin, session]);

  // 만료시간 임시 값
  // useEffect(() => {
  //   setCookie('accessToken', accesstoken, 2);
  // }, [isLogin]);
  return <>{children}</>;
}
