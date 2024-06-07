'use client';
import React, { useState } from 'react';
import ContentWrap from '@common/components/frame/ContentWrap';
import MenuButtons from '@components/club/MenuButtons';
import AllMenu from '@components/club/clubMenu/AllMenu/AllMenu';
import BookmarkMenu from '@components/club/clubMenu/BookmarkMenu/BookmarkMenu';
import MyClubsMenu from '@components/club/clubMenu/MyClubsMenu/MyClubsMenu';

export default function Club() {
  const [menuSelection, setMenuSelection] = useState<string>('전체');

  const handleMenuSelect = (label: string) => {
    setMenuSelection(label);
  };

  const menuItems = [
    { label: '전체', isActive: menuSelection === '전체' },
    { label: '찜', isActive: menuSelection === '찜' },
    { label: '내 소모임', isActive: menuSelection === '내 소모임' },
  ];

  const renderMenuComponent = (label: string) => {
    switch (label) {
      case '전체':
        return <AllMenu />;
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
