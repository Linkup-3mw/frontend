import React from 'react';
import CommunityNav from './components/CommunityNav';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CommunityNav />
      <div>{children}</div>
    </>
  );
}
