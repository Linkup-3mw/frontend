import React from 'react';
import CommunityNav from './components/CommunityNav';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-[5rem]">
      <CommunityNav />
      <div>{children}</div>
    </div>
  );
}
