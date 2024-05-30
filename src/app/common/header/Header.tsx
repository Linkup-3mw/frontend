'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ContentWrap from '@common/components/frame/ContentWrap';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal: React.MouseEventHandler<HTMLElement> = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  return (
    <header className="text-main-black px-[1.25rem]" onClick={closeModal}>
      <ContentWrap>
        <div className="flex pt-[1.25rem] pb-[1.19rem]">
          {/* part1 */}
          <div className="flex basis-1/3 my-auto text-base pl-10">
            <Link href="/map">
              <div
                className={
                  'flex justify-center items-center w-[6.375rem] h-[2.5rem] border rounded-full border-black mr-3 font-bold '
                }
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
            <div className="flex justify-center items-center w-[6.375rem] h-[2.5rem] border rounded-full border-black mx-3 font-bold">
              공지사항
            </div>
          </div>
          {/* part2 */}
          <div className="basis-1/3 flex justify-center min-w-[15rem]">
            <img className="my-auto" src="svg/header/logo.svg" alt="Logo" />
          </div>
          {/* part3 */}
          <div className="flex basis-1/3 my-auto justify-end items-center min-w-[25.625rem]">
            <div className="flex mx-3 justify-end items-center">
              <div className="h-6 w-6 border border-[#45AD56] rounded-full overflow-hidden">
                <img
                  src="svg/header/profileDefault.svg"
                  alt="Profile Default"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex mx-2 font-bold">노찬영님</div>
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
            <div className="mx-3" onClick={toggleModal}>
              <img
                src="svg/header/hamburgerMenuIcon.svg"
                alt="Hamburger Menu Icon"
              />
              {/* Modal */}
              {isModalOpen && (
                <div className="fixed top-0 left-0 pr-[1.25rem] w-full h-full flex justify-center items-center">
                  <div className="absolute right-0">
                    <div
                      className="bg-white w-[8.13rem] p-4 rounded-lg"
                      ref={modalRef}
                    >
                      <div className="mb-4 font-bold">노찬영님</div>
                      <div className="mb-4">
                        <Link href="/profile">내 정보</Link>
                      </div>
                      <div className="mb-4">
                        <Link href="/logout">로그아웃</Link>
                      </div>
                      <div className="mb-4">
                        <div>Linkup</div>
                        <ul>
                          <li>
                            <Link href="/company">회사 소개</Link>
                          </li>
                          <li>
                            <Link href="/membership">멤버십 안내</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mb-4">
                        <div>탐색</div>
                        <ul>
                          <li>
                            <Link href="/branches">지점 찾기</Link>
                          </li>
                          <li>
                            <Link href="/reservation">예약하기</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mb-4">
                        <div>커뮤니티</div>
                        <ul>
                          <li>
                            <Link href="/clubs">소모임</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mb-4">
                        <div>고객센터</div>
                        <ul>
                          <li>
                            <Link href="/faq">자주 묻는 질문</Link>
                          </li>
                          <li>
                            <Link href="/support">1:1 문의하기</Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <button onClick={toggleModal}>닫기</button>
                      </div>{' '}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ContentWrap>
    </header>
  );
}
