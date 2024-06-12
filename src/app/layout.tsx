import { suit } from '@styles/typography';
import '@styles/globals.css';
import { Header } from '@common/header';
import AuthContext from '@/context/AuthContext';
import AuthorizationHeader from '@/context/AuthorizationHeader';
import type { Metadata } from 'next';
import RecoilProvider from '@/context/Provider';
import QueryProvider from '@/context/QueryProvider';
import { getSession } from '@/utils/getSession';
import { revalidatePath } from 'next/cache';

export const metadata: Metadata = {
  title: 'Linkup',
  description: '공간과 사람의 연결을 통해 얻는 새로운 가치',
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className={`${suit.className} bg-blue-100`}>
        <QueryProvider>
          <RecoilProvider>
            <AuthContext>
              <AuthorizationHeader>
                <Header session={session} />
                <div>{children}</div>
                <div id="modal-root" />
              </AuthorizationHeader>
            </AuthContext>
          </RecoilProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
