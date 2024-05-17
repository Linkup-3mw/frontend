import React from 'react';

export default function CommunityNav() {
  return (
    <nav className="h-[3.75rem] bg-blue-100 flex items-center justify-center gap-y-px">
      <div className="flex flex-col items-center w-[3.5rem] mx-[0.5rem]">
        <img src="./svg/communityNav/homeIcon.svg" alt="Home Icon" />
        <span className="text-[#8D8D9B] font-bold">홈</span>
      </div>
      <div className="flex flex-col items-center w-[3.5rem] mx-[0.5rem]">
        <img src="./svg/communityNav/coffeechatIcon.svg" alt="Home Icon" />
        <span className="text-[#8D8D9B] font-bold">컵챗</span>
      </div>
      <div className="flex flex-col items-center w-[3.5rem] mx-[0.5rem]">
        <img src="./svg/communityNav/clubIcon.svg" alt="Home Icon" />
        <span className="text-[#8D8D9B] font-bold">소모임</span>
      </div>
      <div className="flex flex-col items-center w-[3.5rem] mx-[0.5rem]">
        <img src="./svg/communityNav/cooperationIcon.svg" alt="Home Icon" />
        <span className="text-[#8D8D9B] font-bold">협업</span>
      </div>
      <div className="flex flex-col items-center w-[3.5rem] mx-[0.5rem]">
        <img src="./svg/communityNav/eventIcon.svg" alt="Home Icon" />
        <span className="text-[#8D8D9B] font-bold">이벤트</span>
      </div>
    </nav>
  );
}
