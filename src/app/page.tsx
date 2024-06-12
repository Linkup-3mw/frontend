import type { Metadata } from 'next';
import NoneLoginHome from './(home)/components/noneLogin/NoneLoginHome';
import LoginHome from './(home)/components/login/LoginHome';
import { getSession } from '@/utils/getSession';
import { getMyMembership } from './service/clubDetail';

export const metadata: Metadata = {
  title: 'Linkup',
  description: '공간과 사람의 연결을 통해 얻는 새로운 가치',
};

export default async function Home() {
  const session = await getSession();
  const haveMembership = await getMyMembership();
  return session && haveMembership ? (
    <LoginHome user={session.user} />
  ) : (
    <NoneLoginHome />
  );
}
