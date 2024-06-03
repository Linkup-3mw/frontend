'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import ContentWrap from '@common/components/frame/ContentWrap';
import HamburgerMenuModal from './HamburgerMenuModal';

export default function Header() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[5rem] bg-blue-100 text-main-black px-[1.25rem] flex items-center">
      <ContentWrap>
        <div className="flex justify-between items-center h-full">
          {/* part1 */}
          <div className="flex basis-1/3 items-center text-base">
            <Link href="/map">
              <div
                className={`flex justify-center items-center w-[6.375rem] h-[2.5rem] border rounded-full border-black mx-3 font-bold ${
                  pathname.startsWith('/map')
                    ? 'bg-main-black text-blue-100'
                    : ''
                }`}
              >
                탐색
              </div>
            </Link>
            <Link href="/community">
              <div
                className={`flex justify-center items-center w-[6.375rem] h-[2.5rem] border rounded-full border-black mx-3 font-bold ${
                  pathname.startsWith('/community')
                    ? 'bg-main-black text-blue-100'
                    : ''
                }`}
              >
                커뮤니티
              </div>
            </Link>
            <Link href="/notice">
              <div
                className={`flex justify-center items-center w-[6.375rem] h-[2.5rem] border rounded-full border-black mx-3 font-bold ${
                  pathname.startsWith('/notice')
                    ? 'bg-main-black text-blue-100'
                    : ''
                }`}
              >
                공지사항
              </div>
            </Link>
          </div>
          {/* part2 */}
          <div className="flex basis-1/3 justify-center min-w-[15rem]">
            <Link href="/">
              <img className="my-auto" src="svg/header/logo.svg" alt="Logo" />
            </Link>
          </div>
          {/* part3 */}
          <div className="flex basis-1/3 justify-end items-center min-w-[25.625rem]">
            <div className="flex mx-3 items-center">
              {session ? (
                <>
                  <div className="h-6 w-6 border border-[#45AD56] rounded-full overflow-hidden">
                    {session.user.profile_image ? (
                      <img
                        src={session.user.profile_image}
                        alt={session.user.name + '프로필 이미지'}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img
                        src="svg/header/profileDefault.svg"
                        alt="Profile Default"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex mx-2 font-bold">
                    {session?.user.name} 님
                  </div>
                </>
              ) : (
                <Link href={'/signin'} className="flex mx-2 font-bold">
                  로그인 하기
                </Link>
              )}
            </div>
            <div className="mx-3 ">
              <img src="svg/header/chatIcon.svg" alt="Chat Icon" />
            </div>
            <div className="mx-3 ">
              <img src="svg/header/friendIcon.svg" alt="Friend Icon" />
            </div>
            <div className="mx-3 ">
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
