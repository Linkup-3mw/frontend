import { signoutWithCredentials } from '@/app/service/auth';
import { Session } from 'next-auth';
import Link from 'next/link';

interface HamburgerMenuModalProps {
  session?: Session | null;
  isOpen?: boolean;
  onClose: () => void;
}

const MenuItems = ({ onClose }: HamburgerMenuModalProps) => (
  <>
    <div className="p-[2rem] border-b border-gray-100">
      <div className="pb-[1.5rem] leading-none text-lg md:text-xl lg:text-2xl">
        Linkup
      </div>
      <ul className="leading-none text-gray-600 text-sm md:text-base lg:text-lg">
        <li className="mb-4">
          <Link href="/company" onClick={onClose}>
            회사 소개
          </Link>
        </li>
        <li>
          <Link href="/membership" onClick={onClose}>
            멤버십 안내
          </Link>
        </li>
      </ul>
    </div>
    <div className="p-[2rem] border-b border-gray-100">
      <div className="pb-[1.5rem] leading-none text-lg md:text-xl lg:text-2xl">
        탐색
      </div>
      <ul className="leading-none text-gray-600 text-sm md:text-base lg:text-lg">
        <li>
          <Link href="/map" onClick={onClose}>
            지점 찾기 / 예약하기
          </Link>
        </li>
      </ul>
    </div>
    <div className="p-[2rem] border-b border-gray-100">
      <div className="pb-[1.5rem] leading-none text-lg md:text-xl lg:text-2xl">
        커뮤니티
      </div>
      <ul className="leading-none text-gray-600 text-sm md:text-base lg:text-lg">
        <li>
          <Link href="/community/club" onClick={onClose}>
            소모임
          </Link>
        </li>
      </ul>
    </div>
    <div className="p-[2rem] border-b border-gray-100">
      <div className="pb-[1.5rem] leading-none text-lg md:text-xl lg:text-2xl">
        고객센터
      </div>
      <ul className="leading-none text-gray-600 text-sm md:text-base lg:text-lg">
        <li className="mb-4">
          <Link href="/faq" onClick={onClose}>
            자주 묻는 질문
          </Link>
        </li>
        <li>
          <Link href="/support" onClick={onClose}>
            1:1 문의하기
          </Link>
        </li>
      </ul>
    </div>
    <div>
      <div className="pt-[4.62rem] pb-[2.5rem] flex justify-center font-medium">
        <ul className="leading-none text-gray-600 text-sm md:text-base lg:text-lg">
          <li>
            <div>개인정보처리방침 | 이용약관</div>
          </li>
        </ul>
      </div>
    </div>
  </>
);

export default function HamburgerMenuModal({
  session,
  isOpen,
  onClose,
}: HamburgerMenuModalProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-white md:w-[25rem] w-[20rem] absolute mb:top-[3rem] md:top-[4rem] top-[3.5rem] right-0 font-bold rounded-xl shadow-lg">
      <div
        className="text-xl pr-6 pt-3 absolute top-0 right-0 cursor-pointer"
        onClick={() => onClose()}
      >
        ✕
      </div>
      {session ? (
        <>
          <div className="pt-[2rem] pb-[2rem] px-[2.5rem] bg-blue-50 rounded-t-xl">
            <div className="mb-4 leading-none text-lg md:text-xl lg:text-2xl">
              {session.user.name}님
            </div>
            <div className="flex gap-[1rem] leading-none text-gray-900 text-sm md:text-base lg:text-lg">
              <Link href="/profile">내 정보</Link>
              <button onClick={() => signoutWithCredentials()}>로그아웃</button>
            </div>
          </div>
          <div className="overflow-y-auto max-mb:h-[90vh] max-h-[80vh]">
            <MenuItems onClose={onClose} />
          </div>
        </>
      ) : (
        <div className="overflow-y-auto max-mb:h-[90vh] max-h-[80vh]">
          <MenuItems onClose={onClose} />
        </div>
      )}
    </div>
  );
}
