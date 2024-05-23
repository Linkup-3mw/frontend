'use client';
import React from 'react';

interface DropdownProps {
  options: string[];
  selectedOption: string | null;
  onSelect: (value: string) => void;
}

export default function Dropdown({
  options,
  selectedOption,
  onSelect,
}: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
    <div
      className="selected-option w-[18.3rem] cursor-pointer"
      onClick={toggleDropdown}
    >
      <div className="flex items-center justify-between w-[18.3rem] h-[3.5rem] px-[1rem]">
        <div className="font-semibold text-2xl">{getOptionText()}</div>
        <img
          src={isOpen ? '/svg/club/arrowDown.svg' : '/svg/club/arrowUp.svg'}
          alt={isOpen ? 'Arrow Down Icon' : 'Arrow Up Icon'}
          className="w-5 h-5 ml-2"
        />
      </div>
      <div className="">
        {isOpen && (
          <div className="options bg-white rounded-b w-[18.3rem] border-t border-gray-100">
            {options.map((option, index) => (
              <div
                key={option}
                className={`option py-2 px-4 h-[3.125rem] flex items-center font-bold ${
                  index !== options.length - 1 ? 'border-b border-gray-100' : ''
                }`}
                onClick={() => onSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
