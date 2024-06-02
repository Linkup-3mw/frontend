'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import ContentWrap from '@common/components/frame/ContentWrap';
import HamburgerMenuModal from './HamburgerMenuModal';
import HeaderMenu from './HeaderMenu';
import Profile from './Profile';

export default function Header() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  // 메뉴 항목 데이터
  const menuItems = [
    { label: '탐색', href: '/map', isActive: pathname.startsWith('/map') },
    {
      label: '커뮤니티',
      href: '/community',
      isActive: pathname.startsWith('/community'),
    },
    {
      label: '공지사항',
      href: '/notice',
      isActive: pathname.startsWith('/notice'),
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[5rem] bg-blue-100 text-main-black px-[1.25rem] flex items-center">
      <ContentWrap>
        <div className="flex justify-between items-center h-full w-full">
          {/* part1 */}
          <HeaderMenu menuItems={menuItems} />

          {/* 모바일 사이즈의 로고와 아이콘들 */}
          <div className="flex md:hidden w-full justify-between items-center">
            <Profile />
            <Link href="/" className="flex justify-center">
              <img className="h-10" src="svg/header/logo.svg" alt="Logo" />
            </Link>
            <div className="flex">
              <img
                className="mx-3"
                src="svg/header/unconfirmedAlarmIcon.svg"
                alt="Unconfirmed Alarm Icon"
              />
              <div className="relative cursor-pointer" onClick={toggleModal}>
                <img
                  src="svg/header/hamburgerMenuIcon.svg"
                  alt="Hamburger Menu Icon"
                />
                {/* Modal */}
                <HamburgerMenuModal
                  session={session}
                  isOpen={isModalOpen}
                  onClose={toggleModal}
                />
              </div>
            </div>
          </div>

          {/* part2 */}
          <div className="hidden md:flex basis-1/3 justify-center max-w-[15rem] shrink-0">
            <Link href="/">
              <img className="" src="svg/header/logo.svg" alt="Logo" />
            </Link>
          </div>

          {/* part3 */}
          <div className="hidden md:flex basis-1/3 justify-end items-center min-w-[25.625rem]">
            <Profile />
            <div className="mx-3">
              <img src="svg/header/chatIcon.svg" alt="Chat Icon" />
            </div>
            <div className="mx-3">
              <img src="svg/header/friendIcon.svg" alt="Friend Icon" />
            </div>
            <div className="mx-3">
              <img
                src="svg/header/unconfirmedAlarmIcon.svg"
                alt="Unconfirmed Alarm Icon"
              />
            </div>
            <div className="mx-3 relative cursor-pointer" onClick={toggleModal}>
              <img
                src="svg/header/hamburgerMenuIcon.svg"
                alt="Hamburger Menu Icon"
              />
              {/* Modal */}
              <HamburgerMenuModal
                session={session}
                isOpen={isModalOpen}
                onClose={toggleModal}
              />
            </div>
          </div>
        </div>
      </ContentWrap>
    </header>
  );
}
