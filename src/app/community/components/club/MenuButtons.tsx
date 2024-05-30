interface MenuButtonsProps {
  menuSelection: string | null;
  handleMenuSelect: (value: string) => void;
}

export default function MenuButtons({
  menuSelection,
  handleMenuSelect,
}: MenuButtonsProps) {
  return (
    <div className="flex font-semibold text-xl border-b border-gray-300">
      <button
        onClick={() => handleMenuSelect('전체')}
        className={`h-[3.31rem] px-5 border-b-2 ${
          menuSelection === '전체'
            ? 'border-main-black outline-inner'
            : 'text-[#51515D] border-transparent'
        }`}
      >
        전체
      </button>
      <button
        onClick={() => handleMenuSelect('찜')}
        className={`h-[3.31rem] px-5 border-b-2 ${
          menuSelection === '찜'
            ? 'border-main-black outline-inner'
            : 'text-[#51515D] border-transparent'
        }`}
      >
        찜
      </button>
      <button
        onClick={() => handleMenuSelect('내 소모임')}
        className={`h-[3.31rem] px-5 border-b-2 ${
          menuSelection === '내 소모임'
            ? 'border-main-black outline-inner'
            : 'text-[#51515D] border-transparent'
        }`}
      >
        내 소모임
      </button>
    </div>
  );
}
