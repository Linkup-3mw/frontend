import type { Metadata } from 'next';
import NoneLoginHome from './(home)/components/noneLogin/NoneLoginHome';

export const metadata: Metadata = {
  title: 'Linkup',
  description: '공간과 사람의 연결을 통해 얻는 새로운 가치',
};

export default async function Home() {
  // const session = await getServerSession(authOptions);

  //임시로 모든 사용자에게 보여줌
  return <NoneLoginHome />;
}
