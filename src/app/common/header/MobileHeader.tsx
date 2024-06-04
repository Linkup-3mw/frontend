'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Profile from './Profile';
import HamburgerMenuModal from './HamburgerMenuModal';

// Props 타입 정의
interface MobileHeaderProps {
  isModalOpen: boolean;
  toggleModal: () => void;
}

export default function MobileHeader({
  isModalOpen,
  toggleModal,
}: MobileHeaderProps) {
  const { data: session } = useSession();

  return (
    <div
      className={`flex mb:flex md:hidden w-full justify-between items-center`}
    >
      <div className="flex-1 justify-start">
        <Profile />
      </div>
      <div className="flex justify-center items-center flex-1">
        <Link href="/">
          <img className="" src="svg/header/logo.svg" alt="Logo" />
        </Link>
      </div>
      <div className="flex flex-1 justify-end shrink-0">
        <img
          className="h-8 mr-[0.62rem]"
          src="svg/header/unconfirmedAlarmIcon.svg"
          alt="Unconfirmed Alarm Icon"
        />
        <div className="relative cursor-pointer">
          <img
            className="h-8 cursor-pointer mr-[0.62rem]"
            src="svg/header/hamburgerMenuIcon.svg"
            alt="Hamburger Menu Icon"
            onClick={toggleModal}
          />
          {/* Modal */}
          <HamburgerMenuModal
            // session={session}
            isOpen={isModalOpen}
            onClose={toggleModal}
          />
        </div>
      </div>
    </div>
  );
}
