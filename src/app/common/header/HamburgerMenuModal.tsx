import Link from 'next/link';
import React from 'react';

interface HamburgerMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HamburgerMenuModal({
  isOpen,
  onClose,
}: HamburgerMenuModalProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-white w-[25rem] absolute right-0 font-bold rounded-xl shadow-lg">
      <div className="flex justify-between bg-blue-50 rounded-t-xl">
        <div className="pt-[2.5rem] pb-[2rem] px-[2.5rem]">
          <div className="mb-4 text-[1.75rem] leading-none">노찬영님</div>
          <div className="flex gap-[1.5rem] leading-none text-[1.25rem]">
            <Link href="/profile">내 정보</Link>
            <Link href="/logout">로그아웃</Link>
          </div>
        </div>
        <div className="text-2xl pr-6 pt-4">✕</div>
      </div>
      <div className="p-[2rem] border-b border-gray-100">
        <div className="text-xl pb-[2rem] leading-none">Linkup</div>
        <ul className="leading-none text-gray-600">
          <li className="mb-4">
            <Link href="/company">회사 소개</Link>
          </li>
          <li>
            <Link href="/membership">멤버십 안내</Link>
          </li>
        </ul>
      </div>
      <div className="p-[2rem] border-b border-gray-100">
        <div className="text-xl pb-[2rem] leading-none">탐색</div>
        <ul className="leading-none text-gray-600">
          <li>
            <Link href="/map">지점 찾기 / 예약하기</Link>
          </li>
        </ul>
      </div>
      <div className="p-[2rem] border-b border-gray-100">
        <div className="text-xl pb-[2rem] leading-none">커뮤니티</div>
        <ul className="leading-none text-gray-600">
          <li>
            <Link href="/clubs">소모임</Link>
          </li>
        </ul>
      </div>
      <div className="p-[2rem] border-b border-gray-100">
        <div className="text-xl pb-[2rem] leading-none">고객센터</div>
        <ul className="leading-none text-gray-600">
          <li className="mb-4">
            <Link href="/faq">자주 묻는 질문</Link>
          </li>
          <li>
            <Link href="/support">1:1 문의하기</Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="pt-[4.62rem] pb-[2.5rem] flex justify-center font-medium">
          <ul className="leading-none text-gray-600">
            <li>
              <div>개인정보처리방침 | 이용약관</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
