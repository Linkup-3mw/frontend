'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="text-main-black">
      <div className="px-[12.5rem] flex justify-center pt-[1.25rem] pb-[1.19rem]">
        {/* part1 */}
        <div className="flex basis-1/3 my-auto text-base pl-10">
          <div
            className={
              'flex justify-center items-center w-[6.375rem] h-[2.5rem] border rounded-full border-black mr-3 font-bold '
            }
          >
            탐색
          </div>
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
          <img className="my-auto" src="../svg/header/logo.svg" alt="Logo" />
        </div>
        {/* part3 */}
        <div className="flex basis-1/3 my-auto justify-end items-center min-w-[25.625rem]">
          <div className="flex mx-3 flex-shrink-0 justify-end items-center">
            <div className="h-6 w-6 border border-[#45AD56] rounded-full overflow-hidden">
              <img
                src="../svg/header/profileDefault.svg"
                alt="Profile Default"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex mx-2 font-bold">노찬영님</div>
          </div>
          <div className="mx-3 flex-shrink-0">
            <img src="../svg/header/chatIcon.svg" alt="Chat Icon" />
          </div>
          <div className="mx-3 flex-shrink-0">
            <img src="../svg/header/friendIcon.svg" alt="Friend Icon" />
          </div>
          <div className="mx-3 flex-shrink-0">
            <img
              src="../svg/header/unconfirmedAlarmIcon.svg"
              alt="Unconfirmed Alarm Icon"
            />
          </div>
          <div className="mx-3 flex-shrink-0">
            <img
              src="../svg/header/hamburgerMenuIcon.svg"
              alt="Hamburger Menu Icon"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
