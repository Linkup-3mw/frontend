import React from 'react';
import CommunityNav from './components/CommunityNav';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-[5rem]">
      <div className="max-md:hidden">
        <CommunityNav />
      </div>
      <div>{children}</div>
    </div>
  );
}
