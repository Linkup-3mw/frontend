'use client';
import React, { useState } from 'react';
import Dropdown from '@components/club/Dropdown';
import ContentWrap from '@common/components/frame/ContentWrap';

export default function Club() {
  const dropdownOptions = ['이용 지점', '주변 지점', '전체 지점'];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [menuSelection, setMenuSelection] = useState<string | null>(null);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleMenuSelect = (value: string) => {
    setMenuSelection(value);
  };

  return (
    <div className="pt-[1.25rem] pb-[1.19rem] px-[1.25rem]">
      <ContentWrap>
        <div className="bg-blue-50 rounded-2xl p-[2rem] relative">
          <Dropdown
            options={dropdownOptions}
            selectedOption={selectedOption}
            onSelect={handleOptionSelect}
          />
          <div className="mt-2 absolute top-16 left-8">
            {/* 추가 메뉴 */}
            <button
              onClick={() => handleMenuSelect('전체')}
              className={`mr-2 ${
                menuSelection === '전체' ? 'bg-gray-200' : ''
              }`}
            >
              전체
            </button>
            <button
              onClick={() => handleMenuSelect('찜')}
              className={`mr-2 ${menuSelection === '찜' ? 'bg-gray-200' : ''}`}
            >
              찜
            </button>
            <button
              onClick={() => handleMenuSelect('내 소모임')}
              className={`mr-2 ${
                menuSelection === '내 소모임' ? 'bg-gray-200' : ''
              }`}
            >
              내 소모임
            </button>
          </div>
        </div>
      </ContentWrap>
    </div>
  );
}
