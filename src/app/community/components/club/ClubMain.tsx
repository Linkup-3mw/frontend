'use client';
import React, { useState } from 'react';
import ContentWrap from '@common/components/frame/ContentWrap';
import MenuButtons from '@components/club/MenuButtons';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import MyClubsMenu from '@/app/community/components/club/clubMenu/myClubsMenu/MyClubsMenu';
import AllMenuGuest from '@/app/community/components/club/clubMenu/allMenu/AllMenuGuest';
import BookmarkMenu from '@/app/community/components/club/clubMenu/bookmarkMenu/BookmarkMenu';
import AllMenu from '@/app/community/components/club/clubMenu/allMenu/AllMenu';

export default function ClubMain() {
  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [menuSelection, setMenuSelection] = useState<string>('전체');

  const handleMenuSelect = (label: string) => {
    setMenuSelection(label);
  };

  const menuItems = [
    { label: '전체', isActive: menuSelection === '전체' },
    ...(session
      ? [
          { label: '찜', isActive: menuSelection === '찜' },
          { label: '내 소모임', isActive: menuSelection === '내 소모임' },
        ]
      : []),
  ];

  const renderMenuComponent = (label: string) => {
    switch (label) {
      case '전체':
        return session ? <AllMenu /> : <AllMenuGuest />;
      case '찜':
        return <BookmarkMenu />;
      case '내 소모임':
        return <MyClubsMenu />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-[1.25rem] pb-[1.19rem] px-[1.25rem] relative">
      <ContentWrap>
        <div className="bg-blue-50 rounded-2xl md:p-[2rem] p-4 relative z-10">
          <MenuButtons
            menuItems={menuItems}
            handleMenuSelect={handleMenuSelect}
          />
          {renderMenuComponent(menuSelection)}
        </div>
      </ContentWrap>
    </div>
  );
}
