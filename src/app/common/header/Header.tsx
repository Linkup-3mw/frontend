import React from 'react';

export default function Header() {
  return (
    <div className="bg-blue-200 py-4">
      <div className="px-[13rem] flex justify-center">
        <div className="flex basis-1/3 my-auto text-base">
          <div className="flex justify-center items-center w-[6.375rem] h-[2.5rem] border rounded-full border-black mr-3 font-bold">
            탐색
          </div>
          <div className="flex justify-center items-center w-[6.375rem] h-[2.5rem] border rounded-full border-black mx-3 font-bold">
            커뮤니티
          </div>
          <div className="flex justify-center items-center w-[6.375rem] h-[2.5rem] border rounded-full border-black mx-3 font-bold">
            공지사항
          </div>
        </div>
        <div className="basis-1/3 flex justify-center min-w-[12rem]">
          <img className="my-auto" src="./svg/logo.svg" alt="Logo" />
        </div>
        <div className="flex basis-1/3 my-auto justify-end items-center min-w-[25.625rem]">
          <div className="flex mx-3">
            <div className="h-6 w-6 border border-[#45AD56] rounded-full overflow-hidden">
              <img
                src="./svg/profileDefault.svg"
                alt="Profile Default"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex mx-2 font-bold">노찬영님</div>
          </div>
          <div className="mx-3">
            <img src="./svg/chatIcon.svg" alt="Chat Icon" />
          </div>
          <div className="mx-3">
            <img src="./svg/friendIcon.svg" alt="Friend Icon" />
          </div>
          <div className="mx-3">
            <img
              src="./svg/unconfirmedAlarmIcon.svg"
              alt="Unconfirmed Alarm Icon"
            />
          </div>
          <div className="mx-3">
            <img src="./svg/hamburgerMenuIcon.svg" alt="Hamburger Menu Icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
