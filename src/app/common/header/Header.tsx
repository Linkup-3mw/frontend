'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import ContentWrap from '@common/components/frame/ContentWrap';
import HamburgerMenuModal from './HamburgerMenuModal';
import HeaderMenu from './HeaderMenu';
import Profile from './Profile';
import MobileHeader from './MobileHeader';

export default function Header({ initialSession }: any) {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const [loading, setLoading] = useState(!initialSession);

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
    // {
    //   label: '공지사항',
    //   href: '/notice',
    //   isActive: pathname.startsWith('/notice'),
    // },
  ];

  useEffect(() => {
    if (status !== 'loading') {
      setLoading(false);
    }
  }, [status]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[5rem] bg-blue-100 text-main-black px-[1.25rem] flex items-center">
      <ContentWrap>
        <MobileHeader isModalOpen={isModalOpen} toggleModal={toggleModal} />
        <div className="hidden md:grid md:grid-cols-3 items-center w-full">
          {/* part1 */}
          <div className="flex md:justify-start">
            <HeaderMenu menuItems={menuItems} />
          </div>

          {/* part2 */}
          <div className="flex justify-center items-center max-w-[15rem] mx-auto">
            <Link href="/">
              <img className="" src="/svg/header/logo.svg" alt="Logo" />
            </Link>
          </div>

          {/* part3 */}
          <div className="flex justify-end items-center">
            <Profile session={initialSession || session} loading={loading} />
            <div className="relative cursor-pointer">
              <img
                src="/svg/header/hamburgerMenuIcon.svg"
                alt="Hamburger Menu Icon"
                onClick={toggleModal}
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
