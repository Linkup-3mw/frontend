import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import NoneLoginHome from './(home)/components/noneLogin/NoneLoginHome';

import { authOptions } from './api/auth/authOptions';

export const metadata: Metadata = {
  title: 'Linkup',
  description: '공간과 사람의 연결을 통해 얻는 새로운 가치',
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <NoneLoginHome />;
  } else {
    return (
      <>
        <h1>main</h1>

      </>
    );
  }
}
