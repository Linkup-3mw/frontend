import { suit } from '@styles/typography';
import '@styles/globals.css';
import { Header } from '@common/header';
import AuthContext from '@/context/AuthContext';
import AuthorizationHeader from '@/context/AuthorizationHeader';
import RecoilProvider from '@/context/Provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${suit.className} bg-blue-100`}>
        <Header />
        <RecoilProvider>
          <AuthContext>
            <AuthorizationHeader>
              <div>{children}</div>
            </AuthorizationHeader>
          </AuthContext>
        </RecoilProvider>
      </body>
    </html>
  );
}
