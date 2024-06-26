'use client';
import React, { useState, useRef, useEffect } from 'react';

interface PlaceDropdownProps {
  options: string[];
  selectedOption: string | null;
  onSelect: (value: string) => void;
}

export default function PlaceDropdown({
  options,
  selectedOption,
  onSelect,
}: PlaceDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderSelectedOptionText = () => {
    switch (selectedOption) {
      case '이용 지점':
        return '신논현 2호점';
      case '주변 지점':
        return '신논현 2호점 외 (5)';
      case '전체 지점':
        return '전체 지점 (44)';
      default:
        return '신논현 2호점 외 (5)';
    }
  };

  const getOptionText = () => {
    if (selectedOption !== null) {
      return `${renderSelectedOptionText()}`;
    }
    return '신논현 2호점 외 (5)';
  };

  return (
    <div ref={dropdownRef} className="relative z-20">
      <div
        className="selected-option md:w-[16rem] w-[12rem] cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex items-center justify-between md:h-[3.5rem] h-[3rem] px-[0.5rem]">
          <div className="font-semibold md:text-2xl">{getOptionText()}</div>
          <img
            src={isOpen ? '/svg/club/arrowDown.svg' : '/svg/club/arrowUp.svg'}
            alt={isOpen ? 'Arrow Down Icon' : 'Arrow Up Icon'}
            className="w-5 h-5 "
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-[3rem] md:top-[3.3rem] bg-white rounded-b md:w-[16rem] w-[12rem] border-t border-gray-100 cursor-pointer shadow-sm">
          {options.map((option, index) => (
            <div
              key={option}
              className={`option py-2 px-4 md:h-[3.125rem] h-[2.625rem] flex items-center font-bold md:text-[1rem] text-sm ${
                index !== options.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
