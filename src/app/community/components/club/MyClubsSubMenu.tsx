import React, { useState, useEffect } from 'react';

interface MyClubsSubMenuProps {
  onSelect: (selection: string) => void;
}

export default function MyClubsSubMenu({ onSelect }: MyClubsSubMenuProps) {
  const [selectedMenu, setSelectedMenu] = useState<string>('myClubs');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleSelect = (selection: string) => {
    setSelectedMenu(selection);
    onSelect(selection);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex items-center md:space-x-4 space-x-2">
      <button
        onClick={() => handleSelect('myClubs')}
        className={`leading-none font-semibold md:text-lg text-xs px-2 md:h-[2.38rem] h-[2rem] flex items-center justify-center rounded ${
          selectedMenu === 'myClubs'
            ? 'bg-blue-400 text-white'
            : 'bg-white text-black'
        }`}
      >
        {isMobile ? '가입한 모임' : '가입한 모든 모임'}
      </button>
      <button
        onClick={() => handleSelect('unapprovedClubs')}
        className={`leading-none font-semibold md:text-lg text-xs px-2 md:h-[2.38rem] h-[2rem] flex items-center justify-center rounded ${
          selectedMenu === 'unapprovedClubs'
            ? 'bg-blue-400 text-white'
            : 'bg-white text-black'
        }`}
      >
        {isMobile ? '승인 대기 모임' : '승인 대기중인 모임'}
      </button>
      <button
        onClick={() => handleSelect('manageableClubs')}
        className={`leading-none font-semibold md:text-lg text-xs px-2 md:h-[2.38rem] h-[2rem] flex items-center justify-center rounded ${
          selectedMenu === 'manageableClubs'
            ? 'bg-blue-400 text-white'
            : 'bg-white text-black'
        }`}
      >
        {isMobile ? '모임 관리' : '모임 관리하기'}
      </button>
    </div>
  );
}
