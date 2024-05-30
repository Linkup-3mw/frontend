import React, { useState } from 'react';

interface MyClubMenuProps {
  onSelect: (selection: string) => void;
}

export default function MyClubMenu({ onSelect }: MyClubMenuProps) {
  const [selectedMenu, setSelectedMenu] = useState<string>('myClubs');

  const handleSelect = (selection: string) => {
    setSelectedMenu(selection);
    onSelect(selection);
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => handleSelect('myClubs')}
        className={`font-semibold text-lg px-2 h-[2.38rem] flex items-center justify-center rounded ${
          selectedMenu === 'myClubs'
            ? 'bg-blue-400 text-white'
            : 'bg-white text-black'
        }`}
      >
        가입한 모든 모임
      </button>
      <button
        onClick={() => handleSelect('unapprovedClubs')}
        className={`font-semibold text-lg px-2 h-[2.38rem] flex items-center justify-center rounded ${
          selectedMenu === 'unapprovedClubs'
            ? 'bg-blue-400 text-white'
            : 'bg-white text-black'
        }`}
      >
        승인 대기중인 모임
      </button>
      <button
        onClick={() => handleSelect('manageableClubs')}
        className={`font-semibold text-lg px-2 h-[2.38rem] flex items-center justify-center rounded ${
          selectedMenu === 'manageableClubs'
            ? 'bg-blue-400 text-white'
            : 'bg-white text-black'
        }`}
      >
        모임 관리하기
      </button>
    </div>
  );
}