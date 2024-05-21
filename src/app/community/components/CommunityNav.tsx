'use client';
import React, { useState } from 'react';

export default function CommunityNav() {
  const [activeIcon, setActiveIcon] = useState('');

  const renderIcon = (iconName: string, iconSource: string, text: string) => {
    return (
      <div
        className="flex flex-col items-center w-[3.5rem] mx-[0.5rem] cursor-pointer"
        onMouseEnter={() => setActiveIcon(iconName)}
        onMouseLeave={() => setActiveIcon('')}
      >
        <img
          src={
            activeIcon === iconName
              ? `../svg/communityNav/${iconSource}Active.svg`
              : `../svg/communityNav/${iconSource}.svg`
          }
          alt={`${text} Icon`}
        />
        <span
          className={`text-[#8D8D9B] font-bold ${
            activeIcon === iconName
              ? 'text-black underline underline-offset-[0.5rem] decoration-2'
              : ''
          }`}
        >
          {text}
        </span>
      </div>
    );
  };

  return (
    <nav className="h-[3.75rem] flex items-center justify-center gap-y-px">
      {renderIcon('home', 'homeIcon', '홈')}
      {renderIcon('coffeechat', 'coffeechatIcon', '컵챗')}
      {renderIcon('cow', 'cowIcon', '소모임')}
      {renderIcon('collab', 'collabIcon', '협업')}
      {renderIcon('event', 'eventIcon', '이벤트')}
    </nav>
  );
}
