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
    <div className="flex md:hidden justify-between items-center">
      <div className="flex justify-start items-center flex-1">
        <Profile />
      </div>
      <div className="flex justify-center items-center flex-1 max-w-[10rem]">
        <Link href="/">
          <img className="w-auto" src="/svg/header/logo.svg" alt="Logo" />
        </Link>
      </div>
      {/* <div className="flex flex-1 justify-end shrink-0"> */}
      {/* <img
          className="h-8 mr-[0.62rem]"
          src="/svg/header/unconfirmedAlarmIcon.svg"
          alt="Unconfirmed Alarm Icon"
        /> */}
      <div className="flex justify-end items-center flex-1">
        <div className="relative">
          <img
            className="h-7 cursor-pointer"
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
      {/* </div> */}
    </div>
  );
}
