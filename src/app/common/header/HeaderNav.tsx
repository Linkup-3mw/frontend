import React from 'react';

export default function HeaderNav() {
  return (
    <nav className="h-[3.75rem] flex items-center justify-center gap-y-px">
      <div className="flex flex-col items-center w-[3.5rem] mx-[0.5rem]">
        <img src="./svg/header/headerNav/homeIcon.svg" alt="Home Icon" />
        <span className="text-[#8D8D9B] font-bold">홈</span>
      </div>
      <div className="flex flex-col items-center w-[3.5rem] mx-[0.5rem]">
        <img src="./svg/header/headerNav/coffeechatIcon.svg" alt="Home Icon" />
        <span className="text-[#8D8D9B] font-bold">컵챗</span>
      </div>
      <div className="flex flex-col items-center w-[3.5rem] mx-[0.5rem]">
        <img src="./svg/header/headerNav/clubIcon.svg" alt="Home Icon" />
        <span className="text-[#8D8D9B] font-bold">소모임</span>
      </div>
      <div className="flex flex-col items-center w-[3.5rem] mx-[0.5rem]">
        <img src="./svg/header/headerNav/cooperationIcon.svg" alt="Home Icon" />
        <span className="text-[#8D8D9B] font-bold">협업</span>
      </div>
      <div className="flex flex-col items-center w-[3.5rem] mx-[0.5rem]">
        <img src="./svg/header/headerNav/eventIcon.svg" alt="Home Icon" />
        <span className="text-[#8D8D9B] font-bold">이벤트</span>
      </div>
    </nav>
  );
}
