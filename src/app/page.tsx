import type { Metadata } from 'next';
import NoneLoginHome from './(home)/components/noneLogin/NoneLoginHome';
import { getServerSession } from 'next-auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authOptions } from './api/auth/authOptions';
import {
  isEnterState,
  selectedMembershipId,
  selectedOfficeId,
  useMembershipState,
} from './(search)/atom/membership';
import { useRouter } from 'next/navigation';
import API from '@/utils/axios';
import LoginHome from './(home)/components/login/LoginHome';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return <>{!session && <LoginHome />}</>;
}
